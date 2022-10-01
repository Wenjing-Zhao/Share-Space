import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, isError }}>
      {children}
    </UserContext.Provider>
  );
};
