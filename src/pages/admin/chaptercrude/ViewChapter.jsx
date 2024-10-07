import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get chapter ID from URL
import axios from "axios";
import "../../../assets/scss/viewcard.scss";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext"; // Adjust the import based on your Auth context
import API_BASE_URL from "../../../utils/apiConfig";


const ViewChapter = () => {
  const { id } = useParams(); // Get the chapter ID from the URL
  const { token } = useAuth(); // Get the authentication token
  const [chapter, setChapter] = useState(null); // State to store chapter data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch chapter data when the component mounts
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/chapters/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChapter(response.data.chapter); // Set the chapter data
      } catch (err) {
        setError("Error fetching chapter data"); // Handle error
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchChapter();
  }, [id, token]);

  if (loading) {
    return <div className="text-center">Loading chapter details...</div>; // Show loading message
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>; // Show error message
  }

  return (
    <>
      <NavBarBox title="View Chapter" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6">
            <div className="mt-1">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Chapter Title:</h6>
                  <span>{chapter.title}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Description:</h6>
                  <span>{chapter.description}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6>Course Name:</h6>
                  <span>{chapter.coursename?.coursetitle || "N/A"}</span> {/* Adjust based on course data structure */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewChapter;

