/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [store, setStore] = useState({
    mode: "light",
  });

  const [actions, setActions] = useState({
    changeTheme: (mode) => setStore({ ...store, mode: mode }),
  });

  const context = useMemo(() => ({ store, setStore, actions, setActions }), [store, setStore, actions, setActions]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
