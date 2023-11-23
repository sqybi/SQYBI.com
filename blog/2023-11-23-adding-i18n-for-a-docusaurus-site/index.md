---
slug: adding-i18n-for-a-docusaurus-site
title: 为 Docusaurus 站点添加 i18n：LLM 的正确打开方式
authors: [sqybi]
date: 2023-11-23T17:00
tags: [technology]
keywords: [Docusaurus, i18n, LLM, ChatGPT, OpenAI, Copilot]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
---

在发布了建站的[第一篇文章](/blog/sqybi-com-relaunching-after-a-decade/)后，本想趁着三分钟热度抓紧多更新几篇的。

可惜天不遂人愿，就在文章发布当晚，家里的其中一只猫咪就因为突发心脏病回到了喵星。刚刚处理完这边的事情，又需要临时来上海出差。除此之外，还得参加之前已经定好的一大串会议。

因为各种突发事件，这几天忙得焦头烂额。好在昨天晚上 check-in 之后以及今天回北京的飞机上，都还有几个小时的空闲时间。借着这个时间我快速为网站添加了多语言（i18n）支持，也可以写一篇简短的文章介绍一下我是怎么在开发过程中利用大模型的。

<!-- truncate -->

## Docusaurus 的 i18n 支持

对于计算机行业的从业者，i18n 大概率不是一个陌生的词。其实这个词就是“internationalization”的缩写，除去头尾的 `i` 和 `n`，中间正好有 18 个字母。

> 让我看看谁不信邪真的去数了，快在评论里告诉我我没有骗你！

而 i18n 的含义也很简单，一言以蔽之，就是“翻译”。通常来说，i18n 的工作就是通过配置文件的方式为网站或应用中的所有词语和句子提供翻译，并根据用户的选择动态显示对应语言的界面。

如果还不理解的话，可以选择这个网站页面右上角的语言下拉框，并选择 English，然后就不用我多说了。

之所以可以做到这么简单的切换，主要还是因为 Docusaurus 这个框架有着完善的 i18n 支持。根据[官方文档](https://docusaurus.io/docs/i18n/tutorial#translate-your-site)的说明，只需要先用 `<Translate>` 标签包裹所有需要翻译的文字，然后简单运行一句

```shell
npm run write-translations -- --locale {{language}}
```

Docusaurus 的框架就会自动生成一个 `i18n` 文件夹，里面包含了还没有被翻译的文字列表。接下来要做的事情，就是一个一个翻译这些文字了。

不过，这里面其实也会碰到一些不太大的坑。比如，有一些 JSX 代码中可能会包括部分必须是纯文本的参数，而修改这些内容可能又会需要 [Swizzling](https://docusaurus.io/docs/swizzling)……但是总之这些工作都不需要自己写太多代码，框架已经提供了足够多的工具链来完成它们，这里就不展开说了。

那么解决了生成需要翻译内容的问题，下一步就是翻译了。

## 使用 LLM 辅助翻译

对于大部分网站上固有的内容，翻译不是一个难事。一方面，需要翻译的内容并不多，很多 Docusaurus 框架自带的部分在生成翻译文件的时候就已经被翻译好了；另一方面，这些内容的翻译基本是一次性的，一劳永逸。

但是对于博客部分，问题变得不太一样了。每次发布新的博客文章，我都需要翻译整篇文章，才能保证 i18n 站点和原始站点的内容一致。同时，如果修改了某篇文章，我也需要重新翻译修改的部分——这很容易遗漏。

这时，就轮到 LLM（大语言模型）出场了。

虽然我使用的是 GPT-4-turbo，但是实际上也可以尝试一些其他支持 token 长度较长的大语言模型，例如我最近刚刚拿到 API 内测资格的 [月之暗面](https://www.moonshot.cn/)。

> 我本来想在这篇文章的最后放一下两个模型翻译效果的对比，但讽刺的是，作为原文选段的前一篇文章第一个章节部分，在这个国产模型下返回了 `The request was rejected because it was considered high risk` 的错误。我猜估计是提到了“博彩网站”这个关键词吧，国内这么严格的审核真的会影响国内大模型的发展，至少我是不会用它来作为我博客的翻译工具了。

而如何写一个好的 prompt，对于这种全文的翻译来说其实也是挺重要的。这里分享一下我的 prompt，这个 prompt 和整个网站的源代码都是公开的，可以在我的 [GitHub repo](https://github.com/sqybi/SQYBI.com) 中找到。

```text
You are a professional interpreter who can translate articles from ${sourceLang} to ${targetLang}.
User will provide the original article directly, without any other information.
The article is written in plain text, Markdown format or MDX format. You should keep the original Markdown syntax or MDX syntax if there are any. MDX syntax looks like Markdown + HTML. Also, you should not translate meaningful items, such as URLs.
Reply with the translated article. Do not include the original article in your reply. Do not include anything other than the translated article in your reply.
Do not stop your response until you have finished translating the entire article.
```

这段 prompt 除了定义翻译的语言以外，也明确了需要被翻译的内容是 Markdown / MDX 格式，顺便介绍了一下 MDX 格式的基本样式。在这之上，我还要求 GPT 不要翻译 URL 之类的内容，以免导致链接失效。

接下来，我也定义了一些输出格式，避免 GPT 回复翻译后文字之外的内容。最后，我要求它不要在翻译完全文前停止，避免翻译不完整的情况。虽然翻译不完整也可以通过再触发一次对话请求解决，但这要求必须带上之前的聊天内容，一下子就会让接口调用的花费上升到 2-3 倍甚至更多，并不合算。

此外，一个提醒是对于 ChatGPT 的这种非常多 token 的调用，强烈建议使用 stream 模式。单个 HTTP 请求很容易出现在等待时 HTTP 连接已经断开的情况。

## 使用 Copilot 生成翻译脚本

除了 ChatGPT，GitHub Copilot 也是我工作生活中最经常使用 LLM 的场景之一。

而这次的任务其实非常适合交给 LLM 生成代码，所以我也尝试使用 Copilot 生成了自动翻译脚本。

实际上，根据我使用 LLM 的经验，因为 LLM 生成的代码总会有一些莫名其妙的错误，所以最好的使用方式并不是让它直接生成一份你需要的代码。相反，你应该尽可能定义整个流程的关键部分（也就是你不想自己写代码的部分），然后让它尽可能正确地生成这些代码，然后再基于这些代码进行修改。

比如这次的任务里，因为对 Node.js 的本地接口调用和各类 API 并不是那么熟悉，我不希望自己查阅接口编写的部分至少包括：

1. 读取文件内容。
2. 读取文件最后修改时间，用于判断是否要重新翻译。
3. 调用 ChatGPT 的 API。
4. 查询 Markdown frontmatter 的正则表达式，用于区分 frontmatter 部分并添加翻译时间信息。

此外，因为要写很多繁复的代码，所以我希望它至少能生成一个：循环查找文件 -> 读取每个文件的信息 -> 对比修改时间和翻译时间 -> 需要首次翻译或重新翻译时调用 ChatGPT 的框架。

我的做法是写了大概 7-8 行的注释，用自然语言描述了这个框架要做的事情。接下来就是在 VSCode 中按下 Ctrl+I，然后要求 Copilot 根据注释补全代码。

从结果上来说，它确实生成了整个框架，甚至把关键部分拆分了函数，这一点可能很多计算机专业的应届生都做不到。但是，也和预期一样，它生成的代码有很多问题。我记忆中的问题就至少有：

- ChatGPT 的接口没有正确使用 stream 模式调用。
- 正则表达式没有加上 `/s`。
- 根据正则提取内容的代码有一些奇怪的错误。
- 没有循环查找文件夹下的所有文件。

但是，所有我希望它生成的代码，它基本都成功生成了。我需要做的，只是对代码结构进行一些微调，然后参考生成的代码自己再改一份。

而在修改的过程中，Copilot 还会不停地进行代码补全和提示。可以说对于编写业务代码来说，Copilot 至少能节省下一半的重复开发时间——当然也要仔细查看每一段生成的代码，说不定哪里就埋了一个奇怪的坑。

此外，之所以使用 Copilot 而不使用 GPT，是因为 Copilot 其实作了很多工程化的优化，例如参考了已有代码的 AST 进行补全，而不是单纯进行文字续写。虽然很精彩，但是这里就不展开说了，网上也有一些分析 Copilot 实现的文章可以参考。

## LLM 的其它使用方法

如此强大的 LLM，当然还有各种各样的使用方式。其实我自己也有很多其它的计划，仅限于这个网站，就可以利用它检查我文章中的语法错误，润色文章用词，以及分析一些评论中包含的情绪并进行自动回复等等。

这里权当是抛砖引玉了。作为跨时代的产品，能够利用好它提升自己的效率，就是好的事情。
