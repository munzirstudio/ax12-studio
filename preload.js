const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ax12API', {
  checkDeviceStatus: () => ipcRenderer.invoke('device:status'),
  loadConfig: () => ipcRenderer.invoke('config:load'),
  saveConfig: (configObj) => ipcRenderer.invoke('config:save', configObj),
  validateConfig: (configObj) => ipcRenderer.invoke('config:validate', configObj),
  uploadConfig: (configObj) => ipcRenderer.invoke('config:upload', configObj),
  listProfiles: () => ipcRenderer.invoke('profile:list'),
  loadProfile: (filename) => ipcRenderer.invoke('profile:load', filename),
  saveProfileAs: (filename, configObj) => ipcRenderer.invoke('profile:save-as', filename, configObj),
  revealInFinder: () => ipcRenderer.invoke('shell:open-folder'),
  getYamlString: (configObj) => ipcRenderer.invoke('config:to-yaml', configObj),
  setLedMode: (modeIndex) => ipcRenderer.invoke('device:set-led', modeIndex)
});
