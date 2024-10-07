import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import { Image } from "antd";


const ViewMyEnrollment = () => {
  const { id } = useParams(); // Get enrollment ID from URL
  const [enrollment, setEnrollment] = useState(null); // State to store enrollment details
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const { token } = useAuth();

  // Fetch enrollment details from API
  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/enrollment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrollment(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [id]);

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!enrollment) return <div>No enrollment details found.</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Section: Course Image */}
        <div className="col-lg-6 mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <Image
                src={`${API_BASE_URL}/${enrollment.course.coverimage}`}
                alt="Course"
                className="img-fluid rounded"
                width="100%"
                height="auto"
                style={{
                  maxWidth: '700px', // Ensures the image doesn’t exceed 600px on larger screens
                  objectFit: 'cover', // Optional: ensures the image covers its container while maintaining aspect ratio
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section: Course and Enrollment Details */}
        <div className="col-lg-6 mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Course Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Course Title:</strong>
                  <p>{enrollment.course.coursetitle}</p>{" "}
                  {/* Dynamic course title */}
                </li>
                <li className="list-group-item">
                  <strong>Enrollment Date:</strong>
                  <p>
                    {new Date(enrollment.enrollDate).toLocaleDateString()}
                  </p>{" "}
                  {/* Dynamic enrollment date */}
                </li>
                <li className="list-group-item">
                  <strong>Course Description:</strong>
                  <p className="text-wrap">
                    {enrollment.course.description}
                  </p>{" "}
                  {/* Dynamic course description */}
                </li>
                <li className="list-group-item">
                  <strong>EnrollStatus:</strong>
                  <p className="text-wrap">
                    <span
                      className={`${
                        enrollment.isEnroll
                          ? "badge badge-success"
                          : "badge badge-danger"
                      }`}
                    >
                      {enrollment.isEnroll ? "Enrolled" : "Not Enrolled"}
                    </span>{" "}
                  </p>{" "}
                  {/* Dynamic course description */}
                </li>

                <li className="list-group-item">
                  <Link to={`/mydashboard/videoswatch/${enrollment.course._id}`} className="btn btn-outline-dark">
                    Go to videos & chapters
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyEnrollment;
