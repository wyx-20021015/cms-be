边做边写，记录一下实现的细节

## 定时任务

### 目的

正常状况下，新建学生的模式是 上传图片->请求成功应答，返回 url->上传完整学生数据
但是如果在第一步和第三步之间中断了，那么就会有一张冗余的图片留在服务器，长此以往浪费了很多空间。

但是如果在指定时间去删除冗余的图片，就又有问题了，如果在执行删除前的极短时间，新建了一个学生，他的头像刚刚上传，还没走到第三步，头像就被删了。
为了解决这种问题，需要一个变量当锁，如果在执行删除任务，那么是这时创建学生很危险的。所以在删除任务前一分钟到删除任务结束上锁，删除任务开始了十分钟后要手动解锁一下，防止给锁赋值时被打断导致服务长时间失败
另外，如果管理员手滑把某张图片删掉了或者认为该图片违规，那么都会导致有学生没有图片对应，这时要把这种学生的头像路径设为默认图片的路径。

所以我需要两个任务，一个是删除任务 一个分配默认图片任务。

### 实现方法

于是我设定每日分别在凌晨 3 点和凌晨三点半执行删除任务和分配默认图片任务。
删除任务的方法是
创建一个 Set，遍历数据库所有学生，得到他们的头像 url 并放到 Set 中，然后读取 file 文件夹，如果文件名不在 Set 中，就删除
分配默认图片任务类似。

需要使用一个库`node-schedule`
具体实现见`handler/scheduleHandler`

## 正则匹配路由

搜了很多博客，最后还是去[koa-router 使用的这个库](https://github.com/pillarjs/path-to-regexp)找到的<br>
为了拿到包括 '/' 的 param，可以用(._)语法
```router.get('/:field/:fileName(._)', verifyAuthByQuery, getResource)`这样拿到的fileName就可以包含'/'了。`router.get('/:id(^search)', verifyAuth, getUserById)```
👆 可以排除 search

## 处理错误

可以在洋葱的最外层放一个 errHandler

```typescript
// errHandler.ts
...
try{
  await next()
}catch(e){
  错误处理...
}
```

## 目录结构

- app

  - index.ts

  为了让入口函数 `src/index.ts`尽可能精简，对 app 的操作大多写在`src/app/index.ts`，包括调用各种 handler 和 router。

  - config.ts

  从`.env`读出配置并导出。

  - key

  存放密钥对。

- handler

全局的中间件，比如错误处理，返回结果格式化。

- crud

和业务有关的代码。crud 下又按功能分模块，每个模块下一般有`*.middleware.ts`和`*.service.ts`文件

中间件在`*.middleware.ts`

操作数据库的代码放在`*.service.ts`

- db

人如其名，初始化数据库和集合的。

- router

配置路由的代码。放在一个文件夹方便使用`readdir`自动导出

- shared

前后端共享的一些 type。

- utils

工具函数，比如 md5 加密

- file

存放资源
