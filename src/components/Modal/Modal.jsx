import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal');

export const ModalComponent = ({ children, onClose }) => {
  const onClickOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={onClickOverlay}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.buttonClose}
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
