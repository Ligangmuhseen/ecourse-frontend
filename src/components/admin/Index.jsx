import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const Index = () => {

  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="col-lg p-3 min-vh-100 lg-content-w">
            <div className="row">
              <div className="col-xl-11 content-margin-left">
              <Outlet />

              </div>
            </div>
        
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
