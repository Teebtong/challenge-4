import React from 'react';
import styles from './CommentList.module.css';
import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className={styles.noComments}>No comments yet. Be the first to comment!</p>;
  }

  // Sort comments by date (oldest first)
  const sortedComments = [...comments].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div className={styles.commentList}>
      <h3 className={styles.commentHeader}>Comments ({comments.length})</h3>
      {sortedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList; 