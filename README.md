# Mufeng API

> 一个丰富的API开放调用平台，为开发者提供便捷、实用、安全的API调用体验； Java + React 全栈项目，包括网站前台+后台
> 
> 在线体验地址：[mufengapi](https://mufengapi.top/)

## 项目流程

项目分为多个子模块：

1. backend:完成用户管理，接口管理，接口在线调用等相关功能。

2. gateway:实现路由转发、访问控制、用户鉴权、流量染色，并统一完成登录校验，AP签
   
   名校验，接口统计以及请求和响应日志的处理。

3. interface:提供请求的真实接口功能（暂未开源）。

4. common:统一抽取的公共实体、接口。

5. frontend：前端页面。

启动nacos、backend、gateway、interface，sdk Client和common需要提前在本地install。先在backend项目中调用对应的interface lnfo/invoke方法，校验参数、判断接口id是否存在、是否关闭等，然后获取到当前登录用户，并查出对应的accessKey和secretKey，并以此作为参数创建SDK客户端对象，然后把刚才参数中的user RequestParams通过Gson库将JSON字符串反序列化为Java对象，SDK客户端封装一系列请求参数，使用hutool工具包，将请求发送给gateway网关项目，在网关项目中，在全局过滤中，我们先获取请求头上的一系列信息，包括“请求参数、路径、方法、来源地址"等，并通过获取请求头中特定信息实现流量染色。该部分设置了黑白名单，只允许IP地址为当前服务器的请求通过，然后我们再做鉴权，通过传入的access Key去找出对应的用户，并且对请求的时间等作校验，再通过access Key查出来的用户，进一步得到对应的secret Key。与此同时，我们还需要对得到的path和method所对应的接口进行查询，判断是否存在，如果不存在则抛出指定的异常。最后，如果上述校验都没问题，那么我们认为这个请求是合法的，通过一个返回结果处理器handle Response，将用户和接口对应表user_interface_info中的用户的剩余接口调用次数等字段进行更新操作，结束后完成业务流程。

在上面的过程中，我提到了鉴权、校验、查询用户、查询secret Key"等操作，这些操作对应的代码是在backend项目中，如果我们直接把对应的代码放到gateway项目，势必会增加项目的复杂度以及冗余等。所以我想到了使用Dubbo这样一个RPC框架，通过@Enable Dubbo、@Dubbo Reference、@Dubbo Service等注解，配置相应的yml属性，并以Nacos作为服务的注册中心，实现了远程业务代码的调用。
此外项目还使用了sentinel对主要接口进行熔断和限流。

## 项目展示

- 登录页

![](C:\Users\lenovo\AppData\Roaming\marktext\images\2023-09-05-14-59-20-image.png)

- 主页

<img title="" src="file:///C:/Users/lenovo/AppData/Roaming/marktext/images/2023-09-05-15-00-04-image.png" alt="" data-align="inline">

- 接口调用

![](C:\Users\lenovo\AppData\Roaming\marktext\images\2023-09-05-15-00-25-image.png)

- 接口管理

![](C:\Users\lenovo\AppData\Roaming\marktext\images\2023-09-05-15-03-06-image.png)

- 接口分析

![](C:\Users\lenovo\AppData\Roaming\marktext\images\2023-09-05-15-03-39-image.png)

- 接口信息

![](C:\Users\lenovo\AppData\Roaming\marktext\images\2023-09-05-15-05-45-image.png)

- 个人中心

## 项目背景

&emsp;&emsp;我的初衷是尽可能帮助和服务更多的用户和开发者，让他们更加方便快捷的获取他们想要的信息和功能。
接口平台可以帮助开发者快速接入一些常用的服务，从而提高他们的开发效率，比如随机头像，随机壁纸，随机动漫图片(二次元爱好者专用)等服务，他们是一些应用或者小程序常见的功能，所以提供这些接口可以帮助开发者更加方便地实现这些功能。这些接口也可以让用户在使用应用时获得更加全面的功能和服务，从而提高他们的用户体验

## 系统架构

## 技术栈

### 前端技术栈

- 开发框架：React、Umi
- 脚手架：Ant Design Pro
- 组件库：Ant Design、Ant Design Components
- 语法扩展：TypeScript、Less
- 打包工具：Webpack
- 代码规范：ESLint、StyleLint、Prettier

### 后端技术栈

- 主语言：Java
- 框架：SpringBoot 2.7.0、Mybatis-plus、Spring Cloud
- 数据库：Mysql8.0、Redis
- 中间件：RabbitMq
- 注册中心：Nacos
- 服务调用：Dubbo
- 网关：Spring Cloud Gateway
- 负载均衡：Spring cloud Loadbalancer

## 项目模块

- api-frontend ：为项目前端，前端项目启动具体看readme.md文档
- api-common ：为公共封装类（如公共实体、公共常量，统一响应实体，统一异常处理）
- api-backend ：为接口管理平台，主要包括用户、接口相关的功能
- api-gateway ：为网关服务，**涉及到网关限流，统一鉴权，统一日志处理，接口统计，接口数据一致性处理**
- api-order ：为订单服务，主要涉及到接口的购买等
- api-third-party：为第三方服务，主要涉及到腾讯云短信、支付宝沙箱支付功能
- api-interface：为接口服务，提供可供调用的接口
- api-sdk：提供给开发者的SDK

## 功能模块

> 🌟 亮点功能 🚀 未来计划

- 用户、管理员
  - 🌟登录注册：使用令牌桶算法实现手机短信(邮箱)接口的限流，保护下游服务
  - 个人主页，包括上传头像，显示密钥，重新生成ak,sk
  - 管理员：用户管理
  - 管理员：接口管理
  - 管理员：接口分析、订单分析
- 接口
  - 浏览接口信息
  - 🌟 数字签名校验接口调用权限
  - 🌟 SDK调用接口
  - 接口搜索 (🚀 )
  - 购买接口
  - 下载SDK
  - 用户上传自己的接口（🚀）
- 订单
  - 创建订单
  - 订单超时回滚
  - 支付宝沙箱支付

## 快速上手

### 后端

1. 将各模块配置修改成你自己本地的端口、账号、密码
2. 启动Nacos、Mysql、Redis、RabbitMq
3. 将公共服务 api-common 以及客户端 SDK 安装到本地仓库
4. 按顺序启动服务

服务启动顺序参考：

1. api-backend
2. api-order
3. api-gateway
4. api-third-party
5. api-interface

### 前端

环境要求：Node.js >= 16

安装依赖：

```
yarn
```

启动：

```
npm run start:dev
```

**注意：如果想要体验订单和支付业务并且没有个人云服务器的，需要配置内网穿透才能体验(非必要)**

## 欢迎贡献

项目需要大家的支持，期待更多小伙伴的贡献，你可以：

- 对于项目中的Bug和建议，能够在Issues区提出建议，我会积极响应
