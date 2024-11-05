// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SQYBI.com',
  tagline: 'Change is a part of life and takes part in finding us who we are.',
  favicon: 'img/favicon.ico',
  titleDelimiter: '|',

  // Set the production url of your site here
  url: 'https://sqybi.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,
  staticDirectories: ['static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sqybi', // Usually your GitHub org/user name.
  projectName: 'SQYBI.com', // Usually your repo name.
  deploymentBranch: 'main', // The branch of your site that GitHub pages will deploy from.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en-US'],
    path: 'i18n',
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
        calendar: 'gregory',
      },
      'en-US': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en-US',
      },
    },
  },

  markdown: {
    format: 'detect',
    mermaid: true,
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          postsPerPage: 10,
          feedOptions: {
            xslt: true,
            type: 'all',
            description: 'feedId:61968779590452224+userId:70060187581608960',
            copyright: `Copyright © 2023-${new Date().getFullYear()} SQYBI.com.`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 50 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 50),
                ...rest,
              });
            },
          },
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 20,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          onInlineTags: 'throw',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: [
            './src/css/custom-font.css',
            './src/css/custom.css',
          ],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        gtag: {
          trackingID: 'G-SBSGLRW6MK',
        },
      }),
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   id: 'archive',
      //   content:
      //     '网站增加了“所有文章”页面，可以从导航栏点击访问，或从<a href="/archive">这里</a>访问',
      //   backgroundColor: "var(--ifm-color-secondary)",
      //   isCloseable: true,
      // },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      navbar: {
        title: 'SQYBI.com',
        logo: {
          alt: 'SQYBI.com Logo',
          src: 'img/logo.png',
        },
        items: [
          // Links on the left side of the navbar
          {
            to: '/blog',
            label: '博客',
            position: 'left',
          },
          {
            to: '/blog/tags/',
            label: '所有标签',
            position: 'left',
          },
          {
            to: '/archive',
            label: '所有文章',
            position: 'left',
          },
          {
            to: '/links',
            label: "友情链接",
            position: 'left',
          },
          {
            to: '/about',
            label: "十几个为什么",
            position: 'left',
          },
          {
            to: 'pathname:///blog/rss.xml',
            label: "📶RSS",
            position: 'left',
          },
          // Links on the right side of the navbar
          {
            type: 'dropdown',
            label: '我的',
            position: 'right',
            items: [
              {
                label: '✈️ Telegram',
                href: 'https://t.me/sqybi',
              },
              {
                label: '🐱 GitHub',
                href: 'https://github.com/sqybi',
              },
              {
                label: '📷 Flickr',
                href: 'https://www.flickr.com/sqybi',
              },
              {
                label: '📺 Bilibili',
                href: 'https://space.bilibili.com/105879',
              },
              {
                label: '🐦 Twitter',
                href: 'https://twitter.com/sqybi',
              },
              {
                label: '📘 Facebook',
                href: 'https://facebook.com/sqybi',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © 2023-${new Date().getFullYear()} SQYBI.com<br />Built with Docusaurus. Served by Cloudflare.<br /><a href=\"https://www.foreverblog.cn/blog/5675/cert.html\" target=\"_blank\"><img src=\"https://img.foreverblog.cn/logo_en_default.png\" alt=\"\" style=\"width:auto;height:16px;\"></a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'forest',
        },
        options: {},
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 2560, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 4, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    './plugins/blog-list',
  ],

  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js',
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  customFields: {
    giscusRepoId: process.env.GISCUS_REPO_ID,
    giscusCategoryId: process.env.GISCUS_CATEGORY_ID,
    commentServiceUrl: process.env.COMMENT_SERVICE_URL,
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'baidu-site-verification',
        content: 'codeva-S7U776qVYB',
      },
    }
  ],

  future: {
    experimental_faster: true,
  },
};

export default config;
