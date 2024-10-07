import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { Image } from "antd";
import { Link } from "react-router-dom";
import aboutimg from "../../assets/img/about.jpg"
import slide1 from "../../assets/img/carousel-1.jpg"
import slide2 from "../../assets/img/carousel-2.jpg"
import slide3 from "../../assets/img/carousel-3.jpg"



const Home = () => {

  const [latestCourses, setLatestCourses] = useState([]);

  // Fetch latest courses when the component mounts
  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/latest/courses`); // Adjust the URL based on your backend API route
        setLatestCourses(response.data); // Save the fetched courses to state
      } catch (error) {
        console.error("Error fetching latest courses:", error);
      }
    };

    fetchLatestCourses();
  }, []);
  return (
    <>
      <Header />
      {/* <!-- Carousel Start --> */}
      <div className="container-fluid p-0 pb-5 mb-5">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#header-carousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#header-carousel" data-slide-to="1"></li>
            <li data-target="#header-carousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              style={{ minHeight: "300px" }}
            >
              <img
                className="position-relative w-100"
                src={slide1}
                style={{ minHeight: "300px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div
                  className="p-5"
                  style={{ width: "100%", maxWidth: "900px" }}
                >
                  <h5 className="text-white text-uppercase mb-md-3">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white mb-md-4">
                    Best Education From Your Home
                  </h1>
                  <a
                    href=""
                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item" style={{ minHeight: "300px" }}>
              <img
                className="position-relative w-100"
                src={slide2}
                style={{ minHeight: "300px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div
                  className="p-5"
                  style={{ width: "100%", maxWidth: "900px" }}
                >
                  <h5 className="text-white text-uppercase mb-md-3">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white mb-md-4">
                    Best Online Learning Platform
                  </h1>
                  <a
                    href=""
                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item" style={{ minHeight: "300px" }}>
              <img
                className="position-relative w-100"
                src={slide3}
                style={{ minHeight: "300px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex align-items-center justify-content-center">
                <div
                  className="p-5"
                  style={{ width: "100%", maxWidth: "900px" }}
                >
                  <h5 className="text-white text-uppercase mb-md-3">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white mb-md-4">
                    New Way To Learn From Home
                  </h1>
                  <a
                    href=""
                    className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Carousel End --> */}

     

     {/* Courses Start */}
     <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5
              className="text-primary text-uppercase mb-3"
              style={{ letterSpacing: "5px" }}
            >
              Courses
            </h5>
            <h1>Our Latest Courses</h1>
          </div>
          <div className="row">
            {latestCourses.length > 0 ? (
              latestCourses.map((course) => (
                <div className="col-lg-4 col-md-6 mb-4" key={course._id}>
                  <div className="rounded overflow-hidden mb-2">
                    <Image
                      className="img-fluid"
                      src={`${API_BASE_URL}/${course.coverimage}`}
                      width={400}
                      height={200}
                      alt={course.coursetitle}
                    />
                    <div className="bg-secondary p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <small className="m-0">
                          <i className="fa fa-users text-primary mr-2"></i>25
                          Students
                        </small>
                        <small className="m-0">
                          <i className="far fa-clock text-primary mr-2"></i>
                          Duration
                        </small>
                      </div>
                      <Link to={`/coursedetail/${course._id}`} className="h5">
                        {course.coursetitle}
                      </Link>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0">
                            <i className="fa fa-star text-primary mr-2"></i>4.5{" "}
                            <small>(250)</small>
                          </h6>
                          <h5 className="m-0">$99</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                 <p>No courses found</p>

              </div>
             
            )}
          </div>
        </div>
      </div>
      {/* Courses End */}


      <Footer />
    </>
  );
};

export default Home;
