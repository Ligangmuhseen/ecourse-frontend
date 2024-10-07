import React from "react";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import Logout from "../../pages/admin/Logout";

const Sidebar = () => {


  return (
    <>
    <div className="col-sm-auto bg-dark sticky-top sidebar-height-lg">
        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
          <Link to=""
          
            className="d-block p-3 link-dark text-decoration-none"
           
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            {/* Responsive logo */}
            <img
              src={Logo}
              alt="logo"
              className="img-fluid"
              style={{ maxWidth: "50px" }}
            />
          </Link>

          <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
            <li>
              <Link
                to=""
                className="nav-link py-3 px-2 link-light"
                title="Dashboard"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
              >
                <i className="bi-speedometer2 fs-1"></i>
              </Link>
            </li>

            {/* Dropdown for Users */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link py-3 px-2 link-light dropdown-toggle"
                id="usersDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Users"
                data-bs-placement="right"
              >
                <i className="bi-people fs-1"></i>
              </a>
              <ul
                className="dropdown-menu shadow"
                aria-labelledby="usersDropdown"
              >
                <li>
                  <Link to="allusers" className="dropdown-item">
                    All Users
                  </Link>
                </li>
                <li>
                  <Link to="enrolledusers" className="dropdown-item">
                    Enrolled Users
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link py-3 px-2 link-light dropdown-toggle"
                id="coursesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Courses"
                data-bs-placement="right"
              >
                <i className="bi-table fs-1"></i>
              </a>
              <ul
                className="dropdown-menu shadow"
                aria-labelledby="usersDropdown"
              >
                <li>
                  <Link to="allcourses" className="dropdown-item">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="allchapters" className="dropdown-item">
                    Chapters
                  </Link>
                </li>
                <li>
                  <Link to="allvideos" className="dropdown-item">
                    Videos
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle"
              id="dropdownUser3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-person-circle fs-1"></i>
            </a>
            <ul
              className="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser3"
            >
              <li>
                <a
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#adminlogoutModal"
                >
                  Logout
                </a>
              </li>
              <li>
                <Link to="/admin/profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

       
         
        </div>
      </div>
      <Logout/>
      
    </>
  );
};

export default Sidebar;
