import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo}>BlogApp</Link>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
        <Link to="/create">
            <div className={styles.buttonContainer}>
                <button className={styles.createPostButton} onClick={() => navigate('/create')}>Post New</button>
            </div>
        </Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <Link to="/" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
        <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        <Link to="/creeat" onClick={toggleMobileMenu}>Post New</Link>
      </div>
    </nav>
  );
};

export default NavBar;