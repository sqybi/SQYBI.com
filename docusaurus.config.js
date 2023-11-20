// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

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

  onBrokenLinks: 'warn', // Change to `throw` after all blog tags exist.
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    format: 'mdx',
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
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} SQYBI.com.`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
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
      //   id: 'welcome',
      //   content:
      //     'SQYBI.com 正式上线！欢迎访问！',
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
          src: 'img/logo.svg',
        },
        items: [
          { to: '/blog', label: '博客', position: 'left' },
          {
            type: 'dropdown',
            label: '文章分类',
            position: 'left',
            items: [
              {
                label: '碎碎念',
                to: '/blog/tags/random/'
              },
              {
                label: '计算机技术',
                to: '/blog/tags/technology/'
              },
              {
                label: '摄影',
                to: '/blog/tags/photography/'
              },
            ],
          },
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
        copyright: `Copyright © ${new Date().getFullYear()} SQYBI.com<br />Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
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
  ],

  customFields: {
    giscusRepoId: process.env.GISCUS_REPO_ID,
    giscusCategoryId: process.env.GISCUS_CATEGORY_ID,
  },
};

export default config;
