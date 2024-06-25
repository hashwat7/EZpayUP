import React, { createContext, useState } from "react";

const ChangeContext = createContext();

const ChangeProvider = ({ children }) => {
  const [state, setState] = useState(false);
  return (
    <ChangeContext.Provider value={{ state, setState }}>
      {children}
    </ChangeContext.Provider>
  );
};

export { ChangeContext, ChangeProvider };
