import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { getData } from './API';

const createGlobalContext = createContext();

const GlobalContext = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [loader, setLoader] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});

  const handleOpen = () => {
    setOpenSidebar(true);
  };

  const handleClose = (time) => {
    setCloseSidebar(true)
    setTimeout(() => {
      setOpenSidebar(false);
      setCloseSidebar(false);
    }, time);
  };

  const get_doctor_assign = async (doctorId) => {
    try {
      return await getData(`/hospital/assign?doctorId=${doctorId}`, 'GET');
    } catch (error) {
      toast.error('Went Wrong!');
    }
  };



  return <createGlobalContext.Provider value={{
    openSidebar,
    closeSidebar,
    handleClose,
    handleOpen,
    loader,
    setLoader,
    viewModal,
    setViewModal,
    setViewData,
    viewData,
    get_doctor_assign
  }}>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };