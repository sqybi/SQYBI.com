import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogPostItemWrapper(props) {
  const {
    siteConfig: {customFields},
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
        lang="zh-CN"
        loading="lazy"
        crossorigin="anonymous"
        async
      />
    </>
  );
}
