import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const PrivateRouteAdmin = ({ ...rest }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  // Check if the user is authenticated as an admin
  if (role !== "Admin") {
    return <Navigate to="/" />;
  }

  return <Outlet {...rest} />;
};

export default PrivateRouteAdmin;
