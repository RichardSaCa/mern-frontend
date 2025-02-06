import { createContext,useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

 
  useEffect(() => {
    if (token) {
      console.log("save token")
      localStorage.setItem("token", token);
    } 
  }, [token]);

  const login = (newToken) => {
    setToken(newToken)
    };
  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

 export const useAuth = () =>{return useContext(AuthContext)};
