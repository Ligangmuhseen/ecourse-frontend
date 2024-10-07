import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../utils/apiConfig";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";



const ProfileInfo = () => {
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
      <div className="mt-4">
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
            <h6>Role:</h6>
            <span>{userData.role}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <h6>Address:</h6>
            <span>{userData.location}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileInfo;
