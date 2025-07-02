import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(MyContext);

  useEffect(() => {
    if (!user) {
      toast.warn("Please login first");
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login-register" replace />;
  }

  return children;
};

export default PrivateRoute;
