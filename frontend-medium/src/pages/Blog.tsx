// Blog.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hookid'; // Correct path to your hook
import FullBlog from '../components/FullBlog'; // Correct path to your FullBlog component
import Appbar from '../components/Appbar'; // Correct path to your Appbar component

export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  // Ensure the props passed to FullBlog match the expected BlogCardProps interface
  return (
    <div>
      <Appbar />
      <div>
        <FullBlog
          id={blog.id}
          authName={blog.author?.name || 'Unknown Author'}
          title={blog.title || 'Untitled'}
          content={blog.content || 'No content available'}
          publishedDate={blog.publishedDate || 'Unknown Date'} // Adjust this based on your blog data structure
        />
      </div>
    </div>
  );
}
