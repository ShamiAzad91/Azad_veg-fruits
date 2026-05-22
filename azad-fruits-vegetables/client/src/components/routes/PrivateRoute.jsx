import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const PrivateRoute = () => {
  const [auth,setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // if no token → no need to call backend
    if (!auth?.token) {
      setOk(false);
      return;
    }

    authCheck();
  }, [auth?.token]);

  const authCheck = async () => {
    try {
      const { data } = await axios.get("/auth/auth-check");

      if (data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log(error);
      setOk(false); // ✅ VERY IMPORTANT (avoid infinite loading)
    }
  };

  return ok ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
