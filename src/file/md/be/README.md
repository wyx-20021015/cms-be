# 结课作业

## 安装与运行

项目运行之前，请确保系统已经安装以下应用

- node (6.0 及以上版本)
- mongodb (开启状态)

默认配置的说明

- 默认使用的 mongo 数据库是 wyx_cms, 默认端口 27017,默认主机 localhost，服务运行的端口是 8000，配置写在'.env'

运行命令

```
git clone https://git.kscampus.io:10443/hust-2022-web-tasks/wangyixuan.git
cd final/server

npm install

#development
npm run dev

#production
npm run build

# 批量导入测试数据
# 见 脚本 part
```

## 脚本

为了方便开发测试，提供下列脚本

```
# 自动导入测试数据
npm run import

# 移除多余文件
npm run clean

# 给丢失头像的学生分配默认头像
npm run default

# 把目录下的md移动到src/file/md
npm run rm
```

## 技术特点

- Koa
- TypeScript
- cookie-session 鉴权(普通请求) + jwt 鉴权(img 标签的 src，携带 token)

## 其它

见本目录下的'实现细节.md'
