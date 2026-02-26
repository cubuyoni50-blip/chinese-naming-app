# 辅助编程规则 (AI Agent Rules)

## 1. 上下文过滤 (Context Filtering)
为了提高效率，请在处理任务时遵循以下文件读取优先级：
- **核心逻辑**：优先读取 `src/app/page.tsx` 和 `src/components/` 目录。
- **配置信息**：仅在涉及部署或环境问题时读取 `next.config.ts` 或 `package.json`。
- **忽略范围**：禁止读取 `node_modules/`、`.next/`、`dist/`、`.git/` 以及所有图片/字体等二进制资源。

## 2. 任务执行规范
- **代码修改**：在修改文件前，必须先调用 `read_file` 确认当前内容，禁止盲写。
- **精简响应**：如果只需修改一行代码，请直接给出修改建议，不要重复输出整个文件的内容。
- **技术栈**：本项目使用 Next.js (App Router), Tailwind CSS, TypeScript。请确保生成的代码符合这些规范。

## 3. 性能优化建议
- 当上下文接近 50k tokens 时，请主动提示用户开启新会话，以保持推理质量。
- 优先搜索 `src/` 目录，避免在全局范围进行无效搜索。