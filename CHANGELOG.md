# Changelog

> **[中文版本](CHANGELOG_CN.md)**

## [0.0.1.2] - 2026-05-28

### Added

- **Toast notification system** — stackable, auto-dismiss notifications
- **Wave sync with audio** — Web Audio API AnalyserNode drives visualization
- **API timeout** — 60s auto-timeout to prevent infinite waiting
- **History play button** — play audio directly from history (base64 persistence)
- **Template overwrite confirmation** — confirm before loading template
- **Onboarding back button** — navigate back in tutorial
- **Focus-visible styles** — keyboard Tab navigation shows focus ring
- **ARIA attributes** — toggle/modal/status accessible attributes
- **Responsive layout** — 600px/400px breakpoints for mobile
- **Dark mode improvements** — status colors, spinner adapted

### Fixed

- History audio broken after refresh (persisted as base64)
- Import history button not responding
- Shortcuts button not responding
- charcount setting toggle had no effect
- setStyle substring matching bug
- localStorage parse without error handling
- Object URL memory leak
- savehistory setting never checked
- Batch mode ignored design/clone modes
- Mode switching used fragile array index
- Modal backdrop click did not close

## [0.0.1.1] - 2026-05-28

### Added

- **Configurable API Base URL** — custom Base URL for different network environments
  - Input field above API Key, default: `https://api.xiaomimimo.com/v1`
  - Auto-saved to localStorage
  - Compatible with all OpenAI-protocol MiMo API endpoints

### Changed

- API auth switched from `api-key` header to standard `Authorization: Bearer` header

### Fixed

- Fixed "synthesis cancelled" bug on second synthesize click (addEventListener vs onclick conflict)

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