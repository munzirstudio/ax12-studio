const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const yaml = require('js-yaml');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 1020,
    minHeight: 720,
    title: 'AX12 Studio',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 18, y: 18 },
    backgroundColor: '#0c0e12',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Renderer] ${message}`);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Base directories
const workspaceDir = path.join(app.getPath('documents'), 'micropad');
const bundledDir = __dirname;

function getToolPath() {
  const p1 = path.join(bundledDir, 'ch57x-keyboard-tool');
  const p2 = path.join(workspaceDir, 'ch57x-keyboard-tool');
  const p3 = path.join(process.resourcesPath || '', 'ch57x-keyboard-tool');
  if (fs.existsSync(p1)) return p1;
  if (fs.existsSync(p2)) return p2;
  if (fs.existsSync(p3)) return p3;
  return 'ch57x-keyboard-tool';
}

function getWorkDir() {
  if (fs.existsSync(workspaceDir)) return workspaceDir;
  return bundledDir;
}

// Helper to execute ch57x-keyboard-tool commands
function executeTool(subcommand, yamlContent) {
  return new Promise((resolve) => {
    const toolPath = getToolPath();
    const workDir = getWorkDir();
    const proc = spawn(toolPath, [subcommand], {
      cwd: workDir,
      env: {
        ...process.env,
        PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH || ''}`
      }
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('close', (code) => {
      resolve({
        success: code === 0,
        code,
        stdout: stdout.trim(),
        stderr: stderr.trim()
      });
    });

    proc.on('error', (err) => {
      resolve({
        success: false,
        code: -1,
        stdout: '',
        stderr: err.message
      });
    });

    if (yamlContent) {
      proc.stdin.write(yamlContent);
      proc.stdin.end();
    }
  });
}

// Convert object to clean YAML string for ch57x-keyboard-tool
function configToYaml(config) {
  return yaml.dump(config, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    quotingType: '"'
  });
}

// Check USB status using ioreg
ipcMain.handle('device:status', async () => {
  return new Promise((resolve) => {
    exec('ioreg -p IOUSB -w0 -l', (err, stdout) => {
      if (err) {
        return resolve({ connected: false, name: 'Unknown', error: err.message });
      }
      const hasCH57x = stdout.includes('"USB Product Name" = "CH57x"') ||
                       stdout.includes('"idVendor" = 4489') ||
                       stdout.includes('"idProduct" = 34960');
      resolve({
        connected: hasCH57x,
        name: hasCH57x ? 'AX12 Macropad (CH57x)' : 'Not Connected',
        vendorId: '0x1189 (4489)',
        productId: '0x8890 (34960)'
      });
    });
  });
});

// Load main configuration
ipcMain.handle('config:load', async () => {
  const dir = getWorkDir();
  const configFile = path.join(dir, 'figma-designer.yaml');
  const targetFile = fs.existsSync(configFile) ? configFile : path.join(__dirname, 'figma-designer.yaml');

  try {
    const raw = fs.readFileSync(targetFile, 'utf8');
    const parsed = yaml.load(raw);
    return { success: true, file: path.basename(targetFile), config: parsed, rawYaml: raw };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Save configuration to current active file (default figma-designer.yaml)
ipcMain.handle('config:save', async (_, configObj) => {
  const dir = getWorkDir();
  const configFile = path.join(dir, 'figma-designer.yaml');
  try {
    const yamlStr = configToYaml(configObj);
    fs.writeFileSync(configFile, yamlStr, 'utf8');
    return { success: true, file: 'figma-designer.yaml', yamlStr };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Validate configuration
ipcMain.handle('config:validate', async (_, configObj) => {
  const yamlStr = configToYaml(configObj);
  const result = await executeTool('validate', yamlStr);
  return result;
});

// Upload configuration to hardware
ipcMain.handle('config:upload', async (_, configObj) => {
  const yamlStr = configToYaml(configObj);
  
  // First auto-save to file
  const dir = getWorkDir();
  const configFile = path.join(dir, 'figma-designer.yaml');
  try {
    fs.writeFileSync(configFile, yamlStr, 'utf8');
  } catch (e) {
    console.error('Auto-save failed:', e);
  }

  // Then upload to device
  const result = await executeTool('upload', yamlStr);
  return result;
});

// List all profile YAML files
ipcMain.handle('profile:list', async () => {
  const dir = getWorkDir();
  try {
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map(f => {
        const stat = fs.statSync(path.join(dir, f));
        return {
          filename: f,
          size: stat.size,
          modified: stat.mtime
        };
      });
    return { success: true, profiles: files };
  } catch (err) {
    return { success: false, profiles: [] };
  }
});

// Load specific profile
ipcMain.handle('profile:load', async (_, filename) => {
  const dir = getWorkDir();
  try {
    const filePath = path.join(dir, path.basename(filename));
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = yaml.load(raw);
    return { success: true, filename, config: parsed, rawYaml: raw };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Save as new profile
ipcMain.handle('profile:save-as', async (_, filename, configObj) => {
  const dir = getWorkDir();
  try {
    let safeName = path.basename(filename);
    if (!safeName.endsWith('.yaml') && !safeName.endsWith('.yml')) {
      safeName += '.yaml';
    }
    const filePath = path.join(dir, safeName);
    const yamlStr = configToYaml(configObj);
    fs.writeFileSync(filePath, yamlStr, 'utf8');
    return { success: true, filename: safeName, yamlStr };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Open workspace folder in Finder
ipcMain.handle('shell:open-folder', async () => {
  const dir = getWorkDir();
  await shell.openPath(dir);
  return { success: true };
});

// Get YAML representation
ipcMain.handle('config:to-yaml', async (_, configObj) => {
  return configToYaml(configObj);
});
