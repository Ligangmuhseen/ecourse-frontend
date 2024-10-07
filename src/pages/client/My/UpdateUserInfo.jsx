import React, { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import API_BASE_URL from "../../../utils/apiConfig";
import "../../../assets/lib/toastr/toastr.css";
import { useAuth } from "../../../context/AuthContext";

const UpdateUserInfo = () => {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    gender: "",
    location: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    // Fetch user info when component mounts
    axios
      .get(`${API_BASE_URL}/api/users/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Make sure this endpoint returns user info
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        toastr.error("Failed to load user info");
      });
  }, []);

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", userInfo.fullname);
    formData.append("email", userInfo.email);
    formData.append("phone_no", userInfo.phone_no);
    formData.append("location", userInfo.location);
    formData.append("gender", userInfo.gender);
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    axios
      .put(`${API_BASE_URL}/api/users/profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toastr.success(response.data.message);
      })
      .catch((error) => {
        toastr.error("Failed to update user info");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            value={userInfo.fullname}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_no"
            name="phone_no"
            value={userInfo.phone_no}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={userInfo.location}
            onChange={handleInputChange}
            placeholder="Enter your Location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="profile_photo">Profile Photo (optional)</label>
          <input
            type="file"
            name="profile_photo"
            className="form-control"
            id="profile_photo"
            onChange={handleProfilePhotoChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Info
        </button>
      </form>
    </>
  );
};

export default UpdateUserInfo;
