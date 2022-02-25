import React, { createContext, useState } from 'react';

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
  }


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
    viewData
  }}>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };