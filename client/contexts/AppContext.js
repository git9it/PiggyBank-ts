import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [contextState, setContextState] = useState();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('currentAccount')
    ) {
      updateContextState({
        currentAccount: sessionStorage.getItem('currentAccount'),
      });
    }
  }, []);

  const updateContextState = (newContext) => {
    setContextState((prevContext) => ({ ...prevContext, ...newContext }));
  };

  return (
    <AppContext.Provider
      value={{
        contextState,
        updateContextState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
