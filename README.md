# 这是一个__

极简单页抽卡应用：点击抽卡，随机得到 1-10 分或 5% 概率的 Joker（0 分）。

## 本地预览

```bash
cd "D:\PM\这是一个满分男"
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 部署到 Vercel

### 方式一：网页导入

1. 把这个文件夹推送到 GitHub（或者任意 Git 仓库）。
2. 打开 [vercel.com/new](https://vercel.com/new)，用 GitHub 账号登录。
3. 导入这个仓库，框架预设保持默认即可，根目录保持 `/`。
4. 点击 Deploy，等待构建完成就会得到 `https://<项目名>.vercel.app` 链接。

### 方式二：Vercel CLI

```bash
npm install -g vercel
cd "D:\PM\这是一个满分男"
vercel
```

按提示登录并确认项目设置。需要直接发布到生产环境时运行：

```bash
vercel --prod
```
