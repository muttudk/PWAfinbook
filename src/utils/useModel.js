import { use, useState,useEffect } from 'react';
const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalMode, setModalMode] = useState(null);
  const [vtype, setVtype] = useState("");


  
  const openModal = (data,mode,vtype) => {
    setModalData(data);
    setModalMode(mode);
    setIsVisible(true);
    vtype&&setVtype(vtype);
  };

  const closeModal = () => {
    setModalData(null);
    //setModalMode(null);
    setIsVisible(false);
    setVtype(null); 
  };

  return {
    isVisible,
    modalData,
    modalMode,
    openModal,
    vtype,
    closeModal
  };
};

export default useModal;
