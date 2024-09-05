---
slug: recent-updates-of-docusaurus
title: Docusaurus 的近期更新
authors: [sqybi]
date: 2024-09-06T00:10
tags: [technology, random]
keywords: [Docusaurus]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
---

一段时间没有更新博客，前几天更新了一篇文章顺便升级了 Docusaurus 的版本。

解决了一些兼容性问题之后，感觉好像有哪里不一样了，就仔细阅读了一下 Docusaurus 的更新日志，发现他们最近还真的更新了不少实用的功能。

在对着这些功能一一改动之后，我决定简短地总结一下这些升级以及 [SQYBI.com](https://sqybi.com/) 上的对应修改。

:::note[其它改动]

除了 Docusaurus 相关的改动之外，我还对博客进行了一系列的微调。

其中最明显的当属博客浅色模式背景配色的改动，以及整个博客字体的改动了。

现在博客使用 `Noto Serif SC` 作为默认正文和标题字体，`Courier Prime` 作为等宽字体。前者直接使用会有一些渲染问题，我参考了 [MÖBIUS 莫比乌斯](https://onojyun.com/) 这个博客的 CSS 进行了一些调整，之后显示效果好了不少。

其它的小改动比如 header / footer 的调整和 blockquote 的样式调整等，这里就不再赘述。ChatGPT 真的是写 CSS 的神器啊。

:::

<!--truncate-->

## 作者相关改动

### 作者个人页面和全部作者页面

> 改动版本：[Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-authors-pages)

这个应该是最明显的改动，在现在这一页的上方就可以看到我的名字可以点击了。

现在暂时只有我一个作者，不过 Docusaurus 本身的设计就是支持多作者的，我也不排斥有其他作者一起来写作。如果你有投稿的意愿，可以通过这个网站上任何可以联系到我的方式联系我。

### 社交媒体链接

> 改动版本：[Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-social-icons)

和上面的改动类似，我的名字下面现在也多出了一排小图标。

暂时只有有限的几个网站能够自动适配图标，不知道后面会不会再更新自定义图标的功能。

## 标签相关改动

### 为标签添加描述信息

> 改动版本：[Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#tags-files)

这个改动的最大作用就是：可以把标签的代号、URL 和显示文字分开，且显示文字可以支持 [i18n](/blog/adding-i18n-for-a-docusaurus-site/) 了。

我也重新整理了一下我的所有标签并进行了分类，这样找特定系列的文章应该也会变得更简单一些。

后面有时间的话可能会把“所有文章”页面的 CSS 再调整一下，尽可能贴近 Docusaurus 本身的标签样式。

### 汇总的标签页面

> 改动版本：[Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#tags-files)

因为上一个改动，Docusaurus 也添加了一个包含 [所有标签](https://sqybi.com/blog/tags/) 的汇总页面。

因为汇总得还挺不错，我把这个页面的链接放在了顶部导航栏里，替代了原先的文章分类下拉框。

## 其它页面改动

### 更好看的 RSS 页面

> 改动版本：[Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-feeds-styling)

RSS / Atom 页面现在支持 XSLT 描述文件了！

简单来说，这个文件的作用就是可以把原先看起来就像一坨代码的 XML 文件以人类更可读的形式展示出来。Docusaurus 考虑到这群懒人应该都不愿意自己写 XSLT 文件，所以贴心的准备了一个默认的，只需要添加配置 `xslt: true` 就可以生效。

我已经打开了这个配置，大家可以自己看一下 [RSS 页面](pathname:///blog/rss.xml) 的展示效果（顺便订阅一下哦！）。

> 一个小的发现：Docusaurus 的文档里把 xslt 文件的扩展名不小心写成了 xls，看来是 Excel 用太多了，哈哈哈！

### 博客边栏支持以年份分组

> 改动版本：[Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-sidebar-grouping)

这个改动还挺明显的，不过我一度以为自己曾经实现了这个功能，还在 [Telegram channel](https://t.me/sqybi_channel) 里吐槽了一下。

后来仔细检查了一下，我实现的其实是 [所有文章](/archive/) 页面，逻辑是类似的所以记错了。

希望哪天 Docusaurus 把这个页面也做了吧，省得每次更新都要提心吊胆，生怕哪个 breaking change 让这个功能失效了。

## 小功能更新

### Hash Router 模式

> 改动版本：[Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#hash-router---experimental)

这个就是 URL 里带 `#` 的功能，也就是现在前端框架都支持的单页面应用。

如果希望用压缩包发布博客的话，这个功能可以允许用户简单的在本地打开一个 html 文件就能获得博客的全部功能（实际上是使用 JavaScript 实现各种跳转）。但是因为 hash router 并不能视为一个单独的页面，从而不能被缓存，历史跳转和 URL 直接访问也会有各种各样的问题。对于大部分在线应用，使用单页面模式都不一定是一个好的选择。

这个问题当年在前司用 Vue 写抽奖系统的时候就踩过一次坑，后来用 React 写数据分析系统的时候果断避开了。Docusaurus 官方也贴心地说明了不要在在线环境中使用这个模式。

### 为 localStorage 的键值添加前缀

> 改动版本：[Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#site-storage---experimental)

TL;DR: Docusaurus 存储在 Chrome localStorage 里面的数据在一个 URL 可能指向多个网站的时候会在网站间产生冲突，所以他们给这些数据的 key 加了前缀。

这个问题可能在本地调试多个 Docusaurus 站点的时候会比较明显，毕竟可能同样是 `http://localhost:3000`，每次启动本地服务器都是不同的网站。

这还是一个实验性功能，我也没有这样的需求，所以现在这个网站还没有开启它。
