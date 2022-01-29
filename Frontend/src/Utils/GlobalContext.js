import React, { createContext } from 'react';

const createGlobalContext = createContext();

const GlobalContext = ({ children }) => {
  return <createGlobalContext.Provider>
    {children}
  </createGlobalContext.Provider>
}

export { GlobalContext, createGlobalContext };