# Fishbone是什么
轻量级可扩展的敏捷开发Node.js框架,支持ES6/7全新特性,支持Koa、Express中间件,基于koa2。

## 特性
### 基于koa2

Fishbone基于著名的Node.js框架koa2进行了封装。扩展了Koa的功能，能够迅速的进行Web开发。

### 为敏捷开发和微服务而生

Fishbone是在Wii团队1年的Node.js项目开发积累中酝酿诞生的，以提升团队开发效率、助力敏捷开发为目的。框架经过公司多个互联网产品上线、迭代的考验。

### 支持灵活的自定义路由

Fishbone采用的模式(module/controller/dao）路由规则以外，还支持用户定制路由。 在项目中遵循路径即url配置即可灵活的支持Restful等各种自定义路由。

### 中间件

支持JWT鉴权、解决跨域、报错捕捉和请求中的文件解析等中间件。并且开发者可以自由的定义/编写中间件。

----

# 如何使用

## 创建项目结构

	.
	├-- server
	|   ├-- Controllers 	控制器
	|   |	├-- user.js 	用户模块接口文件
	|   |	└-- login.js 	登陆模块接口文件
	|   ├-- Dao 	数据库操作层
	|   |	├-- userDao.js 		用户模块数据库操作文件
	|   |	└-- loginDao.js 	登陆模块数据库操作文件
	|   ├-- Model 	表模型
	|   |	├-- mongo 	mongodb表模型
	|   |	|	└-- user_info.js 	模型文件
	|   |	├-- mysql 	mysql表模型
	|   |	└	└-- user.js 	模型文件
	|   ├-- Util 	工具
	|   |	└-- public.js 	通用方法
	|   └-- Base.js 	注册文件
	├-- config.js 	数据库配置、端口配置
	├-- start.js 	启动文件
	├-- package.json 	npm依赖目录
	└-- yarn.lock 	yarn依赖目录

### 文件说明

#### 入口文件

start.js

```
const base = require('./server/Base');
const config = require('./config');
const {App} = require('fishbone_c');
const app = new App({config, base});

class start{

	static async run(){

		//连接数据库
		await app.createDb();

		// 启动服务
		await app.strat();
	}
};

start.run();
```

此文件为启动文件。主要进行了创建数据库连接，注册控制器和生成表模型。

#### 服务配置文件

config.js
```
module.exports = {
	db:{
		mysql:{
			dbname: '数据库名称',
			username:'账号',
			password: '密码',
			tablePrefix:"前缀",
			options:{
				host: "服务器IP",
				port: '端口',
				dialect: '数据库类型',
				logging: 日志输出开关
			}
		},
		mongo:{
			url: "mongodb://账号:密码@服务器IP:端口/数据库名称",
			tablePrefix:"前缀",
		}
	},
	port: 服务端口,
	secret: 'JWT鉴权密钥',
	noAuth: [
		/\/user\/login/, 
		不需要鉴权的接口
	],
}
```

配置mysql和mongodb的连接参数、端口号、JWT鉴权密钥和不需要鉴权的接口。

## 安装项目依赖

npm:

	npm install fishbone_c

yarn:

	yarn add fishbone_c

## 启动服务

在根目录打开命令窗口，执行命令行

	node start.js

