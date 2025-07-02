import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";

const PrivateRouteForStudent = ({ children }) => {
  const { user } = useContext(MyContext);

  useEffect(() => {
    if (user && user.role === "Recruiter") {
      toast.warn("Unauthorized access");
    }
  }, [user]);

  if (!user) {
    toast.warn("Please login first");
    return <Navigate to="/login-register" replace />;
  }

  if (user.role === "Recruiter") {
    return <Navigate to="/" />;
  }

  if (user.role === "Student") {
    return children;
  }

  return null;
};

export default PrivateRouteForStudent;
