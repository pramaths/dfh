// context/GraphDataContext.js
'use client'
import React, { createContext, useContext, useState } from 'react';

const GraphDataContext = createContext();

export const useGraphData = () => useContext(GraphDataContext);

export const GraphDataProvider = ({ children }) => {
  const [collectedData, setCollectedData] = useState({});

  const updateData = (newData) => {
    setCollectedData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <GraphDataContext.Provider value={{ collectedData, updateData }}>
      {children}
    </GraphDataContext.Provider>
  );
};
