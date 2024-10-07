import React, { useEffect, useState } from "react";
import "../../../assets/scss/viewcard.scss";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { token } = useAuth(); // Access the token from the context

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData === null && token) {
        // Check if userData is null and token is available
        try {
          // Make an API request to fetch user data based on the logged-in user's role and identifier
          const response = await axios.get(
            `${API_BASE_URL}/api/users/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
              },
            }
          );
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
      <NavBarBox title="View User" />

      <div className="container-fluid">
        <div className="row">
          <div className="shadow col-lg-4 d-flex justify-content-center align-items-center ml-lg-3">
            <img
              src={`${API_BASE_URL}${userData.profile_photo}`} // Replace with actual path or user image URL
              alt="User Profile"
              className="img-fluid rounded-circle"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-lg-6">
            <div className="mt-1">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Full Name:</h6>
                  <span>{userData.fullname}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Email:</h6>
                  <span>{userData.email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Phone No:</h6>
                  <span>{userData.phone_no}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Gender:</h6>
                  <span>{userData.gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Location:</h6>
                  <span>{userData.location}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Role:</h6>
                  <span>{userData.role}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
