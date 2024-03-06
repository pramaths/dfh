import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({});

  const updateGlobalData = (newData) => {
    setGlobalData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <GlobalContext.Provider value={{ globalData, updateGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
