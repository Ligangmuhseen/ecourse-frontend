import React from "react";
import { Link } from "react-router-dom";


const Error404 = () => {
  return (
    <>
      <div className="not-found-container d-flex align-items-center justify-content-center vh-100" style={{backgroundColor:"#f8f9fa"}}>
        <div className="text-center">
          <h1 className="display-1 font-weight-bold text-primary">404</h1>
          <h3 className="mb-4">Oops! Page not found</h3>
          <p className="mb-5">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary btn-lg px-4">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
