// BlogPostList.jsx
import React from "react";
import { Link } from "react-router-dom";
import BlogPostItem from "../BlogPostItem/BlogPostItem";
import styles from "./BlogPostList.module.css";

const BlogPostList = ({ posts, navigate }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.noPosts}>No blog posts available.</p>;
  }

  return (
    <div>
      <div className={styles.postList}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <Link to={post.url}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.summary}</p>
            <p>By {post.author} on {post.date}</p>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.createPostButton} onClick={() => navigate('/create')}>Post New</button>
      </div>
    </div>
  );
};

export default BlogPostList;
