---
slug: adding-i18n-for-a-docusaurus-site
title: "Adding i18n for a Docusaurus Site: The Correct Way to Launch LLM"
authors: [sqybi]
date: 2023-11-23T17:00
tags: [technology]
keywords: [Docusaurus, i18n, LLM, ChatGPT, OpenAI, Copilot]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
last_translated_at: 2023-11-23T22:56:49.000Z
---

> (This article was translated by ChatGPT automatically.)

After publishing the [first article](/blog/2023-11-20-sqybi-com-relaunching-after-a-decade/) about website construction, I had intended to take advantage of the three minutes of enthusiasm to quickly update a few more articles.

Unfortunately, things didn't turn out as desired. On the very night the article was published, one of my cats passed away from a sudden heart attack, returning to the stars. Having just settled that matter, I had to travel to Shanghai on short notice for work. Besides that, there was a string of meetings already scheduled that I needed to attend.

Because of various emergencies, I've been incredibly busy these days. Fortunately, after checking in last night and during the flight back to Beijing today, I still had a few hours of free time. I used this time to quickly add support for multiple languages (i18n) to the website, and I can also write a short article to introduce how I've made use of large models in my development process.

## i18n Support in Docusaurus

For professionals in the computer industry, i18n is likely not an unfamiliar term. In fact, this word is an abbreviation for "internationalization", omitting the 'i' and 'n' at the beginning and end, there are exactly 18 letters in between.

> Let's see who's curious enough to actually count them, and please let me know in the comments that I didn’t fool you!

The meaning of i18n is simple – it essentially refers to "translation". Generally, the work of i18n involves providing translations for all words and sentences in a website or application through configuration files, and dynamically displaying the corresponding language interface based on the user's choice.

If you still don't understand, you can select the language dropdown box in the upper right corner of this website page, choose English, and then I won't need to say more.

The reason this switch can be done so easily is mainly thanks to the well-rounded i18n support of the Docusaurus framework. According to the [official documentation](https://docusaurus.io/docs/i18n/tutorial#translate-your-site), all you need is to first wrap all translatable texts with the `<Translate>` tag and then simply run

```shell
npm run write-translations -- --locale {{language}}
```

The Docusaurus framework will automatically generate an `i18n` folder, containing a list of texts that have yet to be translated. The next thing to do is to translate these texts one by one.

However, there are some minor pitfalls to be encountered. For example, some JSX codes might include certain parameters that need to remain plain text, and changing this content might require [Swizzling](https://docusaurus.io/docs/swizzling)... But in any case, most of these tasks don't require writing too much code by yourself, the framework has provided sufficient toolchains to complete them, and I won't go into details here.

Once the generation of content needing translation is resolved, the next step is translation.

## Aiding Translation with LLMs

For most inherent content on websites, translation isn't difficult. On one hand, the content that needs to be translated isn't voluminous - many parts that come with the Docusaurus framework are already translated upon the creation of translation files; on the other hand, the translations of this content are mostly a one-time effort that lasts permanently.

However, the blog section poses a different problem. For every new blog post I publish, I need to translate the entire article to ensure that the content in the i18n site is consistent with the original site. Also, if I make changes to a certain article, I need to re-translate the modified parts – which can be easily overlooked.

This is when LLMs (large language models) step in.

Although I use GPT-4-turbo, you could try other large language models that support longer token lengths as well, such as [Moonshot AI](https://www.moonshot.cn/), for which I recently received API beta access.

> I originally planned to compare the translation effects of the two models at the end of this article, but ironically, the first section of the previous article, which was to serve as the original text excerpt, returned an error of `The request was rejected because it was considered high risk` under the domestic model. I suspect it's probably because of the term "gambling site" – such strict review in China really could hinder the development of domestic large models, at least I wouldn't use it as the translation tool for my blog.

Writing a good prompt is actually quite important for this kind of full-text translation. Here is my prompt; the prompt and the entire site's source code are open source and can be found in my [GitHub repo](https://github.com/sqybi/SQYBI.com).

```text
You are a professional interpreter who can translate articles from ${sourceLang} to ${targetLang}.
User will provide the original article directly, without any other information.
The article is written in plain text, Markdown format or MDX format. You should keep the original Markdown syntax or MDX syntax if there are any. MDX syntax looks like Markdown + HTML. Also, you should not translate meaningful items, such as URLs.
Reply with the translated article. Do not include the original article in your reply. Do not include anything other than the translated article in your reply.
Do not stop your response until you have finished translating the entire article.
```

This prompt not only defines the languages to be translated but also clarifies that the content to be translated is in Markdown/MDX format, to which the basics of MDX format are briefly introduced. In addition, I also require GPT not to translate content such as URLs to avoid link failure.

Next, I defined some output formats to prevent GPT from responding with content other than the translated text. Finally, I asked it not to stop before it finished translating the entire article, to avoid an incomplete translation situation. Even though an incomplete translation can be resolved by triggering another conversation request, it requires bringing in the previous chat content, which would make the cost of API calls 2 to 3 times or even more expensive and not cost-effective.

Also, a tip for such ChatGPT calls with a large number of tokens, it is highly recommended to use stream mode. Single HTTP requests can easily drop due to HTTP connection loss while waiting.

## Generating Translation Scripts with Copilot

Besides ChatGPT, GitHub Copilot is one of the most frequent uses of LLMs in my work life.

This task is also quite suitable for LLM-generated code, so I tried to generate an automatic translation script with Copilot.

Actually, based on my experience with LLMs, because the codes produced by LLMs always have some inexplicable errors, the best way to use them is not to let it generate the code you need directly. Instead, you should define the key parts of the process as much as possible (aka the parts you do not want to code yourself), then let it generate these codes as correctly as possible before modifying them based on the output.

For example, in this task, since I'm not too familiar with local interfacing calls in Node.js and various APIs, I don't want to code at least the following parts myself:

1. Reading file contents.
2. Reading the last modification time of the files, to determine whether to re-translate.
3. Calling the ChatGPT API.
4. A regular expression to query Markdown frontmatter, to distinguish frontmatter parts and add translation time information.

Moreover, as a lot of complex codes needed to be written, I wanted it to generate at least a framework of: Looping to find files in the folder -> Reading information of each file -> Comparing modification time and translation time -> Calling ChatGPT for initial translation or re-translation when necessary.

My approach was to write about 7-8 lines of comments, describing in natural language what this framework should do. Then, in VSCode, I pressed Ctrl+I and asked Copilot to complete the code based on the comments.

The result indeed generated the entire framework and even split key parts into functions, something that many computer science graduates can't do. However, as expected, the code it generated had many faults. From what I remember, the issues included:

- The ChatGPT interface didn't correctly use stream mode.
- The regular expression lacked `/s`.
- The code for extracting content based on the regular expression had some strange errors.
- It did not recursively look for all the files in a folder.

However, most of the codes I hoped it would generate were indeed successfully provided. All I needed to do was to slightly adjust the code structure and then amend it myself based on the generated output.

During this modification process, Copilot continued to offer code completion and suggestions. It's say for the development of business logic, Copilot could potentially save at least half of the repetitive development time – of course, each segment of generated code needs to be carefully reviewed to avoid the mysterious pitfalls that might lurk within.

Besides, the reason for using Copilot instead of GPT is that Copilot has undergone quite a few engineering optimizations, like completing the code based on existing AST rather than simply continuing the text. While fascinating, I will not delve into this topic here, as there are some articles online analyzing Copilot's implementation for reference.

## Other Ways to Use LLMs

There are various ways to use such powerful LLMs. Actually, I have many other plans for usage, just limited to this website, I could use them to check for grammatical errors in my articles, refine the use of terms, as well as analyze emotions contained in some comments and auto-reply, etc.

Consider this as a hint. Being a cross-age product, utilizing it to improve one's own efficiency is always a good thing.
