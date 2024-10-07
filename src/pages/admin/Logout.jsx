import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout function from the context
      await logout();
      // Navigate to the home page
     
      // Hide the modal using Bootstrap API
      setTimeout(() => {
        window.location.reload();
      },1);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
    

      {/* Modal */}
      <div
        className="modal fade"
        id="adminlogoutModal"
        tabIndex="-1"
        aria-labelledby="adminlogoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adminlogoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to logout
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
            
              >
           Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
