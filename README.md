<p align="center">
    <img src="https://img.shields.io/badge/Express-4.17.1-orange">
    <img src="https://img.shields.io/badge/mongoose-6.0.5-brightgreen">
    <img src="https://img.shields.io/badge/vue-3.2.16-brightgreen">
    <img src="https://img.shields.io/badge/TypeScript-4.1.2-blue">	
    <img src="https://img.shields.io/badge/react-17.0.2-blue">	
	<img src="https://img.shields.io/badge/license-MIT-blue">	
</p>

## 简介

很早就有了做个人博客的想法，之前用vue2写过一个，但是该博客整体都令我不满意。最近学了react和vue3，于是就想上手做些项目，于是就有了本项目。

## 博客前台

#### 项目技术：

- Vue3.2框架
- typescript（JavaScript的超集）
- vite （下一代前端开发与构建工具）
- axios（一个基于 promise 的 HTTP 库）
- less（CSS 预处理语言）
-  dayjs（一个轻量的处理时间和日期的 JavaScript 库）
- element-plus（Vue3 组件库）
- highlight.js（代码语法高亮库）
- macy（JS瀑布流插件）
- marked（Markdown 解析和编译器）
- ua-parser-js（是基于JS的User-Agen的轻量级字符串解析器）

#### 实现功能：

- 导航栏：首页、分类、归档、友链、留言、关于我
- 最新文章： 按照发布时间来进行倒序排序展示
- 文章搜索
- 文章目录导航
- 代码高亮
- 响应式
- 主题切换
- 下载文章

## 博客后台

#### 项目技术：

- React框架
- antd（React UI 组件库）
- axios（一个基于 promise 的 HTTP 库）
- react-simplemde-editor（Markdown编辑器）
- macy（js瀑布流插件）
- jszip（创建、读取和编辑.zip文件的js库）
- file-saver（js保存各种类型文件的插件）

#### 实现功能：

- 登录、退出
- 文章、分类、标签、友链、留言等的增删改查
- 图片上传、删除
- 瀑布流图库

## 后端

#### 所用技术：

- express
- mongoose
- multer
- cors
- jsonwebtoken

使用`express`框架进行开发，使用`MongoDB`数据库保存数据，使用`jwt`进行权限认证；实现了对文章、分类、标签、友链、留言等的增删改查、实现了图片上传功能。