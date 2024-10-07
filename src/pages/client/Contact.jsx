import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <Header />
      {/* <!-- Header Start --> */}
      <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ minHeight: "300px" }}
          >
            <h3 className="display-4 text-white text-uppercase">Contact</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <Link to="/" className="text-white">
                  Home
                </Link>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Contact</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Contact Cards Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ letterSpacing: "5px" }}
            >
              Contact Information
            </h5>
            <h1>Reach Out to Us</h1>
          </div>
          <div className="row">
            {/* Location Card */}
            <div className="col-lg-4 mb-4">
              <div className="card bg-secondary text-center p-5">
                <i className="fa fa-map-marker-alt fa-4x text-primary mb-4"></i>
                <h5 className="text-uppercase mb-3">Our Location</h5>
                <p className="m-0">
                  Banana street,Tanzania
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="col-lg-4 mb-4">
              <div className="card bg-secondary text-center p-5">
                <i className="fa fa-envelope fa-4x text-primary mb-4"></i>
                <h5 className="text-uppercase mb-3">Email Us</h5>
                <p className="m-0">
                  triplerainbow07@gmail.com
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="col-lg-4 mb-4">
              <div className="card bg-secondary text-center p-5">
                <i className="fa fa-phone-alt fa-4x text-primary mb-4"></i>
                <h5 className="text-uppercase mb-3">Call Us</h5>
                <p className="m-0">
                  +255 620 147 410
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact Cards End --> */}

      <Footer />
    </>
  );
};

export default Contact;
