import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ onSubmit }) => {
  const location = useLocation();
  const postData = location.state?.post;

  const [title, setTitle] = useState(postData?.title || '');
  const [content, setContent] = useState(postData?.content || '');
  const [author, setAuthor] = useState(postData?.author || '');
  const [date, setDate] = useState(postData?.date || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit({ 
        ...postData,
        title, 
        content, 
        author, 
        date 
      });
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <p className={styles.error}>{errors.author}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit">{postData ? 'Update Post' : 'Create Post'}</button>
      </div>
    </form>
  );
};

export default BlogPostForm;