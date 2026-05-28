# 参与贡献

> **[English Version](CONTRIBUTING.md)**

感谢你对 WebTTS 项目的关注！本文档说明如何参与贡献。

## 快速开始

1. Fork 本仓库
2. 克隆你的 Fork：
   ```bash
   git clone https://github.com/<你的用户名>/webtts.git
   cd webtts
   ```
3. 在浏览器中打开 `index.html` 确认正常运行
4. 创建功能分支：
   ```bash
   git checkout -b feature/你的功能名
   ```

## 开发方式

WebTTS 是单文件 Web 应用（`index.html`），无需构建工具或依赖安装。

- **HTML** — 页面结构
- **CSS** — 样式（在 `<style>` 标签内）
- **JavaScript** — 逻辑（在 `<script>` 标签内）

直接编辑 `index.html`，刷新浏览器即可测试。

## 提交更改

1. 使用清晰的提交信息：
   ```bash
   git commit -m "feat: 添加 xxx 功能"
   ```
2. 推送到你的 Fork：
   ```bash
   git push origin feature/你的功能名
   ```
3. 向 `main` 分支发起 Pull Request

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

| 前缀 | 用途 |
|------|------|
| `feat:` | 新功能 |
| `fix:` | 修复 Bug |
| `docs:` | 文档更新 |
| `style:` | 代码格式调整（不影响逻辑） |
| `refactor:` | 重构 |
| `perf:` | 性能优化 |
| `test:` | 测试 |
| `chore:` | 构建/工具变更 |

示例：
```
feat: 添加音色预览播放功能
fix: 修复音频标签插入光标位置错误
docs: 更新 README 批量合成使用说明
```

## 报告问题

报告 Bug 时请包含：

1. 浏览器及版本
2. 复现步骤
3. 期望行为
4. 实际行为
5. 控制台错误信息（如有）

## 功能建议

欢迎提出功能建议！请在 Issue 中描述：

1. 你想解决的问题
2. 你的方案建议
3. 考虑过的替代方案

## 代码风格

- 使用 4 空格缩进
- 函数保持简短，职责单一
- 使用有意义的变量名
- 避免引入外部依赖（保持单文件哲学）

## 许可证

贡献代码即表示你同意将贡献内容以 [MIT 许可证](LICENSE) 发布。