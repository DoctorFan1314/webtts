# Changelog

> **[中文版本](CHANGELOG_CN.md)**

## [0.0.1.1] - 2026-05-28

### Added

- **Configurable API Base URL** — custom Base URL for different network environments
  - Input field above API Key, default: `https://api.xiaomimimo.com/v1`
  - Auto-saved to localStorage
  - Compatible with all OpenAI-protocol MiMo API endpoints

### Changed

- API auth switched from `api-key` header to standard `Authorization: Bearer` header

## [2.5.0] - 2026-05-28

### Added

- **Voice Design mode** — describe custom voices with natural language (`mimo-v2.5-tts-voicedesign` model)
  - Dimension helper tags (gender/age, tone, emotion, speed)
  - 6 preset voice descriptions (ASMR, late-night radio, documentary narrator, etc.)
  - `optimize_text_preview` toggle for auto-generating matching text
- **Voice Clone mode** — upload audio samples to clone any voice (`mimo-v2.5-tts-voiceclone` model)
  - Drag-and-drop file upload
  - Audio preview player
  - File size validation (10MB max, MP3/WAV only)
- **Audio Tags panel** — fine-grained control with clickable tags
  - 4 categories: rhythm, emotion, voice characteristics, crying/laughing
  - Click-to-insert at cursor position in text
- **Director Mode** — advanced control with role / scene / direction inputs
  - 4 preset templates (romance, noir, comedy, epic)
  - Auto-compose into style instruction
- **Singing Mode** — auto-prepend `(唱歌)` tag
- **Batch Synthesis** — synthesize multiple texts sequentially with progress
- **History Search** — filter by text, voice, or style
- **History Export / Import** — JSON format
- **Onboarding Tutorial** — 4-step guided tour for first-time users
- **Keyboard Shortcuts**
  - `Ctrl+Enter` — synthesize
  - `Ctrl+S` — download audio
  - `Ctrl+Shift+S` — save to history
  - `Ctrl+D` — toggle dark mode
  - `Esc` — close modals
  - `?` — show shortcuts
- **Text Drag & Drop** — drop `.txt` / `.md` files into text area
- **Request Cancellation** — cancel synthesis mid-request via AbortController
- **Shortcuts Modal** — display all keyboard shortcuts

### Changed

- Extended style tags from 10 to 20+ (added 御姐音, 正太音, 大叔音, 台湾腔, 河南话, 慵懒, 俏皮, 深沉, 沙哑, 美甜)
- Updated API endpoint to official `api.xiaomimimo.com`
- Increased history limit from 50 to 100 records
- Improved wave visualizer animation (proper cleanup)

### Fixed

- Dark mode toggle ID capitalization
- Wave animation not stopping properly on synthesis end