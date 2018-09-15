---
layout: default
title: 解决方案：git pull 出现unrelated history
---

# 解决方案：git pull 出现unrelated history
{:.no_toc}

* 目录
{:toc}

## 1、说明

当远程仓库先于本地仓库创建，并且存在无关本地仓库的提交，则在`git pull`时候会引起

```
fatal: refusing to merge unrelated histories

```

## 2、解决方案
`git pull` 的时候带上`--allow-unrelated-histories`

```
git pull -f origin master --allow-unrelated-histories

```