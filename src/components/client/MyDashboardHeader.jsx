import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../../pages/client/Logout";

const MyDashboardHeader = () => {
  return (
    <>
      {/* <!-- Navbar Start --> */}
      <div className="container-fluid">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link
              to="/mydashboard"
              className="d-flex align-items-center justify-content-between bg-secondary w-100 text-decoration-none"
              style={{ height: "67px", padding: "0 30px" }}
            >
              <h5 className="text-primary m-0">
                <i className="fa fa-home mr-2"></i>My Dashboard
              </h5>
            </Link>
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
                    exact
                    to="/mydashboard"
                    className="nav-item nav-link"
                    activeClassName="active"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/mydashboard/myenrollment"
                    className="nav-item nav-link"
                    activeClassName="active"
                  >
                    My Enrollment
                  </NavLink>

                  <NavLink
                    to="/"
                    className="nav-item nav-link"
                    activeClassName="active"
                  >
                    Main Page
                  </NavLink>
                </div>

                <a
                  className="btn btn-dark py-2 px-4 ml-auto  d-lg-block me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#clientlogoutModal"
                >
                  Logout
                </a>
              </div>
            </nav>
          </div>
          <Logout />
        </div>
      </div>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default MyDashboardHeader;
