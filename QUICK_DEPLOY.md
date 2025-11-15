# 快速部署指南

## 🚀 推荐方案：Vercel (前端) + Railway (后端)

### 第一步：部署后端到 Railway

1. **访问 Railway**: https://railway.app
2. **登录/注册** GitHub 账号
3. **创建新项目** → "Deploy from GitHub repo"
4. **选择仓库** → 选择 `backend` 目录
5. **设置环境变量**:
   - `CORS_ORIGINS`: 先设置为 `*` (稍后更新为前端URL)
6. **获取后端URL**: Railway 会提供一个 URL，例如 `https://your-app.railway.app`

### 第二步：部署前端到 Vercel

1. **访问 Vercel**: https://vercel.com
2. **登录/注册** GitHub 账号
3. **导入项目** → 选择你的 GitHub 仓库
4. **配置项目**:
   - Framework Preset: Vite
   - Root Directory: `.` (根目录)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **设置环境变量**:
   - `VITE_API_URL`: 填入你的 Railway 后端 URL (例如: `https://your-app.railway.app`)
6. **部署**: 点击 Deploy

### 第三步：更新 CORS 设置

1. 回到 Railway 后端项目
2. 更新环境变量 `CORS_ORIGINS`:
   - 设置为你的 Vercel 前端 URL (例如: `https://your-app.vercel.app`)
3. 重新部署后端

### 完成！✅

现在你的应用应该可以正常工作了！

---

## 🔄 使用 GitHub Actions 自动部署

### 设置 GitHub Secrets

1. 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 添加以下 secrets:

**Vercel (前端)**:
- `VERCEL_TOKEN`: 从 Vercel Dashboard → Settings → Tokens 获取
- `VERCEL_ORG_ID`: 从 Vercel Dashboard → Settings → General 获取
- `VERCEL_PROJECT_ID`: 从 Vercel 项目设置中获取

**Railway (后端)**:
- `RAILWAY_TOKEN`: 从 Railway Dashboard → Account → Tokens 获取

**API URL**:
- `VITE_API_URL`: 你的生产环境后端 URL

### 推送代码自动部署

```bash
git add .
git commit -m "Setup CI/CD"
git push origin main
```

GitHub Actions 会自动：
- 构建前端和后端
- 运行测试
- 部署到生产环境

---

## 🐳 使用 Docker 部署 (自托管)

### 本地测试

```bash
# 构建并运行
docker-compose up -d --build

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

### 生产环境

1. 编辑 `docker-compose.yml` 中的环境变量
2. 使用 Docker Swarm 或 Kubernetes 部署

---

## 📝 环境变量清单

### 前端 (Vercel/Netlify)
```
VITE_API_URL=https://your-backend.railway.app
```

### 后端 (Railway/Render)
```
CORS_ORIGINS=https://your-frontend.vercel.app
PORT=8000
```

---

## 🔍 验证部署

1. **检查前端**: 访问 Vercel 提供的 URL
2. **检查后端**:** 访问 `https://your-backend.railway.app/docs` (FastAPI 文档)
3. **测试连接**: 在前端尝试提交一个报告
4. **查看日志**: 在 Railway/Vercel 控制台查看日志

---

## 🆘 常见问题

### CORS 错误
- 确保 `CORS_ORIGINS` 包含完整的前端 URL (包括 https://)
- 检查 URL 末尾没有斜杠

### API 连接失败
- 检查 `VITE_API_URL` 是否正确
- 检查后端是否正在运行
- 查看浏览器控制台的错误信息

### 构建失败
- 检查 Node.js 版本 (需要 20+)
- 检查 Python 版本 (需要 3.11+)
- 查看构建日志中的具体错误

---

## 📚 更多信息

详细文档请查看 `DEPLOYMENT.md`

