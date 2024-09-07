import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import CommentSection from '../../components/CommentSection';

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
      <div className="margin-top--lg" />
      {(!disableComments && isBlogPostPage) && (
        <CommentSection />
      )}
    </>
  );
}
