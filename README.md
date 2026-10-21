# AX12 Studio ⚡️

A native macOS desktop visual configurator and companion studio for the **AX12 Macropad** (12 mechanical keys + 2 rotary knobs).

Designed specifically for designers and creators who want an intuitive graphical user interface to customize keymaps, shortcuts, and rotary encoder actions without editing YAML by hand or running terminal commands.

---

## Features

- **True-to-Life AX12 Canvas**: Interactive representation of the $3 \times 4$ mechanical keycap grid and dual rotary knobs.
- **Dual Rotary Knobs**: Full support for all 3 trigger actions per knob:
  - ↺ Turn Left (Counter-Clockwise - CCW)
  - 🔘 Center Press
  - ↻ Turn Right (Clockwise - CW)
- **Figma Shortcuts Integration**: Complete palette of Figma shortcuts sourced from [figmashortcuts.com](https://www.figmashortcuts.com/) (Tools, Auto Layout, Components, Alignment, Text, Vectors).
- **Shortcut Builder & Recorder**: Click to toggle `⌘ Cmd`, `⌥ Opt`, `⌃ Ctrl`, `⇧ Shift` or click **"Record from Keyboard"** to record real keystrokes.
- **Zero-Terminal Hardware Flash**: Automatically detects connected AX12 hardware over USB (`Vendor 0x1189, Product 0x8890`) and flashes configurations with a single click.
- **Profile Management**: Save and switch custom profile presets (defaulting to `figma-designer.yaml`).

---

## Getting Started

### Prerequisites

- macOS (Apple Silicon or Intel)
- Node.js (v18+)

### Running Locally

```bash
# Clone the repository
git clone https://github.com/munzirstudio/ax12-studio.git
cd ax12-studio

# Install dependencies
npm install

# Launch the desktop app
npm start
```

### Packaging Standalone `.app`

```bash
npm run pack
```

This compiles a standalone native macOS application bundle in `dist/AX12 Studio-darwin-arm64/AX12 Studio.app`.

---

## Hardware Compatibility

- **Device**: AX12 Macropad (CH57x microcontroller)
- **Keys**: 12 mechanical switches (3 rows × 4 columns)
- **Knobs**: 2 rotary encoders with push button
- **USB ID**: `1189:8890`

---

## License

MIT © [Munzir Madhadzir](https://github.com/munzirstudio)
