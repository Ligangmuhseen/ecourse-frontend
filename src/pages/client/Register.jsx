import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "../../assets/lib/toastr/toastr.css";
import API_BASE_URL from "../../utils/apiConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    gender: "",
    password: "",
    location: "",
    confirmPassword: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toastr.error("Passwords do not match");
      return;
    }

    try {
      // Hidden role set as "Client"
      const userData = {
        fullname: formData.fullname,
        email: formData.email,
        phone_no: formData.phone_no,
        gender: formData.gender,
        location: formData.location,
        password: formData.password,
        role: "Client", // Hidden field role
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        userData
      );
      toastr.success("Registration successful");

      setFormData({
        email: "",
        password: "",
        phone_no: "",
        fullname: "",
        gender: "",
        location: "",
        confirmPassword: "",
      });

      // Close the registration modal and open the login modal
      // Simulate a click on the login modal button
      document.getElementById("loginclosebtn").click(); // Click the hidden login button
      document.getElementById("loginModalBtn").click(); // Click the hidden login button

      // Optionally reset form or redirect user
    } catch (err) {
      console.error(err);
      toastr.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ border: "0", width: "100%", background: "transparent" }}
          >
            <div className="modal-header" style={{ borderStyle: "none" }}>
              <button
                id="loginclosebtn"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>
            <div className="modal-body p-0">
              <div
                className="container-fluid"
                style={{
                  width: "100%",
                  border: "0",
                  background: "transparent",
                }}
              >
                <div className="container py-5">
                  <div className="row align-items-center">
                    <div className="col-lg-12">
                      <div
                        className="card border-0"
                        style={{ boxShadow: "none" }}
                      >
                        <div className="card-header bg-light text-center p-4">
                          <h1 className="m-0">Sign Up Now</h1>
                        </div>
                        <div className="card-body rounded-bottom bg-primary p-5">
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                name="fullname"
                                className="form-control border-0 p-4"
                                placeholder="Full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                className="form-control border-0 p-4"
                                placeholder="Your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name="phone_no"
                                className="form-control border-0 p-4"
                                placeholder="Phone number"
                                value={formData.phone_no}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name="location"
                                className="form-control border-0 p-4"
                                placeholder="Address/location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <select
                                name="gender"
                                className="custom-select border-0 px-4"
                                style={{ height: "47px" }}
                                value={formData.gender}
                                onChange={handleChange}
                                required
                              >
                                <option defaultValue>Select a Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                name="password"
                                className="form-control border-0 p-4"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                name="confirmPassword"
                                className="form-control border-0 p-4"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div>
                              <button
                                className="btn btn-dark btn-block border-0 py-3"
                                type="submit"
                              >
                                Sign Up Now
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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

export default Register;
