import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/theme-common/internal';

const localeMap = {
  'en-US': 'en',
  'zh-Hans': 'zh-CN',
};

export default function BlogPostItemWrapper(props) {
  const {
    siteConfig: { customFields },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const {
    colorMode
  } = useColorMode();
  const {
    metadata,
    isBlogPostPage
  } = useBlogPost();
  const { frontMatter } = metadata;
  const { disable_comments: disableComments } = frontMatter
  return (
    <>
      <BlogPostItem {...props} />
      {(!disableComments && isBlogPostPage) && (
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
          theme={colorMode}
          lang={localeMap[currentLocale] ?? currentLocale}
          loading="lazy"
          crossorigin="anonymous"
          async
        />
      )}
    </>
  );
}
