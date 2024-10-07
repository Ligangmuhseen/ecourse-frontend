import React, { useEffect, useState } from "react";
import UpButton from "./UpButton";
import { Link } from "react-router-dom";

const MyDashboardFooter = () => {
  const [isFixedBottom, setIsFixedBottom] = useState(false);

  const checkFooterPosition = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (contentHeight <= viewportHeight) {
      setIsFixedBottom(true);  // Add fixed-bottom if content is smaller than the viewport
    } else {
      setIsFixedBottom(false); // Remove fixed-bottom if content is taller
    }
  };

  useEffect(() => {
    // Use setTimeout to ensure that the check runs after the content is fully loaded
    const timer = setTimeout(() => {
      checkFooterPosition();
    }, 100); // A small delay (100ms) to ensure the DOM is fully updated

    // Also listen for window resize events
    window.addEventListener("resize", checkFooterPosition);

    // Cleanup the event listener on unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkFooterPosition);
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <>
      {/* Footer Start */}
      <div
        className={`container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5 ${
          isFixedBottom ? "fixed-bottom" : ""
        }`}
        style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
      >
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white"> {new Date().getFullYear()} {" "}
              &copy; <a>my Dashboard</a>. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
            <ul className="nav d-inline-flex">
              <li className="nav-item">
                <Link to="/mydashboard/myenrollment" className="nav-link text-white py-0">
                  Enrollment
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mydashboard/editprofile" className="nav-link text-white py-0">
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-white py-0">
                  Main Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer End */}

      <UpButton/>

     
    </>
  );
};

export default MyDashboardFooter;
