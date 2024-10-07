import React, { useState, useEffect } from "react";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext"; // Import your auth context
import API_BASE_URL from "../../../utils/apiConfig"; // Import your API base URL
import axios from "axios";
import { useParams } from "react-router-dom";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const { token } = useAuth(); // Access the token from the context
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    isActive: false, // Add isActive to the state

    phone_no: "",
    gender: "",
    role: "",
    location: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch the existing user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setFormData(response.data); // Assuming response.data contains user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, isActive: checked }));
    } else {
      setFormData({
        ...prev,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const errors = {};
    if (!formData.fullname) errors.fullname = "Fullname is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone_no) errors.phone_no = "Telephone number is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.gender) errors.gender = "Please select a gender";
    if (!formData.role) errors.role = "Please select a role";

    setFormErrors(errors);

    // If no errors, submit the form (make API call)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/users/users/${id}`, // Use PUT method to update the user
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );

        toastr.success(response.data.message);
        // You can redirect or display a success message here
      } catch (error) {
        console.error("Error updating user:", error);
        toastr.error(
          error.response?.data?.message ||
            "Failed to create user. Please try again."
        );
      }
    }
  };

  return (
    <>
      <NavBarBox title="Edit User" />
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <p className="card-title fw-light m-2">Edit User</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>

                  {/* Fullname */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="fullname"
                      className={`form-control ${
                        formErrors.fullname ? "is-invalid" : ""
                      }`}
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Enter fullname"
                    />
                    {formErrors.fullname && (
                      <div className="invalid-feedback">
                        {formErrors.fullname}
                      </div>
                    )}
                  </div>

                  {/* Telephone */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telephone No
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        formErrors.phone_no ? "is-invalid" : ""
                      }`}
                      id="phone_no"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      placeholder="Enter telephone number"
                    />
                    {formErrors.phone_no && (
                      <div className="invalid-feedback">
                        {formErrors.phone_no}
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter a User Location"
                    />
                    {formErrors.location && (
                      <div className="invalid-feedback">
                        {formErrors.location}
                      </div>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className={`form-select ${
                        formErrors.gender ? "is-invalid" : ""
                      }`}
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {formErrors.gender && (
                      <div className="invalid-feedback">
                        {formErrors.gender}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className={`form-select ${
                        formErrors.role ? "is-invalid" : ""
                      }`}
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Client">Client</option>
                    </select>
                    {formErrors.gender && (
                      <div className="invalid-feedback">{formErrors.role}</div>
                    )}
                  </div>

                  <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
              </div>


                  {/* Submit Button */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
