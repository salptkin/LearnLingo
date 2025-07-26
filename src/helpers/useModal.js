import { useEffect, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState({
    name: '',
    open: false,
  });

  const openModal = name => {
    setIsOpen({ name, open: true });
  };

  const closeModal = () => {
    setIsOpen({ name: '', open: false });
  };

  useEffect(() => {
    if (isOpen.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};