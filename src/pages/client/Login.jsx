import React, { useState } from "react";
import toastr from "toastr";
import "../../assets/lib/toastr/toastr.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setToken, setRole } = useAuth(); // Access setToken function from the context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        formData
      );

      if (response.status === 200) {
        const { role, token } = response.data; // Extract token from response

        // Store token in context
        setToken(token);
        setRole(role);

        // store userID in context
        // setUserid(userid);

        toastr.success(response.data.message);
        // Optionally reset the form fields
        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
        navigate("/");
      } else {
        toastr.error(response.data.message);
      }
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  return (
    <>
  {/* Modal */}
  <div
    className="modal fade"
    id="loginModal"
    tabIndex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div
        className="modal-content"
        style={{ border: "0", width: "100%", background: "transparent" }} // Apply border and width styles here
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
        
          {/* <!-- Registration Start --> */}
          <div
            className="container-fluid"
            style={{
              width: "100%",
              border: "0",
              background: "transparent",
            }} // Ensure width and border styling
          >
            <div className="container py-5">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div
                    className="card border-0"
                    style={{ boxShadow: "none" }} // Disable card shadow
                  >
                    <div className="card-header bg-light text-center p-4">
                      <h1 className="m-0">Sign In Now</h1>
                    </div>
                    <div className="card-body rounded-bottom bg-primary p-5">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="form-control border-0 p-4"
                            placeholder="Your email"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            className="form-control border-0 p-4"
                            placeholder="Your Password"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <button
                            className="btn btn-dark btn-block border-0 py-3"
                            type="submit"
                          >
                            Sign In Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Registration End --> */}
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default Login;
