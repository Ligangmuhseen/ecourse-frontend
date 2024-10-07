import React from "react";
import { Outlet } from "react-router-dom";
import MyDashboardHeader from "../../../components/client/MyDashboardHeader";
import MyDashboardFooter from "../../../components/client/MyDashboardFooter";

const Mydashboard = () => {
  return (
    <>
    <MyDashboardHeader/>
      <Outlet />
      <MyDashboardFooter/>
    </>
  );
};

export default Mydashboard;
