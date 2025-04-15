import React from 'react';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  const { name, date, text, avatarUrl } = comment;
  
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={`${name}'s avatar`} 
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles.commentMeta}>
          <span className={styles.commentName}>{name}</span>
          <span className={styles.commentDate}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
      <p className={styles.commentText}>{text}</p>
    </div>
  );
};

export default Comment; 