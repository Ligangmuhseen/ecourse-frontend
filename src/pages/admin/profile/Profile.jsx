import React, { useEffect, useState } from "react";
import "../../../assets/css/profilecard.css";
import NavBarBox from "../../../components/admin/NavBarBox";
import ProfileInfo from "./ProfileInfo";
import ProfileUpdate from "./ProfileUpdate";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import { Link } from "react-router-dom";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css"
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth(); // Access the token from the context


  useEffect(() => {
    const fetchUserData = async () => {
      if (userData === null && token) { // Check if userData is null and token is available
        try {
          // Make an API request to fetch user data based on the logged-in user's role and identifier
          const response = await axios.get(`${API_BASE_URL}/api/users/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          });
          setUserData(response.data); // Assuming response.data contains user data
      
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, [userData, token]); // Run the effect whenever userData or token changes

  // Check if userData is null before rendering
  if (userData === null) {
    return null; // or a loading indicator if desired
  }
  return (
    <>
      <NavBarBox title="Profile" />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for user profile */}
          <div className="col-xl-3">
            <div className="portlet light shadow profile-sidebar-portlet bordered">
              <div className="profile-userpic text-center">
                <img
                  src={`${API_BASE_URL}${userData.profile_photo}`}
                  className="img-fluid rounded-circle"
                  alt="User Avatar"
                  style={{ maxWidth: "140px" }}
                />
              </div>
              <div className="profile-usertitle mt-3 text-center">
                <div className="profile-usertitle-name">{userData.fullname}</div>
                <div className="profile-usertitle-job">{userData.role}</div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="col-xl-9">
            <div className="portlet light shadow bordered">
              <div className="portlet-title tabbable-line">
                <div className="caption caption-md">
                  <span className="caption-subject font-blue-madison bold uppercase">
                    My Information
                  </span>
                </div>
              </div>
              <div className="portlet-body">
                {/* Navigation tabs */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Update
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="messages-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#messages"
                      type="button"
                      role="tab"
                      aria-controls="messages"
                      aria-selected="false"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>

                {/* Tab panes */}
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <ProfileUpdate />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <ProfileInfo />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="messages"
                    role="tabpanel"
                    aria-labelledby="messages-tab"
                  >
                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
