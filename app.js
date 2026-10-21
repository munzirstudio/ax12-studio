// AX12 Studio - Configurator Logic & State Management

// Map key names to readable symbols & names
const KEY_LABELS = {
  // Modifiers
  cmd: '⌘', win: '⌘', opt: '⌥', alt: '⌥', ctrl: '⌃', shift: '⇧',
  
  // Media keys
  play: '▶/⏸ Play',
  volumeup: '🔊 Vol +',
  volumedown: '🔉 Vol -',
  mute: '🔇 Mute',
  next: '⏭ Next',
  previous: '⏮ Prev',
  prev: '⏮ Prev',
  stop: '⏹ Stop',
  calculator: '🧮 Calc',
  screenlock: '🔒 Lock',
  favorites: '★ Fav',

  // Special keys
  enter: '⏎ Enter',
  escape: '⎋ Esc',
  backspace: '⌫ Delete',
  tab: '⇥ Tab',
  space: '␣ Space',
  up: '↑ Up',
  down: '↓ Down',
  left: '← Left',
  right: '→ Right',
  delete: '⌦ Fwd Del',
  pageup: '⇞ PgUp',
  pagedown: '⇟ PgDn',
  home: '↖ Home',
  end: '↘ End',

  // Punctuation
  minus: '-',
  equal: '=',
  leftbracket: '[',
  rightbracket: ']',
  backslash: '\\',
  semicolon: ';',
  quote: "'",
  grave: '`',
  comma: ',',
  dot: '.',
  slash: '/',

  // Mouse
  click: '🖱️ Left Click',
  rclick: '🖱️ Right Click',
  mclick: '🖱️ Mid Click',
  wheelup: '📜 Scroll Up',
  wheeldown: '📜 Scroll Down'
};

// Palettes definition
const PALETTES = {
  media: [
    { name: 'Play / Pause', code: 'play', icon: '▶/⏸' },
    { name: 'Volume Up', code: 'volumeup', icon: '🔊' },
    { name: 'Volume Down', code: 'volumedown', icon: '🔉' },
    { name: 'Mute', code: 'mute', icon: '🔇' },
    { name: 'Next Track', code: 'next', icon: '⏭' },
    { name: 'Prev Track', code: 'previous', icon: '⏮' },
    { name: 'Stop', code: 'stop', icon: '⏹' },
    { name: 'Calculator', code: 'calculator', icon: '🧮' },
    { name: 'Screen Lock', code: 'screenlock', icon: '🔒' },
    { name: 'Favorites', code: 'favorites', icon: '★' }
  ],
  presets: [
    { name: 'Undo', code: 'cmd-z', icon: '⎌' },
    { name: 'Redo', code: 'cmd-shift-z', icon: '↻' },
    { name: 'Cut', code: 'cmd-x', icon: '✂️' },
    { name: 'Copy', code: 'cmd-c', icon: '📋' },
    { name: 'Paste', code: 'cmd-v', icon: '📄' },
    { name: 'Select All', code: 'cmd-a', icon: '🔲' },
    { name: 'Find', code: 'cmd-f', icon: '🔍' },
    { name: 'Save', code: 'cmd-s', icon: '💾' },
    { name: 'Zoom In', code: 'cmd-equal', icon: '🔍+' },
    { name: 'Zoom Out', code: 'cmd-minus', icon: '🔍-' },
    { name: 'Zoom 100%', code: 'cmd-0', icon: '100%' },
    { name: 'Zoom Fit', code: 'shift-1', icon: '⛶' },
    { name: 'Duplicate', code: 'cmd-d', icon: '📑' },
    { name: 'Group', code: 'cmd-g', icon: '📦' },
    { name: 'Ungroup', code: 'cmd-shift-g', icon: '📤' },
    { name: 'Screenshot', code: 'cmd-shift-4', icon: '📸' },
    { name: 'Full Screenshot', code: 'cmd-shift-3', icon: '🖥️' },
    { name: 'Next Tab', code: 'ctrl-tab', icon: '⇥' },
    { name: 'Prev Tab', code: 'ctrl-shift-tab', icon: '⇤' },
    { name: 'Next Desktop', code: 'ctrl-right', icon: '➔' },
    { name: 'Prev Desktop', code: 'ctrl-left', icon: '←' },
    { name: 'Mission Control', code: 'ctrl-up', icon: '🪟' }
  ],
  figma: [
    // --- Tools ---
    { name: 'Move Tool', code: 'v', icon: '↖️' },
    { name: 'Scale Tool', code: 'k', icon: '↗️' },
    { name: 'Frame Tool', code: 'f', icon: '🖼️' },
    { name: 'Section Tool', code: 'shift-s', icon: '📑' },
    { name: 'Slice Tool', code: 's', icon: '🔪' },
    { name: 'Rectangle', code: 'r', icon: '▭' },
    { name: 'Line Tool', code: 'l', icon: '📏' },
    { name: 'Arrow Tool', code: 'shift-l', icon: '➔' },
    { name: 'Ellipse Tool', code: 'o', icon: '⭕' },
    { name: 'Place Image', code: 'shift-cmd-k', icon: '🖼️' },
    { name: 'Pen Tool', code: 'p', icon: '✒️' },
    { name: 'Pencil Tool', code: 'shift-p', icon: '✏️' },
    { name: 'Text Tool', code: 't', icon: '🔤' },
    { name: 'Pick Color', code: 'i', icon: '💉' },
    { name: 'Add Comment', code: 'c', icon: '💬' },
    { name: 'Quick Actions', code: 'cmd-slash', icon: '⚡' },
    { name: 'Run Last Plugin', code: 'opt-cmd-p', icon: '🔌' },
    { name: 'Resources', code: 'shift-i', icon: '🧩' },

    // --- View & Panels ---
    { name: 'Show/Hide UI', code: 'cmd-backslash', icon: '👁️' },
    { name: 'Rulers', code: 'shift-r', icon: '📐' },
    { name: 'Show Outlines', code: 'cmd-y', icon: '🔲' },
    { name: 'Layout Grids', code: 'shift-g', icon: '▦' },
    { name: 'Pixel Grid', code: 'cmd-quote', icon: '▤' },
    { name: 'Pixel Preview', code: 'shift-cmd-p', icon: '🔬' },
    { name: 'Collapse Layers', code: 'opt-l', icon: '📁' },
    { name: 'Layers Panel', code: 'opt-1', icon: '1️⃣' },
    { name: 'Assets Panel', code: 'opt-2', icon: '2️⃣' },
    { name: 'Libraries', code: 'opt-3', icon: '3️⃣' },
    { name: 'Design Panel', code: 'opt-8', icon: '🎨' },
    { name: 'Prototype Panel', code: 'opt-9', icon: '⚡' },
    { name: 'Inspect Panel', code: 'opt-0', icon: '🔍' },
    { name: 'Dev Mode Toggle', code: 'shift-d', icon: '💻' },
    { name: 'Present Prototype', code: 'opt-cmd-enter', icon: '▶️' },
    { name: 'Canvas Preview', code: 'shift-space', icon: '⏯️' },

    // --- Zoom ---
    { name: 'Zoom In', code: 'cmd-equal', icon: '🔍+' },
    { name: 'Zoom Out', code: 'cmd-minus', icon: '🔍-' },
    { name: 'Zoom 100%', code: 'cmd-0', icon: '100%' },
    { name: 'Zoom to Fit', code: 'shift-1', icon: '⛶' },
    { name: 'Zoom to Selection', code: 'shift-2', icon: '🎯' },
    { name: 'Next Frame', code: 'n', icon: '⏭️' },
    { name: 'Previous Frame', code: 'shift-n', icon: '⏮️' },

    // --- Auto Layout & Components ---
    { name: 'Add Auto Layout', code: 'shift-a', icon: '🍱' },
    { name: 'Remove Auto Layout', code: 'opt-shift-a', icon: '❌' },
    { name: 'Suggest Auto Layout', code: 'ctrl-shift-a', icon: '💡' },
    { name: 'Create Component', code: 'opt-cmd-k', icon: '💎' },
    { name: 'Detach Instance', code: 'opt-cmd-b', icon: '🔗' },
    { name: 'Go to Main Component', code: 'ctrl-opt-cmd-k', icon: '👑' },

    // --- Selection & Grouping ---
    { name: 'Group Selection', code: 'cmd-g', icon: '📦' },
    { name: 'Ungroup', code: 'shift-cmd-g', icon: '📤' },
    { name: 'Frame Selection', code: 'opt-cmd-g', icon: '🖼️' },
    { name: 'Select All', code: 'cmd-a', icon: '🔘' },
    { name: 'Select Inverse', code: 'shift-cmd-a', icon: '🔄' },
    { name: 'Select None', code: 'escape', icon: '⎋' },
    { name: 'Select Children', code: 'enter', icon: '↳' },
    { name: 'Select Parent', code: 'shift-enter', icon: '↰' },
    { name: 'Next Sibling', code: 'tab', icon: '➔' },
    { name: 'Prev Sibling', code: 'shift-tab', icon: '←' },
    { name: 'Select Same Layers', code: 'opt-cmd-a', icon: '✨' },
    { name: 'Show/Hide Layer', code: 'shift-cmd-h', icon: '👁️‍🗨️' },
    { name: 'Lock/Unlock Layer', code: 'shift-cmd-l', icon: '🔒' },

    // --- Edit & Clipboard ---
    { name: 'Copy Properties', code: 'opt-cmd-c', icon: '🎨' },
    { name: 'Paste Properties', code: 'opt-cmd-v', icon: '🖌️' },
    { name: 'Paste to Replace', code: 'shift-cmd-r', icon: '🔁' },
    { name: 'Paste over Selection', code: 'shift-cmd-v', icon: '📋' },
    { name: 'Duplicate', code: 'cmd-d', icon: '📑' },
    { name: 'Rename Layer', code: 'cmd-r', icon: '🏷️' },
    { name: 'Export', code: 'shift-cmd-e', icon: '🚢' },
    { name: 'Copy as PNG', code: 'shift-cmd-c', icon: '📷' },

    // --- Arrange & Align ---
    { name: 'Align Left', code: 'opt-a', icon: '⇤' },
    { name: 'Align Center (H)', code: 'opt-h', icon: '⇹' },
    { name: 'Align Right', code: 'opt-d', icon: '⇥' },
    { name: 'Align Top', code: 'opt-w', icon: '⤒' },
    { name: 'Align Center (V)', code: 'opt-v', icon: '⇳' },
    { name: 'Align Bottom', code: 'opt-s', icon: '⤓' },
    { name: 'Tidy Up', code: 'ctrl-opt-t', icon: '🧹' },
    { name: 'Distribute Horizontal', code: 'ctrl-opt-h', icon: '↔️' },
    { name: 'Distribute Vertical', code: 'ctrl-opt-v', icon: '↕️' },
    { name: 'Bring Forward', code: 'cmd-rightbracket', icon: '⤉' },
    { name: 'Bring to Front', code: 'opt-cmd-rightbracket', icon: '⤒' },
    { name: 'Send Backward', code: 'cmd-leftbracket', icon: '⤈' },
    { name: 'Send to Back', code: 'opt-cmd-leftbracket', icon: '⤓' },

    // --- Transform & Shapes ---
    { name: 'Flip Horizontal', code: 'shift-h', icon: '↔️' },
    { name: 'Flip Vertical', code: 'shift-v', icon: '↕️' },
    { name: 'Use as Mask', code: 'ctrl-cmd-m', icon: '🎭' },
    { name: 'Flatten Selection', code: 'cmd-e', icon: '🥞' },
    { name: 'Join Selection', code: 'cmd-j', icon: '🔗' },
    { name: 'Smooth Join', code: 'shift-cmd-j', icon: '➰' },
    { name: 'Delete & Heal', code: 'shift-delete', icon: '🩹' },
    { name: 'Remove Fill', code: 'opt-slash', icon: '🚫' },
    { name: 'Remove Stroke', code: 'shift-slash', icon: '⭕' },
    { name: 'Swap Fill & Stroke', code: 'shift-x', icon: '🔀' },

    // --- Text Styling ---
    { name: 'Bold Text', code: 'cmd-b', icon: '𝐁' },
    { name: 'Italic Text', code: 'cmd-i', icon: '𝐼' },
    { name: 'Underline Text', code: 'cmd-u', icon: 'U̲' },
    { name: 'Strikethrough', code: 'shift-cmd-x', icon: 'S̶' },
    { name: 'Create Link', code: 'cmd-k', icon: '🔗' },
    { name: 'Bulleted List', code: 'shift-cmd-8', icon: '•' },
    { name: 'Numbered List', code: 'shift-cmd-7', icon: '1.' },
    { name: 'Align Text Left', code: 'opt-cmd-l', icon: '≡' },
    { name: 'Align Text Center', code: 'opt-cmd-t', icon: '≢' },
    { name: 'Align Text Right', code: 'opt-cmd-r', icon: '≣' },
    { name: 'Increase Font Size', code: 'shift-cmd-dot', icon: 'A+' },
    { name: 'Decrease Font Size', code: 'shift-cmd-comma', icon: 'A-' },
    { name: 'Increase Font Weight', code: 'opt-cmd-dot', icon: 'W+' },
    { name: 'Decrease Font Weight', code: 'opt-cmd-comma', icon: 'W-' },
    { name: 'Increase Line Height', code: 'opt-shift-dot', icon: '↕+' },
    { name: 'Decrease Line Height', code: 'opt-shift-comma', icon: '↕-' },
    { name: 'Increase Spacing', code: 'opt-dot', icon: '↔+' },
    { name: 'Decrease Spacing', code: 'opt-comma', icon: '↔-' }
  ],
  standard: [
    { name: 'Space', code: 'space' },
    { name: 'Enter', code: 'enter' },
    { name: 'Escape', code: 'escape' },
    { name: 'Backspace', code: 'backspace' },
    { name: 'Tab', code: 'tab' },
    { name: 'Delete', code: 'delete' },
    { name: 'Arrow Up', code: 'up' },
    { name: 'Arrow Down', code: 'down' },
    { name: 'Arrow Left', code: 'left' },
    { name: 'Arrow Right', code: 'right' },
    { name: 'Page Up', code: 'pageup' },
    { name: 'Page Down', code: 'pagedown' },
    { name: 'Home', code: 'home' },
    { name: 'End', code: 'end' },
    ...'abcdefghijklmnopqrstuvwxyz0123456789'.split('').map(ch => ({ name: ch.toUpperCase(), code: ch })),
    { name: '-', code: 'minus' },
    { name: '=', code: 'equal' },
    { name: '[', code: 'leftbracket' },
    { name: ']', code: 'rightbracket' },
    { name: '\\', code: 'backslash' },
    { name: ';', code: 'semicolon' },
    { name: "'", code: 'quote' },
    { name: '`', code: 'grave' },
    { name: ',', code: 'comma' },
    { name: '.', code: 'dot' },
    { name: '/', code: 'slash' }
  ],
  numpad: [
    { name: 'Numpad 0', code: 'numpad0' },
    { name: 'Numpad 1', code: 'numpad1' },
    { name: 'Numpad 2', code: 'numpad2' },
    { name: 'Numpad 3', code: 'numpad3' },
    { name: 'Numpad 4', code: 'numpad4' },
    { name: 'Numpad 5', code: 'numpad5' },
    { name: 'Numpad 6', code: 'numpad6' },
    { name: 'Numpad 7', code: 'numpad7' },
    { name: 'Numpad 8', code: 'numpad8' },
    { name: 'Numpad 9', code: 'numpad9' },
    { name: 'Numpad +', code: 'numpadplus' },
    { name: 'Numpad -', code: 'numpadminus' },
    { name: 'Numpad *', code: 'numpadasterisk' },
    { name: 'Numpad /', code: 'numpadslash' },
    { name: 'Numpad Enter', code: 'numpadenter' },
    { name: 'Numpad Equal', code: 'numpadequal' },
    { name: 'Numpad .', code: 'numpaddot' }
  ],
  mouse: [
    { name: 'Left Click', code: 'click', icon: '👆' },
    { name: 'Right Click', code: 'rclick', icon: '👉' },
    { name: 'Middle Click', code: 'mclick', icon: '🔘' },
    { name: 'Scroll Up', code: 'wheelup', icon: '▲' },
    { name: 'Scroll Down', code: 'wheeldown', icon: '▼' }
  ],
  function: Array.from({ length: 24 }, (_, i) => ({
    name: `F${i + 1}`,
    code: `f${i + 1}`
  }))
};

// Application State
const state = {
  config: {
    orientation: 'normal',
    rows: 3,
    columns: 4,
    knobs: 2,
    layers: [
      { buttons: Array(3).fill(null).map(() => Array(4).fill('')), knobs: [{ ccw: '', press: '', cw: '' }, { ccw: '', press: '', cw: '' }] }
    ]
  },
  activeLayer: 0,
  selectedTarget: { type: 'button', row: 0, col: 0 },
  activeModifiers: new Set(),
  activePaletteTab: 'figma',
  searchQuery: '',
  isRecording: false,
  deviceConnected: false
};

// Format raw shortcut string into human-readable Mac representation
function formatShortcut(rawStr) {
  if (!rawStr || typeof rawStr !== 'string' || rawStr.trim() === '') {
    return 'None';
  }

  const parts = rawStr.split('-').map(s => s.trim().toLowerCase());
  const mods = [];
  let mainKey = '';

  for (const part of parts) {
    if (['cmd', 'win'].includes(part)) mods.push('⌘');
    else if (['opt', 'alt'].includes(part)) mods.push('⌥');
    else if (['ctrl'].includes(part)) mods.push('⌃');
    else if (['shift'].includes(part)) mods.push('⇧');
    else {
      mainKey = KEY_LABELS[part] || part.toUpperCase();
    }
  }

  return [...mods, mainKey].join(' ');
}

// Split a raw shortcut into modifiers and key
function parseShortcut(rawStr) {
  if (!rawStr || typeof rawStr !== 'string') return { modifiers: [], key: '' };
  const parts = rawStr.split('-').map(s => s.trim().toLowerCase());
  const modifiers = [];
  let key = '';

  for (const part of parts) {
    if (['cmd', 'win'].includes(part)) modifiers.push('cmd');
    else if (['opt', 'alt'].includes(part)) modifiers.push('opt');
    else if (['ctrl'].includes(part)) modifiers.push('ctrl');
    else if (['shift'].includes(part)) modifiers.push('shift');
    else key = part;
  }
  return { modifiers, key };
}

// Combine selected modifiers and key into raw string
function buildShortcut(modifiersSet, key) {
  if (!key) return '';
  const order = ['ctrl', 'cmd', 'opt', 'shift'];
  const activeMods = order.filter(m => modifiersSet.has(m));
  return [...activeMods, key].join('-');
}

// Get the current value of the selected target in the active layer
function getTargetValue(target, layerIndex) {
  const layer = state.config.layers[layerIndex];
  if (!layer) return '';

  if (target.type === 'button') {
    if (!layer.buttons || !layer.buttons[target.row]) return '';
    return layer.buttons[target.row][target.col] || '';
  } else if (target.type === 'knob') {
    if (!layer.knobs || !layer.knobs[target.knobIndex]) return '';
    return layer.knobs[target.knobIndex][target.action] || '';
  }
  return '';
}

// Set the value of the selected target in the active layer
function setTargetValue(target, layerIndex, value) {
  const layer = state.config.layers[layerIndex];
  if (!layer) return;

  if (target.type === 'button') {
    if (!layer.buttons) layer.buttons = [[], [], []];
    if (!layer.buttons[target.row]) layer.buttons[target.row] = [];
    layer.buttons[target.row][target.col] = value;
  } else if (target.type === 'knob') {
    if (!layer.knobs) layer.knobs = [{}, {}];
    if (!layer.knobs[target.knobIndex]) layer.knobs[target.knobIndex] = {};
    layer.knobs[target.knobIndex][target.action] = value;
  }

  // Trigger UI updates & Auto-save
  renderMacropad();
  updateInspector();
  triggerAutoSave();
}

// Auto-save configuration via IPC
let autoSaveTimer = null;
function triggerAutoSave() {
  const statusEl = document.getElementById('saveStatusIndicator');
  statusEl.innerHTML = '<span style="color: var(--accent-amber);">●</span> Saving...';

  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    try {
      await window.ax12API.saveConfig(state.config);
      statusEl.innerHTML = '<span class="icon-check">✓</span> Saved to figma-designer.yaml';
    } catch (e) {
      statusEl.innerHTML = '<span style="color: var(--accent-rose);">✕</span> Auto-save error';
    }
  }, 400);
}

// Show Toast Notification
function showToast(message, icon = '✨') {
  const toast = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMessage').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Render the 3x4 Keys Matrix
function renderKeys() {
  const grid = document.getElementById('keysGrid');
  grid.innerHTML = '';
  const currentButtons = state.config.layers[state.activeLayer]?.buttons || [];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const keyVal = (currentButtons[r] && currentButtons[r][c]) || '';
      const isSelected = state.selectedTarget.type === 'button' &&
                         state.selectedTarget.row === r &&
                         state.selectedTarget.col === c;

      const keyEl = document.createElement('div');
      keyEl.className = `keycap ${isSelected ? 'selected' : ''} ${keyVal ? 'assigned' : ''}`;
      keyEl.dataset.row = r;
      keyEl.dataset.col = c;

      const formatted = formatShortcut(keyVal);
      const isCustomShortcut = keyVal.includes('-');

      keyEl.innerHTML = `
        <div class="key-coords">R${r + 1}C${c + 1}</div>
        <div class="key-legend ${isCustomShortcut ? 'has-mod' : ''}" title="${keyVal || 'Unassigned'}">
          ${keyVal ? formatted : '<span style="color: var(--text-faint);">-</span>'}
        </div>
        <div class="key-type-indicator"></div>
      `;

      keyEl.addEventListener('click', () => {
        state.selectedTarget = { type: 'button', row: r, col: c };
        const val = getTargetValue(state.selectedTarget, state.activeLayer);
        const parsed = parseShortcut(val);
        state.activeModifiers = new Set(parsed.modifiers);
        renderMacropad();
        updateInspector();
      });

      grid.appendChild(keyEl);
    }
  }
}

// Render Knob Modules
function renderKnobs() {
  const knobs = state.config.layers[state.activeLayer]?.knobs || [];

  for (let k = 0; k < 2; k++) {
    const knobData = knobs[k] || { ccw: '', press: '', cw: '' };
    const summaryEl = document.getElementById(`knobSummary${k}`);
    summaryEl.innerHTML = `
      <div class="row"><span>↺ Turn Left:</span> <span class="val" title="${knobData.ccw || 'None'}">${formatShortcut(knobData.ccw)}</span></div>
      <div class="row"><span>🔘 Press:</span> <span class="val" title="${knobData.press || 'None'}">${formatShortcut(knobData.press)}</span></div>
      <div class="row"><span>↻ Turn Right:</span> <span class="val" title="${knobData.cw || 'None'}">${formatShortcut(knobData.cw)}</span></div>
    `;

    // Highlight selected zone
    const knobModule = document.querySelector(`.knob-module[data-knob-index="${k}"]`);
    if (knobModule) {
      const isKnobSelected = state.selectedTarget.type === 'knob' && state.selectedTarget.knobIndex === k;
      
      const cap = knobModule.querySelector('.knob-center-cap');
      const ccwBtn = knobModule.querySelector('.knob-zone.ccw');
      const cwBtn = knobModule.querySelector('.knob-zone.cw');

      cap.classList.toggle('selected', isKnobSelected && state.selectedTarget.action === 'press');
      ccwBtn.classList.toggle('selected', isKnobSelected && state.selectedTarget.action === 'ccw');
      cwBtn.classList.toggle('selected', isKnobSelected && state.selectedTarget.action === 'cw');

      // Dial rotation animation if active
      const dial = knobModule.querySelector('.knob-dial');
      if (isKnobSelected) {
        if (state.selectedTarget.action === 'ccw') dial.style.transform = 'rotate(-35deg)';
        else if (state.selectedTarget.action === 'cw') dial.style.transform = 'rotate(35deg)';
        else dial.style.transform = 'scale(0.97)';
      } else {
        dial.style.transform = 'rotate(0deg)';
      }
    }
  }
}

function renderMacropad() {
  renderKeys();
  renderKnobs();
}

// Update the Inspector Panel
function updateInspector() {
  const titleEl = document.getElementById('selectedTargetTitle');
  const subEl = document.getElementById('selectedTargetSubtitle');
  const badgeEl = document.getElementById('activeBindingFormatted');
  const rawEl = document.getElementById('activeBindingRaw');

  const val = getTargetValue(state.selectedTarget, state.activeLayer);

  if (state.selectedTarget.type === 'button') {
    const { row, col } = state.selectedTarget;
    titleEl.textContent = `Keycap (Row ${row + 1}, Col ${col + 1})`;
    subEl.textContent = `Physical Key #${row * 4 + col + 1} on your AX12 pad.`;
  } else {
    const { knobIndex, action } = state.selectedTarget;
    const actionName = action === 'ccw' ? 'Turn Left (Counter-Clockwise)' :
                       action === 'cw' ? 'Turn Right (Clockwise)' : 'Center Press';
    titleEl.textContent = `Knob ${knobIndex + 1} • ${actionName}`;
    subEl.textContent = `Configure rotary encoder trigger action.`;
  }

  if (val) {
    badgeEl.textContent = formatShortcut(val);
    badgeEl.classList.remove('empty');
    rawEl.textContent = val;
  } else {
    badgeEl.textContent = 'None (Unassigned)';
    badgeEl.classList.add('empty');
    rawEl.textContent = 'none';
  }

  // Update modifier chips
  document.querySelectorAll('.mod-chip').forEach(chip => {
    const mod = chip.dataset.mod;
    chip.classList.toggle('active', state.activeModifiers.has(mod));
  });

  renderPalette();
}

// Render Palette Items
function renderPalette() {
  const grid = document.getElementById('paletteGrid');
  grid.innerHTML = '';

  const items = PALETTES[state.activePaletteTab] || [];
  const query = state.searchQuery.toLowerCase().trim();

  const filtered = items.filter(item => {
    if (!query) return true;
    return item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No matching keys found.</div>`;
    return;
  }

  filtered.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.innerHTML = `
      ${item.icon ? `<span class="p-icon">${item.icon}</span>` : ''}
      <span>${item.name}</span>
      <span class="p-key">${item.code}</span>
    `;

    btn.addEventListener('click', () => {
      // If preset has hardcoded modifiers, use it directly, otherwise combine with activeModifiers
      let finalCode = item.code;
      if (!item.code.includes('-') && state.activeModifiers.size > 0) {
        finalCode = buildShortcut(state.activeModifiers, item.code);
      }
      setTargetValue(state.selectedTarget, state.activeLayer, finalCode);
      showToast(`Assigned ${formatShortcut(finalCode)}`, '✓');
    });

    grid.appendChild(btn);
  });
}

// Check Device Connection
async function checkDevice() {
  const badge = document.getElementById('deviceBadge');
  const text = document.getElementById('deviceStatusText');

  try {
    const res = await window.ax12API.checkDeviceStatus();
    state.deviceConnected = res.connected;

    if (res.connected) {
      badge.className = 'device-badge connected';
      text.textContent = 'AX12 Connected (USB)';
    } else {
      badge.className = 'device-badge disconnected';
      text.textContent = 'AX12 Disconnected';
    }
  } catch (e) {
    badge.className = 'device-badge disconnected';
    text.textContent = 'Hardware Status Error';
  }
}

// Keystroke Recording Logic
function setupKeystrokeRecorder() {
  const btn = document.getElementById('btnRecordKeystroke');
  const promptText = document.getElementById('recordPromptText');

  btn.addEventListener('click', () => {
    state.isRecording = !state.isRecording;
    if (state.isRecording) {
      btn.classList.add('recording');
      promptText.textContent = 'Press keys on your keyboard now...';
    } else {
      btn.classList.remove('recording');
      promptText.textContent = 'Record Shortcut from Keyboard';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!state.isRecording) return;
    e.preventDefault();

    const mods = new Set();
    if (e.metaKey) mods.add('cmd');
    if (e.altKey) mods.add('opt');
    if (e.ctrlKey) mods.add('ctrl');
    if (e.shiftKey) mods.add('shift');

    // Filter out modifier-only presses
    const ignoredKeys = ['Meta', 'Alt', 'Control', 'Shift'];
    if (ignoredKeys.includes(e.key)) {
      return;
    }

    let code = e.key.toLowerCase();
    // Map standard browser key names to ch57x names
    const map = {
      'arrowup': 'up', 'arrowdown': 'down', 'arrowleft': 'left', 'arrowright': 'right',
      ' ': 'space', 'escape': 'escape', 'enter': 'enter', 'backspace': 'backspace',
      'tab': 'tab', 'delete': 'delete', 'pageup': 'pageup', 'pagedown': 'pagedown',
      'home': 'home', 'end': 'end',
      '-': 'minus', '=': 'equal', '[': 'leftbracket', ']': 'rightbracket',
      '\\': 'backslash', ';': 'semicolon', "'": 'quote', '`': 'grave',
      ',': 'comma', '.': 'dot', '/': 'slash'
    };

    if (map[code]) code = map[code];

    const finalVal = buildShortcut(mods, code);
    setTargetValue(state.selectedTarget, state.activeLayer, finalVal);

    state.isRecording = false;
    btn.classList.remove('recording');
    promptText.textContent = 'Record Shortcut from Keyboard';
    showToast(`Recorded: ${formatShortcut(finalVal)}`, '🎙️');
  });
}

// Setup Event Listeners
function setupEvents() {
  // Knob Zone Clicks
  document.querySelectorAll('.knob-module').forEach(module => {
    const kIndex = parseInt(module.dataset.knobIndex, 10);

    module.querySelector('.knob-center-cap').addEventListener('click', () => {
      state.selectedTarget = { type: 'knob', knobIndex: kIndex, action: 'press' };
      const val = getTargetValue(state.selectedTarget, state.activeLayer);
      state.activeModifiers = new Set(parseShortcut(val).modifiers);
      renderMacropad();
      updateInspector();
    });

    module.querySelector('.knob-zone.ccw').addEventListener('click', () => {
      state.selectedTarget = { type: 'knob', knobIndex: kIndex, action: 'ccw' };
      const val = getTargetValue(state.selectedTarget, state.activeLayer);
      state.activeModifiers = new Set(parseShortcut(val).modifiers);
      renderMacropad();
      updateInspector();
    });

    module.querySelector('.knob-zone.cw').addEventListener('click', () => {
      state.selectedTarget = { type: 'knob', knobIndex: kIndex, action: 'cw' };
      const val = getTargetValue(state.selectedTarget, state.activeLayer);
      state.activeModifiers = new Set(parseShortcut(val).modifiers);
      renderMacropad();
      updateInspector();
    });
  });

  // Modifier chips
  document.querySelectorAll('.mod-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const mod = chip.dataset.mod;
      if (state.activeModifiers.has(mod)) {
        state.activeModifiers.delete(mod);
      } else {
        state.activeModifiers.add(mod);
      }
      chip.classList.toggle('active', state.activeModifiers.has(mod));

      // If current target already has a key, update with new modifiers
      const currentVal = getTargetValue(state.selectedTarget, state.activeLayer);
      if (currentVal) {
        const { key } = parseShortcut(currentVal);
        if (key) {
          const updated = buildShortcut(state.activeModifiers, key);
          setTargetValue(state.selectedTarget, state.activeLayer, updated);
        }
      }
    });
  });

  // Clear binding button
  document.getElementById('btnClearBinding').addEventListener('click', () => {
    setTargetValue(state.selectedTarget, state.activeLayer, '');
    showToast('Binding cleared', '🗑️');
  });

  // Palette categories
  document.querySelectorAll('.p-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activePaletteTab = tab.dataset.category;
      renderPalette();
    });
  });

  // Search input
  document.getElementById('paletteSearch').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderPalette();
  });

  // Validate Button
  document.getElementById('btnValidate').addEventListener('click', async () => {
    const btn = document.getElementById('btnValidate');
    btn.disabled = true;
    btn.innerHTML = '<span>Validating...</span>';

    try {
      const res = await window.ax12API.validateConfig(state.config);
      if (res.success) {
        showToast('Configuration is valid 👌', '✓');
      } else {
        showToast(`Validation issue: ${res.stderr || 'Invalid syntax'}`, '⚠️');
      }
    } catch (e) {
      showToast('Validation failed', '✕');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Validate</span>
      `;
    }
  });

  // Upload to Hardware Button (Hero)
  document.getElementById('btnUpload').addEventListener('click', async () => {
    const btn = document.getElementById('btnUpload');
    const textEl = document.getElementById('btnUploadText');
    btn.disabled = true;
    textEl.textContent = 'Uploading to AX12...';

    try {
      const res = await window.ax12API.uploadConfig(state.config);
      if (res.success) {
        showToast('Successfully synced to AX12!', '🚀');
      } else {
        showToast(`Upload failed: ${res.stderr || 'Device error'}`, '⚠️');
      }
    } catch (e) {
      showToast(`Upload error: ${e.message}`, '✕');
    } finally {
      btn.disabled = false;
      textEl.textContent = 'Upload to AX12';
    }
  });

  // YAML Modal
  const yamlModal = document.getElementById('yamlModal');
  document.getElementById('btnOpenYamlModal').addEventListener('click', async () => {
    const yamlStr = await window.ax12API.getYamlString(state.config);
    document.getElementById('yamlCodeView').textContent = yamlStr;
    yamlModal.classList.add('open');
  });

  document.getElementById('btnCloseYamlModal').addEventListener('click', () => {
    yamlModal.classList.remove('open');
  });

  document.getElementById('btnCopyYaml').addEventListener('click', () => {
    const code = document.getElementById('yamlCodeView').textContent;
    navigator.clipboard.writeText(code);
    showToast('YAML copied to clipboard!', '📋');
  });

  // Save As Profile Modal
  const saveAsModal = document.getElementById('saveAsModal');
  document.getElementById('btnSaveProfileAs').addEventListener('click', () => {
    saveAsModal.classList.add('open');
    document.getElementById('newProfileName').focus();
  });

  document.getElementById('btnCloseSaveAsModal').addEventListener('click', () => {
    saveAsModal.classList.remove('open');
  });

  document.getElementById('btnCancelSaveAs').addEventListener('click', () => {
    saveAsModal.classList.remove('open');
  });

  document.getElementById('btnConfirmSaveAs').addEventListener('click', async () => {
    const name = document.getElementById('newProfileName').value.trim();
    if (!name) return;

    try {
      const res = await window.ax12API.saveProfileAs(name, state.config);
      if (res.success) {
        showToast(`Saved profile: ${res.filename}`, '💾');
        saveAsModal.classList.remove('open');
        await loadProfileList();
      }
    } catch (e) {
      showToast('Failed to save profile', '✕');
    }
  });

  // Profile Selector Change
  document.getElementById('profileSelect').addEventListener('change', async (e) => {
    const filename = e.target.value;
    try {
      const res = await window.ax12API.loadProfile(filename);
      if (res.success && res.config) {
        state.config = res.config;
        renderMacropad();
        updateInspector();
        showToast(`Loaded profile: ${filename}`, '📂');
      }
    } catch (e) {
      showToast('Failed to load profile', '✕');
    }
  });

  // Open in Finder
  document.getElementById('btnOpenFolder').addEventListener('click', async () => {
    await window.ax12API.revealInFinder();
  });

  // Refresh Device Button
  document.getElementById('btnRefreshDevice').addEventListener('click', () => {
    checkDevice();
    showToast('Checking AX12 connection...', '🔍');
  });
}

// Load List of Profile YAMLs into Select Dropdown
async function loadProfileList() {
  const select = document.getElementById('profileSelect');
  try {
    const res = await window.ax12API.listProfiles();
    if (res.success && res.profiles.length > 0) {
      select.innerHTML = '';
      res.profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.filename;
        opt.textContent = p.filename === 'figma-designer.yaml' ? `${p.filename} (Default)` : p.filename;
        select.appendChild(opt);
      });
      select.value = 'figma-designer.yaml';
    }
  } catch (e) {
    console.error('Failed to load profiles:', e);
  }
}

// Application Initialization
async function init() {
  setupEvents();
  setupKeystrokeRecorder();

  // Load active config
  try {
    const res = await window.ax12API.loadConfig();
    if (res.success && res.config) {
      state.config = res.config;
    }
  } catch (e) {
    console.error('Error loading config:', e);
  }

  // Load profiles list
  await loadProfileList();

  // Initial Render
  renderMacropad();
  updateInspector();

  // Check hardware status initially and periodically
  checkDevice();
  setInterval(checkDevice, 4000);
}

window.addEventListener('DOMContentLoaded', init);
