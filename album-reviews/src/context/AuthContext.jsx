import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Usually I would make sure to have this set up
  // properly with an auth provider, but for the sake
  // of a personal project that does not matter if someone
  // gets in, this is fine.
  const toggleLogin = (password) => {
    // If you are already logged in, log out.
    // If you are not logged in, check the password.
    if (isLoggedIn) {
      setIsLoggedIn((prevState) => !prevState);
    } else {
      if (password !== "supersafe") {
        return;
      } else {
        setIsLoggedIn((prevState) => !prevState);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
