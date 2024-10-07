import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../../assets/scss/viewcard.scss";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext"; // Assuming you have an auth context
import API_BASE_URL from "../../../utils/apiConfig";
import { Image } from "antd";


const ViewCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null); // State to store course data
  const { token } = useAuth(); // Assuming you have a context to get the token
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch course details from the API
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data); // Set course data in state
      } catch (err) {
        setError("Failed to fetch course details");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCourse();
  }, [id, token]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <>
      <NavBarBox title="View Course" />

      <div className="container-fluid viewcard-body py-4">
        <article className="postcard dark blue">
          <a className="postcard__img_link" href="#">
            <Image
              src={`${API_BASE_URL}/${course.coverimage}`}
              className="postcard__img"
              width={400}
              height={300}
            />
          </a>
          <div className="postcard__text">
            <h1 className="postcard__title blue">
              <a href="">{course.coursetitle}</a>
            </h1>
            
            {/* Badge for Course Availability */}
            <span
              className={`mb-2 badge ${
                course.isAvailable ? "badge-success" : "badge-danger"
              }`}
            >
              {course.isAvailable ? "Available" : "Unavailable"}
            </span>

            <div className="postcard__subtitle small">
              <time dateTime={new Date(course.createdAt).toISOString()}>
                <i className="fas fa-calendar-alt mr-2"></i>
                {new Date(course.createdAt).toLocaleDateString()}
              </time>
            </div>
            <div className="postcard__bar"></div>
            <div className="postcard__preview-txt">
              {course.description || "No description available for this course."}
            </div>
            <ul className="postcard__tagbox">
              <li className="tag__item">
                <Link to={`/admin/enrolledusers/${course._id}`}>
                <i className="fas fa-tag mr-2"></i>Enrolled Users
                
                </Link>
               
              </li>
              <li className="tag__item">
                <Link to={`/admin/allchapters/${course._id}`}>
                <i className="fas fa-clock mr-2"></i>Chapters
                
                
                </Link>
              
              </li>
              <li className="tag__item play blue">

             <Link to={`/admin/allvideos/${course._id}`}>
                  <i className="fas fa-play mr-2"></i>Videos
             </Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
};

export default ViewCourse;
