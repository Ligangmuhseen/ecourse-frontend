import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarBox = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        <div className="callout callout-info d-flex justify-content-between align-items-center">
          <h4>{title}</h4>

          <button
            className="btn btn-md btn-outline-dark"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fas fa-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBarBox;
