# WebTTS

> **[中文文档](README_CN.md)**

A web-based text-to-speech studio powered by MiMo-V2.5-TTS. Supports preset voices, voice design, voice cloning, audio tags, director mode, batch synthesis, and more.

## Features

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

1. Get your API Key from [MiMo Platform](https://platform.xiaomimimo.com/console/apikey)
2. Open `index.html` in your browser
3. Paste your API Key
4. Enter text and click "Start Synthesis"

## API Reference

- [MiMo TTS v2.5 Documentation](https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5)

## Tech Stack

- Pure HTML / CSS / JavaScript (single file, no dependencies)
- MiMo-V2.5-TTS API (OpenAI-compatible format)

## License

MIT