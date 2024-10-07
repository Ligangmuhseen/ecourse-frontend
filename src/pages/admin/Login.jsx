import React, { useState } from "react";
import "../../assets/css/aut.css";
import toastr from "toastr";
import "../../assets/lib/toastr/toastr.css";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        `${API_BASE_URL}/api/users/admin/login`,
        formData
      );

      if (response.status === 200) {
        const { role, token } = response.data; // Extract token and role from response

        // Check if the user role is Admin
        if (role === "Admin") {
          // Store token in context
          setToken(token);
          setRole(role);
          
          toastr.success(response.data.message);
          // Optionally reset the form fields
          setFormData({
            email: "",
            password: "",
          });

          // Redirect to admin page after a short delay
          setTimeout(() => {
           
            navigate("/admin");
            
          }, 2500);
         
        
        } else {
          toastr.error("Access denied: You do not have admin privileges.");
        }
      } else {
        toastr.error(response.data.message);
      }
    } catch (error) {
      toastr.error(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <>
      <div className="aut-body">
        <div className="aut-container">
          <div className="screen card shadow">
            <div className="screen__content">
              <form className="aut-login" onSubmit={handleSubmit}>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    className="login__input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div className="social-login">
                <h3>log in via</h3>
                <div className="social-icons">
                  <a href="#" className="social-login__icon fab fa-instagram"></a>
                  <a href="#" className="social-login__icon fab fa-facebook"></a>
                  <a href="#" className="social-login__icon fab fa-twitter"></a>
                </div>
              </div>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
