import React, { useState } from "react";

import ChangePassword from "./ChangePassword";
import UpdateUserInfo from "./UpdateUserInfo";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("update-info");

  return (
    <div className="container-fluid mt-4" style={{ marginBottom: "200px" }}>
      <div className="row ml-1 mr-1">
        {/* Vertical Tabs */}
        <div className="col-xl-3 col-md-3">
          <div
            className="nav flex-column nav-pills card p-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <a
              className={`nav-link ${
                activeTab === "update-info" ? "active" : ""
              }`}
              onClick={() => setActiveTab("update-info")}
              href="#"
            >
              Update User Info
            </a>
            <a
              className={`nav-link ${
                activeTab === "change-password" ? "active" : ""
              }`}
              onClick={() => setActiveTab("change-password")}
              href="#"
            >
              Change Password
            </a>
          </div>
        </div>

        {/* Tab Content */}
        <div className="col-xl-9 col-md-9">
          <div className="card" style={{ backgroundColor: "#fff9f0" }}>
            {" "}
            {/* Milky Background for Content */}
            <div className="card-body">
              {/* Update User Info Form */}
              {activeTab === "update-info" && (
                <div className="tab-pane fade show active">
                  <h3 className="card-title">Update User Information</h3>
                  <UpdateUserInfo />
                </div>
              )}

              {/* Change Password Form */}
              {activeTab === "change-password" && (
                <>
                  <div className="tab-pane fade show active">
                    <h3 className="card-title">Change Password</h3>
                    <ChangePassword />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
