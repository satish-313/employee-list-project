import React, { createContext, useContext, useEffect, useState } from "react";

const AppCxt = createContext();

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const isAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch("http://localhost:4500/user/me", {
        method: "GET",
        headers: {
          token: token,
        },
      });
      const data = await res.json();
      if(data.auth){
        console.log('he is ok');
        setAuth(true)
      }
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AppCxt.Provider
      value={{
        auth,
        setAuth,
        isAuth,
      }}
    >
      {children}
    </AppCxt.Provider>
  );
};

const useGctx = () => {
  return useContext(AppCxt);
};

export { AppProvider, AppCxt, useGctx };
