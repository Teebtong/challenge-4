import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!text.trim()) {
      newErrors.text = 'Comment text is required';
    } else if (text.trim().length < 10) {
      newErrors.text = 'Comment must be at least 10 characters';
    }

    if (avatarUrl && !isValidUrl(avatarUrl)) {
      newErrors.avatarUrl = 'Please enter a valid URL';
    }

    return newErrors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const comment = {
      id: crypto.randomUUID(),
      postId,
      name: name.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
      ...(avatarUrl && { avatarUrl: avatarUrl.trim() })
    };

    onSubmit(comment);
    
    // Reset form
    setName('');
    setText('');
    setAvatarUrl('');
    setErrors({});
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="text">Comment</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
        />
        {errors.text && <p className={styles.error}>{errors.text}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="avatarUrl">Avatar URL (optional)</label>
        <input
          id="avatarUrl"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />
        {errors.avatarUrl && <p className={styles.error}>{errors.avatarUrl}</p>}
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit">Post Comment</button>
      </div>
    </form>
  );
};

export default CommentForm; 