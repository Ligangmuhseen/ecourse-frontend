import React from "react";
import { NavLink, Link } from "react-router-dom";
import Register from "../../pages/client/Register";
import Login from "../../pages/client/Login";
import { useAuth } from "../../context/AuthContext";
import Logout from "../../pages/client/Logout";

const Header = () => {
  const { token } = useAuth();

  return (
    <>
      {/* <!-- Topbar Start --> */}
      <div className="container-fluid d-none d-lg-block">
        <div className="row align-items-center py-4 px-xl-5">
          <div className="col-lg-3">
            <a href="" className="text-decoration-none">
              <h1 className="m-0">
                <span className="text-primary">E</span>COURSES
              </h1>
            </a>
          </div>
          <div className="col-lg-3 text-right">
            <div className="d-inline-flex align-items-center">
              <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
              <div className="text-left">
                <h6 className="font-weight-semi-bold mb-1">Our Office</h6>
                <small>Banana Street,Tanzania</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 text-right">
            <div className="d-inline-flex align-items-center">
              <i className="fa fa-2x fa-envelope text-primary mr-3"></i>
              <div className="text-left">
                <h6 className="font-weight-semi-bold mb-1">Email Us</h6>
                <small>triplerainbow07@gmail.com</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 text-right">
            <div className="d-inline-flex align-items-center">
              <i className="fa fa-2x fa-phone text-primary mr-3"></i>
              <div className="text-left">
                <h6 className="font-weight-semi-bold mb-1">Call Us</h6>
                <small>+255 620 147 410</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <div className="container-fluid">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            {token && (
              <Link
                to="/mydashboard"
                className="d-flex align-items-center justify-content-between bg-secondary w-100 text-decoration-none"
                data-toggle="collapse"
                style={{ height: "67px", padding: "0 30px" }}
              >
                <h5 className="text-primary m-0">
                  <i className="fa fa-home mr-2"></i>My Dashboard
                </h5>
              </Link>
            )}
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0">
                  <span className="text-primary">E</span>COURSES
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav py-0">
                  <NavLink
                   
                    to="/"
                    className="nav-item nav-link"
                    activeclassname="active"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/courses"
                    className="nav-item nav-link"
                    activeclassname="active"
                  >
                    Courses
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className="nav-item nav-link"
                    activeclassname="active"
                  >
                    Contact
                  </NavLink>
                </div>

                {token ? (
                  <a
                    className="btn btn-dark py-2 px-4 ml-auto  d-lg-block me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#clientlogoutModal"
                  >
                    Logout
                  </a>
                ) : (
                  <>
                    <a
                      className="btn btn-dark py-2 px-4 ml-auto  d-lg-block me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal"
                    >
                      Register
                    </a>

                    <a
                      id="loginModalBtn"
                      className="btn btn-outline-primary py-2 px-4  d-lg-block"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
              <Register />
              <Logout />
              <Login />
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default Header;

