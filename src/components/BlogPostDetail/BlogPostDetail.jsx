import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';

const BlogPostDetail = ({ posts, deletePost }) => {
  const params = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === params.id);

  if (!post) {
    return <p>Blog post not found.</p>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.blogPostDetail}>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.createPostButton} 
            onClick={() => navigate('/create', { state: { post } })}
          >
            Edit Post
          </button>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.author}>By {post.author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className={styles.deleteButtonContainer}>
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
};

export default BlogPostDetail;                        