import React, { createContext, useState } from 'react';

const createGlobalContext = createContext();

const GlobalContext = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);


  return <createGlobalContext.Provider value={{
    openSidebar,
    setOpenSidebar
  }}>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };