import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const AdminRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!auth?.token) {
      setOk(false);
      return;
    }

    adminCheck();
  }, [auth?.token]);

  const adminCheck = async () => {
    try {
      const { data } = await axios.get(
        "/auth/admin-check",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setOk(data?.ok);
    } catch (error) {
      console.log(error);
      setOk(false);
    }
  };

  return ok ? <Outlet /> : <Loading path="/" />;
};

export default AdminRoute;