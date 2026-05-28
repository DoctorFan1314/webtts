# MiMo 语音合成工作室

> **[English](README.md)**

基于小米 MiMo-V2.5-TTS 的网页端语音合成工具。支持预置音色、音色设计、音色克隆、音频标签、导演模式、批量合成等功能。

## 功能特性

- **三种合成模式**
  - 预置音色：8 种内置音色（4 中文 + 4 英文）
  - 音色设计：用自然语言描述自定义音色
  - 音色克隆：上传音频样本复刻任意音色
- **风格控制**
  - 自然语言风格指令
  - 音频标签精细控制（呼吸、情绪、哭笑等）
  - 导演模式（角色 / 场景 / 指导）
  - 唱歌模式
- **批量合成** — 多段文本逐个合成
- **历史记录** — 搜索、导出、导入、自动保存
- **暗色模式** — `Ctrl+D` 切换
- **快捷键** — `Ctrl+Enter` 合成、`Ctrl+S` 下载、`Esc` 关闭弹窗
- **拖拽上传** — 拖 `.txt` 文件到文本框，拖音频文件到克隆区
- **新手引导** — 首次访问分步教程
- **请求取消** — 合成中途可取消

## 快速开始

1. 前往 [MiMo 平台](https://platform.xiaomimimo.com/console/apikey) 获取 API Key
2. 在浏览器中打开 `mimo-tts.html`
3. 粘贴 API Key
4. 输入文本，点击「开始合成」

## API 参考

- [MiMo TTS v2.5 官方文档](https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5)

## 技术栈

- 纯 HTML / CSS / JavaScript（单文件，无依赖）
- MiMo-V2.5-TTS API（兼容 OpenAI 格式）

## 许可证

MIT