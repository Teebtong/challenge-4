import React, { useState } from 'react';
import styles from './DeleteButton.module.css';
import ConfirmationDialogue from '../ConfirmationDialogue/ConfirmationDialogue';

const DeleteButton = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleConfirm = () => {
    onClick();
    setIsOpen(false);
  };
  
  return (
    <>
      <button className={styles.deleteButton} onClick={handleOpen}>
        Delete
      </button>
      <ConfirmationDialogue
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteButton;
