import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const localeMap = {
  'en-US': 'en',
  'zh-Hans': 'zh-CN',
};

export default function BlogPostItemWrapper(props) {
  const {
    siteConfig: {customFields},
    i18n: {currentLocale},
  } = useDocusaurusContext();
  return (
    <>
      <BlogPostItem {...props} />
      <Giscus
        id="comments"
        repo="sqybi/SQYBI.com"
        repoId={customFields.giscusRepoId}
        category="Announcements"
        categoryId={customFields.giscusCategoryId}
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang={localeMap[currentLocale] ?? currentLocale}
        loading="lazy"
        crossorigin="anonymous"
        async
      />
    </>
  );
}
