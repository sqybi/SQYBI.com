import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import GiscusComponent from '../../components/GiscuzComponnet';

export default function BlogPostItemWrapper(props) {
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
        <GiscusComponent />
      )}
    </>
  );
}
