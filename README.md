# 结课作业
## 安装与运行

项目运行之前，请确保系统已经安装以下应用
- node (6.0 及以上版本)
- mongodb (开启状态)

默认配置的说明
- 默认使用的mongo数据库是wyx_cms,可以在'.env'文件中更换
- 默认端口27017,默认主机localhost,可以在'.env'中更换
- 服务运行的端口是8000，如果被占用可以在'.env'中更换

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

# 给丢失头像的用户分配默认头像
npm run default
```

## 技术特点
- Koa
- TypeScript
- RESTFUL API
- jwt鉴权，非对称加密
- prettier+eslint+husky+commitizen
- 服务器定期自检，良好健壮性

## 其它
见本目录下的'实现细节.md'