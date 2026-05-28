# Contributing to WebTTS

> **[中文版本](CONTRIBUTING_CN.md)**

Thank you for your interest in contributing to WebTTS! This document provides guidelines and steps for contributing.

## Getting Started

1. Fork this repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/webtts.git
   cd webtts
   ```
3. Open `index.html` in your browser to verify it works
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development

WebTTS is a single-file web application (`index.html`). No build tools or dependencies required.

- **HTML** — page structure
- **CSS** — styles (inside `<style>` tag)
- **JavaScript** — logic (inside `<script>` tag)

Just edit `index.html` and refresh your browser to test.

## Submitting Changes

1. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add xxx feature"
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request against the `main` branch

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code refactoring |
| `perf:` | Performance improvement |
| `test:` | Tests |
| `chore:` | Build/tooling changes |

Examples:
```
feat: add voice preview playback
fix: audio tag insertion cursor position
docs: update README with batch synthesis usage
```

## Reporting Issues

When reporting bugs, please include:

1. Browser and version
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Console errors (if any)

## Feature Requests

We welcome feature ideas! Please open an issue describing:

1. The problem you want to solve
2. Your proposed solution
3. Alternatives considered

## Code Style

- Use 4-space indentation
- Keep functions short and focused
- Use meaningful variable names
- Avoid adding external dependencies (single-file philosophy)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).