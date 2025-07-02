import { createContext, useEffect, useState } from "react";


export const MyContext = createContext();

const ContextProvider = ({ children }) => {

// user
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            return JSON.parse(storedUser);
          } catch (e) {
            console.error("Invalid JSON in localStorage for 'user'", e);
            return null;
          }
        }
        return null;
      });
    
      useEffect(() => {
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.error("Error saving user to localStorage", e);
        }
      }, [user]);


  const data = {
    user,
    setUser,
  };

  return (
    <MyContext.Provider value={data}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
