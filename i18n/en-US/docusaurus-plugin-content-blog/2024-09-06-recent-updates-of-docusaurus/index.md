---
slug: recent-updates-of-docusaurus
title: The Recent Updates of Docusaurus
authors: [sqybi]
date: 2024-09-06T00:10
tags: [technology, random]
keywords: [Docusaurus]
unlisted: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 4
last_translated_at: 2024-09-05T16:07:20.960Z
---

:::info[Translation Tool]

This article was translated by ChatGPT automatically, with minor manual corrections.

:::

It's been a while since I updated the blog. A few days ago, I published a new article and upgraded the version of Docusaurus along the way.

After solving some compatibility issues, it felt like something was different. So, I carefully read through the Docusaurus update logs and found that they indeed added many useful features recently.

After making changes according to these features one by one, I decided to briefly summarize these updates and the corresponding modifications on [SQYBI.com](https://sqybi.com/).

:::note[Other Changes]

In addition to the changes related to Docusaurus, I also made a series of fine-tunings to the blog.

The most noticeable ones are the background color adjustment in light mode and changes to the font of the entire blog.

The blog now uses `Noto Serif SC` as the default font for the body and headers, and `Courier Prime` as the monospace font. The former had some rendering issues initially, so I referred to the CSS of [MÖBIUS 莫比乌斯](https://onojyun.com/) and made some adjustments, which significantly improved the visual effect.

Other small changes like adjustments to the header/footer and the blockquote styles are not detailed here. ChatGPT is indeed a magic tool for writing CSS.

:::

<!--truncate-->

## Author-Related Changes

### Author Personal Page and All-Authors Page

> Change Version: [Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-authors-pages)

This is probably the most noticeable change; you can now see my clickable name at the top of this page.

For now, I am the only author. However, Docusaurus is designed to support multiple authors, and I am open to having other authors contribute as well. If you are interested in submitting articles, you can contact me through any available means on this site.

### Social Media Links

> Change Version: [Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-social-icons)

Similar to the above changes, a row of small icons has now appeared beneath my name.

Currently, only a limited number of websites can automatically adapt icons. It's uncertain if there will be updates to add custom icon functionalities in the future.

## Tag-Related Changes

### Adding Descriptions to Tags

> Change Version: [Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#tags-files)

The biggest benefit of this change is that it allows separating the tag code, URL, and display text, and the display text can support [i18n](/blog/adding-i18n-for-a-docusaurus-site/).

I have also reorganized all my tags and categorized them, making it easier to find specific series of articles.

I might also adjust the CSS of the "All Articles" page later to align it more closely with Docusaurus's native tag styles.

### Aggregate Tag Page

> Change Version: [Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#tags-files)

Due to the previous change, Docusaurus has also added a summary page containing [all tags](https://sqybi.com/blog/tags/).

Since the summary page works quite well, I placed its link in the top navigation bar, replacing the original article categories dropdown.

## Other Page Changes

### Better Looking RSS Page

> Change Version: [Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-feeds-styling)

The RSS/Atom pages now support XSLT stylesheets!

In simple terms, the purpose of this file is to present the XML files, which originally look like a heap of code, in a more human-readable format. Considering the laziness of some, Docusaurus thoughtfully provided a default stylesheet that can be activated by adding the config `xslt: true`.

I have enabled this configuration, so you can check out the display effect of the [RSS page](pathname:///blog/rss.xml) yourself (and subscribe while you're at it!).

> A small discovery: In Docusaurus's documentation, the xslt file extension was accidentally written as xls, probably from using Excel too much, hahaha!

### Blog Sidebar Grouping by Year

> Change Version: [Docusaurus 3.5](https://docusaurus.io/blog/releases/3.5#blog-sidebar-grouping)

This change is quite noticeable. However, I once thought I had implemented this feature and even complained about it in my [Telegram channel](https://t.me/sqybi_channel).

Afterwards, upon closer inspection, I realized that what I had implemented was the [all articles](/archive/) page, which has similar logic, hence the confusion.

Hopefully, Docusaurus will create this page someday, so I won't have to worry about breaking changes rendering this feature ineffective with every update.

## Small Feature Updates

### Hash Router Mode

> Change Version: [Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#hash-router---experimental)

This feature refers to URLs with `#`, a functionality now supported by all SPA (Single Page Application) frameworks.

If you wish to publish your blog via a compressed file, this feature allows users to open an HTML file locally and enjoy full blog functionality (essentially using JavaScript for various navigations). However, since hash router is not considered a separate page, it cannot be cached, and there are various issues with history navigation and direct URL access. For most online applications, using single-page mode might not be the best choice.

This issue was encountered when I used Vue to write a lottery system at a previous job and later avoided it altogether when using React to develop a data analysis system. Docusaurus also thoughtfully advises against using this mode in an online environment.

### Adding Prefixes to localStorage Keys

> Change Version: [Docusaurus 3.4](https://docusaurus.io/blog/releases/3.4#site-storage---experimental)

TL;DR: Data stored in Chrome localStorage by Docusaurus can conflict between websites when a URL points to multiple sites. Hence, they added a prefix to those data keys.

This issue might be more pronounced when debugging multiple Docusaurus sites locally, as each time you start the local server, it's a different website at the same `http://localhost:3000`.

This is still an experimental feature, and I don't have such requirements, so it hasn't been enabled on this site yet.
