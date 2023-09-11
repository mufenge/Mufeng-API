# Mufeng API

> 一个丰富的API开放调用平台，为开发者提供便捷、实用、安全的API调用体验； Java + React 全栈项目，包括网站前端和后端
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

6. clienssdk:客户端对象。

启动nacos、backend、gateway、interface，sdk Client和common需要提前在本地install。先在backend项目中调用对应的interface lnfo/invoke方法，校验参数、判断接口id是否存在、是否关闭等，然后获取到当前登录用户，并查出对应的accessKey和secretKey，并以此作为参数创建SDK客户端对象，然后把刚才参数中的user RequestParams通过Gson库将JSON字符串反序列化为Java对象，SDK客户端封装一系列请求参数，使用hutool工具包，将请求发送给gateway网关项目，在网关项目中，在全局过滤中，我们先获取请求头上的一系列信息，包括“请求参数、路径、方法、来源地址"等，然后我们再做鉴权，通过传入的access Key去找出对应的用户，并且对请求的时间等作校验，再通过access Key查出来的用户，进一步得到对应的secret Key。与此同时，我们还需要对得到的path和method所对应的接口进行查询，判断是否存在，如果不存在则抛出指定的异常。最后，如果上述校验都没问题，那么我们认为这个请求是合法的，通过一个返回结果处理器handle Response，将用户和接口对应表user_interface_info中的用户的剩余接口调用次数等字段进行更新操作，结束后完成业务流程。

在上面的过程中，我提到了鉴权、校验、查询用户、查询secret Key"等操作，这些操作对应的代码是在backend项目中，如果我们直接把对应的代码放到gateway项目，势必会增加项目的复杂度以及冗余等。所以我想到了使用Dubbo这样一个RPC框架，通过@Enable Dubbo、@Dubbo Reference、@Dubbo Service等注解，配置相应的yml属性，并以Nacos作为服务的注册中心，实现了远程业务代码的调用。

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
