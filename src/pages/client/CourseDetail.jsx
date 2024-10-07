import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { Image } from "antd";
import { useAuth } from "../../context/AuthContext";
import toastr from "toastr";
import "../../assets/lib/toastr/toastr.css";

const CourseDetail = () => {
  const { id } = useParams(); // Get course ID from the URL
  const [course, setCourse] = useState(null); // To store course details
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors
  const [isEnrolled, setIsEnrolled] = useState(false); // To store enrollment status
  const { token } = useAuth();

  // Fetch course details when the component mounts or when the id changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`); // Replace with your backend endpoint
        setCourse(response.data); // Store the fetched course data
        setLoading(false); // Stop the loading spinner
      } catch (err) {
        setError("Error fetching course details");
        setLoading(false);
      }
    };

    const checkEnrollmentStatus = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/enrollment/check/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsEnrolled(response.data.enrolled);
        } catch (err) {
          console.error("Error checking enrollment status", err);
        }
      }
    };

    checkEnrollmentStatus();
    fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const enrollInCourse = async () => {
    if (!token) {
      toastr.error("To enroll you have to login first");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/enroll`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } } // Send the token in the headers
      );

      toastr.success(response.data.message); // Show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toastr.error(
        error.response?.data?.message || "Error enrolling in course"
      );
    }
  };

  return (
    <>
      <Header />

      {/* Header Start */}
      <div
        className="container-fluid page-header"
        style={{ marginBottom: "90px" }}
      >
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ minHeight: "300px" }}
          >
            <h3 className="display-4 text-white text-uppercase">
              {course.coursetitle}
            </h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <Link className="text-white" to="/">
                  Home
                </Link>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">{course.coursetitle}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* Detail Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <h6 className="text-primary mb-3">
                  {" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </h6>
                <h1 className="mb-5">{course.coursetitle}</h1>
                <Image
                  className="img-fluid rounded w-100 mb-4"
                  src={`${API_BASE_URL}/${course.coverimage}`}
                  alt="Course Image"
                  width="100%"
                  height="auto"
                  style={{
                    maxWidth: '600px', // Ensures the image doesn’t exceed 600px on larger screens
                    objectFit: 'cover', // Optional: ensures the image covers its container while maintaining aspect ratio
                  }}

                />
                <p>{course.description}</p>
              </div>
            </div>

            <div className="col-lg-4 mt-5 mt-lg-0">
              {/* Enroll Now Button */}
              <div className="mb-5">
                <div className="input-group">
                  {isEnrolled ? (
                    <span className="badge bg-success p-2">
                      Already Enrolled
                    </span>
                  ) : (
                    <Link
                      className="btn btn-outline-primary"
                      onClick={enrollInCourse}
                    >
                      Enroll Now For This Course
                    </Link>
                  )}
                </div>
              </div>

              {/* Course Details */}
              <div className="mb-2">
                {!isEnrolled ? (
                  <p className="text-uppercase">
                    To View Chapters & Videos Associated With Course, Enroll
                    First
                  </p>
                ) : (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <Link to={`/mydashboard/videoswatch/${course._id}`} className="text-decoration-none h6 m-0">
                        View Chapters and Videos
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail End */}

      <Footer />
    </>
  );
};

export default CourseDetail;
