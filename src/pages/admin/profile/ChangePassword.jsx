import axios from "axios";
import React, {  useState } from "react";

import toastr from "toastr";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import "../../../assets/lib/toastr/toastr.css";


const ChangePassword = () => {
    const {token} = useAuth()

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (newPassword !== confirmPassword) {
        toastr.error("New password and confirm password do not match.");
        return;
      }
  
      try {
        const response = await axios.post(`${API_BASE_URL}/api/users/change-password`, {
          currentPassword,
          newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        });
  
        toastr.success(response.data.message);
      } catch (error) {
        toastr.error(error.response?.data?.message || "Failed to change password.");
      }
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="current-password" className="form-label">
            Current Password
          </label>

          <input
            type="password"
            className="form-control"
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required 
            placeholder="Current Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="new-password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            value={newPassword} 
             onChange={(e) => setNewPassword(e.target.value)} 
             required 
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword} 
             onChange={(e) => setConfirmPassword(e.target.value)} 
             required 
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
