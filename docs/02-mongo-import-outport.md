---
layout: default
title: 解决方案：Mongo shell 导入导出数据
---

# 解决方案：Mongo shell 导入导出数据
{:.no_toc}

* 目录
{:toc}

## 1、说明

在进行沙盒开发时，使用远程免费的数据库进行开发测试会给开发带来很大的方便。

## 2、解决方案
针对JSON格式文件，导入导出持久化的本地测试数据文件

```bash
# Import collection
mongoimport -h ds135433.mlab.com:35433 -d chihuo -c <collection> -u <user> -p <password> --file <input file>
# Export collection
mongoexport -h ds135433.mlab.com:35433 -d chihuo -c <collection> -u <user> -p <password> -o <output file>
```

## 3、参考链接
[https://mlab.com/databases/chihuo#tools](https://mlab.com/databases/chihuo#tools)