import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import Layout from './components/Layout/Layout';

import BlogPostList from './components/BlogPostList/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm/BlogPostForm';

const samplePosts = [

  {

    id: '1',

    title: 'Getting Started with React',

    author: 'John Doe',

    summary: 'Learn the basics of React and build your first application.',

    content: `<div> 
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
              </div>`,

    date: '2023-01-01',

    url: '/posts/1',

  },

  {

    id: '2',

    title: 'CSS Grid vs. Flexbox',

    author: 'Jane Doe',

    summary: 'A comparison of two powerful layout systems in CSS.',

    content: `<div> 
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
              </div>`,

    date: '2023-02-15',

    url: '/posts/2',

  },

  {

    id: '3',

    title: 'Accessibility in Web Development',

    author: 'Jim Doe',

    summary: 'Tips for making your web applications more accessible.',

    content: `<div> 
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
              </div>`,

    date: '2023-03-10',

    url: '/posts/3',

  },

];

const App = () => {
  const [posts, setPosts] = useState(samplePosts);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmitPost = (postData) => {
    if (postData.id) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === postData.id ? postData : post
      ));
    } else {
      // Create new post
      const newPost = {
        ...postData,
        id: Date.now().toString(),
        url: `/posts/${Date.now().toString()}`
      };
      setPosts([...posts, newPost]);
    }
    navigate('/');
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    // Also delete associated comments
    setComments(comments.filter(comment => comment.postId !== postId));
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Create a wrapper component for BlogPostDetail to handle the comment filtering
  const BlogPostDetailWrapper = () => {
    const { id } = useParams();
    const postComments = comments.filter(comment => comment.postId === id);
    
    return (
      <BlogPostDetail 
        posts={posts} 
        deletePost={deletePost}
        comments={postComments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    );
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BlogPostList posts={posts} navigate={navigate} />} />
        <Route path="/posts/:id" element={<BlogPostDetailWrapper />} />
        <Route path="/create" element={<BlogPostForm onSubmit={handleSubmitPost} />} />
      </Routes>
    </Layout>
  );
};

export default App;