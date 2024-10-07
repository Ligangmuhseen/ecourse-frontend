import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";
import NavBarBox from "../../../components/admin/NavBarBox";
import API_BASE_URL from "../../../utils/apiConfig"; // Make sure to configure this
import { useAuth } from "../../../context/AuthContext"; // If token is required


const CreateUser = () => {
  const { token } = useAuth(); // If token is required for authenticated APIs
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone_no: "",
    gender: "",
    role: "",
    location:"",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const errors = {};
    if (!formData.fullname) errors.fullname = "Fullname is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.phone_no) errors.phone_no = "Telephone number is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.gender) errors.gender = "Please select a gender";
    if (!formData.role) errors.role = "Please select a role";

    setFormErrors(errors);

    // If no errors, submit the form (e.g., make API call)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/users/users/`, // Adjust the endpoint as needed
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // If token is required
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toastr.success("User created successfully!");

          // Optionally reset the form after success
          setFormData({
            fullname: "",
            email: "",
            password: "",
            phone_no: "",
            gender: "",
            location:"",
            role: "",
          });
        }
      } catch (error) {
        toastr.error(
          error.response?.data?.message || "Failed to create user. Please try again."
        );
      }
    }
  };
  return (
    <>
      <NavBarBox title="Create User" />
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark  text-white">
                <p className="card-title fw-light m-2">Create New User</p>
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
                      <div className="invalid-feedback">
                        {formErrors.email}
                      </div>
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

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
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
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Client">Client</option>
                    </select>
                    {formErrors.gender && (
                      <div className="invalid-feedback">
                        {formErrors.role}
                      </div>
                    )}
                  </div>


                  {/* Submit Button */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
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

export default CreateUser;
