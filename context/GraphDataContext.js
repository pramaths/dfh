'use client'
import React, { createContext, useContext, useState } from 'react';

const SelectionsContext = createContext();

export function useSelections() { // Changed to named export
  return useContext(SelectionsContext);
}

export function GraphDataProvider({ children }) { // Changed to named export
  const [selections, setSelections] = useState({
    interests: [],
    notinterests: [],
    growth: '',
    workenv: '',
    hobby: '',
    linkedIn:'',
    resume:'',
  });

  const updateSelections = (key, value) => {
    console.log(key,value)
    setSelections((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SelectionsContext.Provider value={{ selections, updateSelections }}>
      {children}
    </SelectionsContext.Provider>
  );
};