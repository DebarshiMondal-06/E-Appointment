import React, { createContext, useState } from 'react';

const createGlobalContext = createContext();

const GlobalContext = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);

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
    handleOpen
  }}>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };