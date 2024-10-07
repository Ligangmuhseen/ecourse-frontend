import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";
import Select from "react-select";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext"; // Assuming you have a context for token
import API_BASE_URL from "../../../utils/apiConfig";


const EditChapter = () => {
  const { id } = useParams(); // Get chapter ID from the URL
  const navigate = useNavigate();
  const { token } = useAuth(); // Get the auth token
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coursename: "", // Store selected course ID
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]); // Store available courses for react-select

  useEffect(() => {
    // Fetch the chapter details when component mounts
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/chapters/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data.chapter
        setFormData({
          title: result.title,
          description: result.description,
          coursename: result.coursename._id, // Assuming the API returns courseId
        });
      } catch (error) {
        toastr.error("Failed to fetch chapter details.");
        console.error("Error fetching chapter:", error);
      }
    };

    // Fetch all courses for react-select options
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Transform the response data to match react-select's format
        const courseOptions = response.data.map((course) => ({
          label: course.coursetitle,
          value: course._id, // Assuming course._id is the course identifier
        }));
        setCourses(courseOptions);
      } catch (error) {
        toastr.error("Failed to fetch courses.");
        console.error("Error fetching courses:", error);
      }
    };

    fetchChapter();
    fetchCourses();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      coursename: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example validation
    if (!formData.title) {
      setFormErrors({ title: "Chapter title is required" });
      return;
    }
    if (!formData.description) {
      setFormErrors({ description: "Description is required" });
      return;
    }
    if (!formData.coursename) {
      setFormErrors({ coursename: "Course is required" });
      return;
    }

    setIsSubmitting(true);
    try {

     const response = await axios.put(
        `${API_BASE_URL}/api/chapters/${id}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastr.success(response.data.message);
      navigate("/admin/allchapters"); // Navigate back to chapters list after editing
    } catch (error) {
      toastr.error(error.response?.data?.message);
      console.error("Error updating chapter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBarBox title="Edit Chapter" />

      <div className="container-fluid mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <p className="card-title fw-light m-2">Edit Chapter</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Chapter Title
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.title ? "is-invalid" : ""
                  }`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter chapter title"
                />
                {formErrors.title && (
                  <div className="invalid-feedback">{formErrors.title}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Chapter Description
                </label>
                <textarea
                  className={`form-control ${
                    formErrors.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter chapter description"
                />
                {formErrors.description && (
                  <div className="invalid-feedback">
                    {formErrors.description}
                  </div>
                )}
              </div>

              {/* Course Name (React-Select) */}
              <div className="mb-3">
                <label htmlFor="coursename" className="form-label">
                  Course Name
                </label>
                <Select
                  id="coursename"
                  name="coursename"
                  value={courses.find((course) => course.value === formData.coursename)} // Select the correct course
                  onChange={handleCourseChange}
                  options={courses}
                  placeholder="Select course"
                />
                {formErrors.coursename && (
                  <div className="text-danger mt-1">
                    {formErrors.coursename}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Edit Chapter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChapter;
