# WebTTS

> **[中文文档](README_CN.md)**

A web-based text-to-speech studio powered by MiMo-V2.5-TTS. Built with TypeScript + Vite.

## Features

- **Configurable API Base URL** — custom Base URL for different network environments
- **Three Synthesis Modes**
  - Preset Voice: 8 built-in voices (4 Chinese, 4 English)
  - Voice Design: describe a custom voice with natural language
  - Voice Clone: upload an audio sample to clone any voice
- **Style Control**
  - Natural language style instructions
  - Audio tags for fine-grained control (breathing, emotion, crying, laughing, etc.)
  - Director mode with role / scene / direction
  - Singing mode
- **Batch Synthesis** — synthesize multiple texts sequentially
- **History** — search, export, import, auto-save
- **Dark Mode** — toggle with `Ctrl+D`
- **Keyboard Shortcuts** — `Ctrl+Enter` synthesize, `Ctrl+S` download, `Esc` close modals
- **Drag & Drop** — drop `.txt` files into the text area, drop audio files for voice clone
- **Onboarding** — first-visit guided tutorial
- **Request Cancellation** — cancel synthesis mid-request

## Quick Start

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal.

## Build

```bash
npm run build        # Build to dist/
npm run preview      # Preview production build
```

## Project Structure

```
src/
├── main.ts              # Entry point
├── api.ts               # MiMo API wrapper
├── state.ts             # Global state management
├── storage.ts           # localStorage operations
├── types.ts             # TypeScript type definitions
├── shortcuts.ts         # Keyboard shortcuts
├── style.css            # Styles
├── index.html           # HTML template
└── components/
    ├── synth.ts         # Core synthesis logic
    ├── mode-switch.ts   # Mode switching
    ├── voice-design.ts  # Voice design
    ├── voice-clone.ts   # Voice clone
    ├── audio-tags.ts    # Audio tags
    ├── director.ts      # Director mode
    ├── batch.ts         # Batch synthesis
    ├── history.ts       # History management
    ├── templates.ts     # Quick templates
    ├── onboarding.ts    # Onboarding tutorial
    ├── wave.ts          # Wave visualizer
    └── ui-helpers.ts    # UI utility functions
```

## API Reference

- [MiMo TTS v2.5 Documentation](https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5)

## Tech Stack

- TypeScript + Vite
- MiMo-V2.5-TTS API (OpenAI-compatible format)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT