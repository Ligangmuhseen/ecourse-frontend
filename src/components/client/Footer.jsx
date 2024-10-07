import React from "react";
import UpButton from "./UpButton";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5"
        style={{marginTop: "90px"}}
      >
        <div className="row pt-5">
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5
                  className="text-primary text-uppercase mb-4"
                  style={{letterSpacing: "5px"}}
                >
                  Get In Touch
                </h5>
                <p>
                  <i className="fa fa-map-marker-alt mr-2"></i>Banana street,Tanzania
                </p>
                <p>
                  <i className="fa fa-phone-alt mr-2"></i>+255 620 147 410
                </p>
                <p>
                  <i className="fa fa-envelope mr-2"></i>triplerainbow07@gmail.com
                </p>
                <div className="d-flex justify-content-start mt-4">
                  <a className="btn btn-outline-light btn-square mr-2" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-outline-light btn-square" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5
                  className="text-primary text-uppercase mb-4"
                  style={{letterSpacing: "5px"}}
                >
                  Our Courses
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link to="/" className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </Link>
                  <Link to="/courses" className="text-white mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Courses
                  </Link>
                  <Link to="/contact" className="text-white mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Contact
                  </Link>
               
                  <Link to="/" className="text-white" href="#">
                    <i className="fa fa-angle-right mr-2"></i>WebMail
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h5
              className="text-primary text-uppercase mb-4"
              style={{letterSpacing: "5px"}}
            >
              Newsletter
            </h5>
            <p>
              Rebum labore lorem dolores kasd est, et ipsum amet et at kasd,
              ipsum sea tempor magna tempor. Accu kasd sed ea duo ipsum. Dolor
              duo eirmod sea justo no lorem est diam
            </p>
            <div className="w-100">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-light"
                  style={{padding: "30px"}}
                  placeholder="Your Email Address"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
         style={{borderColor: "rgba(256, 256, 256, .1) !important"}}
      >
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white"> {new Date().getFullYear()}{" "}
              &copy; <a>triple.co.tz</a>. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
          
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}

      {/* <!-- Back to Top --> */}
     <UpButton/>
    </>
  );
};

export default Footer;
