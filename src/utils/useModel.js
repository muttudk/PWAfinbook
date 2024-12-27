import { useState } from 'react';
const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalMode, setModalMode] = useState(null);

  

  const openModal = (data, mode) => {
    setModalData(data);
    setModalMode(mode);
    setIsVisible(true);
  };

  const closeModal = () => {
    setModalData(null);
    setModalMode(null);
    setIsVisible(false);
  };

  return {
    isVisible,
    modalData,
    modalMode,
    openModal,
    closeModal
  };
};

export default useModal;
