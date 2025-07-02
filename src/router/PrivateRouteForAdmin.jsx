import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";

const PrivateRouteForAdmin = ({ children }) => {
  const { user } = useContext(MyContext);

  useEffect(() => {
    if (user && user.role === "Student") {
      toast.warn("Unauthorized access");
    }
  }, [user]);

  if (!user) {
    toast.warn("Please login first");
    return <Navigate to="/login-register" replace />;
  }

  if (user.role === "Student") {
    return <Navigate to="/" />;
  }

  if (user.role === "Recruiter") {
    return children;
  }

  return null;
};

export default PrivateRouteForAdmin;
