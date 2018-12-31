# 系统分析与设计秋季学期大作业-后端
这是一个点餐系统，包含用户点餐、商家出餐、管理员管理三部分功能。[![Build Status](https://travis-ci.org/sa-2018-fall/sa-be.svg?branch=master)](https://travis-ci.org/sa-2018-fall/sa-be)

# 其它
网站数据使用在线mongodb数据库服务提供商[www.mlab.com](www.mlab.com)提供的存储服务。

网站使用GitHub->Heroku pipeline 实时部署在：[https://sa-2018-fall.herokuapp.com](https://sa-2018-fall.herokuapp.com)

用户名：12345678910
密码：123456

功能基本实现。

## 使用的框架、插件等

* 用koa2做后台，在node高版本直接用async、await
* 用mongoose连接mongodb数据库

## 包含的功能

* 手机注册，登录，重置密码
* 用户点餐，该商家会收到消息提示有新订单(用轮询实现)
* 用户查看自己的订单，评价、删除等
* 修改自己的信息，申请成为商户等
* 商家管理订单，接单等
* 统计商家订单数，评分等(页面上的月销量是总销量)
* 商家管理菜单、查看评论
* 管理员管理用户、商铺、分类等
* 搜索功能

## 目录结构

顶层就是vue-cli的结构，主要看前端src和后台server的结构

```md
─.
 ├── app
 ├── ├── common            # 工具
 ├── ├── controllers       # 业务
 ├── ├── models            # 定义数据库模型
 ├── db_vue                # 导出来的数据库数据
 ├── public                # 前端资源
 ├── routes                # 路由
 ├── app.js
 ├── config.js             # 短信api的key相关

```

## 调试运行

```node
npm install
node bin/www
```