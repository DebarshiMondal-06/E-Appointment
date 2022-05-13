import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData } from './API';
import { exception_handler } from './Exception';


const createGlobalContext = createContext();

const GlobalContext = ({ children }) => {
  const { pathname } = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [loader, setLoader] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const [deleteLoader, setDeleteLoader] = useState(false);

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

  const get_hospital_assign = async (hospitalId) => {
    try {
      return await getData(`/hospital/assign?hospitalId=${hospitalId}`, 'GET');
    } catch (error) {
      toast.error('Went Wrong!');
    }
  };

  const deleteItem = async (id, reloadData) => {
    setDeleteLoader(true);
    try {
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) {
        setDeleteLoader(false);
        toast.info('Deleted!');
        setViewModal(false);
        setTimeout(() => {
          reloadData();
        }, 800);
      }
    } catch (err) {
      setDeleteLoader(false);
      toast.error(exception_handler(err));
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);




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
    get_hospital_assign,
    deleteItem,
    deleteLoader
  }}>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };