import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialogue.module.css';

const ConfirmationDialogue = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the first focusable element (cancel button)
      cancelButtonRef.current?.focus();
      
      // Handle Escape key to close the modal
      const handleEsc = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleEsc);
      
      // Handle tab trapping
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          // Get all focusable elements
          const focusableElements = dialogRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (!focusableElements || focusableElements.length === 0) return;
          
          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];
          
          // If shift+tab and focus is on first element, move to last element
          if (e.shiftKey && document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          } 
          // If tab and focus is on last element, move to first element
          else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      };
      
      dialogRef.current?.addEventListener('keydown', handleTab);
      
      return () => {
        window.removeEventListener("keydown", handleEsc);
        dialogRef.current?.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles['confirmation-dialog-overlay']} 
      onClick={onClose}
      style={{ position: 'fixed', zIndex: 1000 }}
    >
      <div
        className={styles['confirmation-dialog']}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title">Confirm Deletion</h2>
        <p id="dialog-description">
          Are you sure you want to delete this post?
        </p>
        <div className={styles['dialog-buttons']}>
          <button 
            className={`${styles['dialog-btn']} ${styles['cancel-btn']}`} 
            onClick={onClose}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button 
            className={`${styles['dialog-btn']} ${styles['confirm-delete-btn']}`} 
            onClick={onConfirm}
            ref={confirmButtonRef}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialogue; 