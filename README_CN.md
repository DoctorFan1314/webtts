# WebTTS

> **[English](README.md)**

基于 MiMo-V2.5-TTS 的网页端语音合成工具，使用 TypeScript + Vite 构建。

## 功能特性

- **可配置 API 地址** — 自定义 Base URL，适配不同网络环境
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

```bash
npm install
npm run dev
```

然后打开终端显示的本地 URL。

## 构建

```bash
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

## 项目结构

```
src/
├── main.ts              # 入口
├── api.ts               # API 调用封装
├── state.ts             # 全局状态管理
├── storage.ts           # localStorage 操作
├── types.ts             # 类型定义
├── shortcuts.ts         # 快捷键
├── style.css            # 样式
├── index.html           # HTML 模板
└── components/
    ├── synth.ts         # 核心合成逻辑
    ├── voice-design.ts  # 音色设计
    ├── voice-clone.ts   # 音色克隆
    ├── audio-tags.ts    # 音频标签
    ├── director.ts      # 导演模式
    ├── batch.ts         # 批量合成
    ├── history.ts       # 历史记录
    ├── templates.ts     # 快捷模板
    ├── onboarding.ts    # 新手引导
    ├── wave.ts          # 波形可视化
    └── ui-helpers.ts    # UI 工具函数
```

## API 参考

- [MiMo TTS v2.5 官方文档](https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5)

## 技术栈

- TypeScript + Vite
- MiMo-V2.5-TTS API（兼容 OpenAI 格式）

## 参与贡献

欢迎参与贡献！请查看 [CONTRIBUTING_CN.md](CONTRIBUTING_CN.md)。

## 许可证

MIT