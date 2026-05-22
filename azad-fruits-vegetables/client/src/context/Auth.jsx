import {
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // axios baseURL
  axios.defaults.baseURL = import.meta.env.VITE_API;

  // restore auth
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parsedData = JSON.parse(data);

      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  // set axios token
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.token}`;
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };