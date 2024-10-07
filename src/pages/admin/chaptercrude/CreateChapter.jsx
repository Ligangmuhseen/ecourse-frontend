import React, { useState, useEffect } from "react";
import NavBarBox from "../../../components/admin/NavBarBox";
import axios from "axios";
import Select from "react-select";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css"

const CreateChapter = () => {
  const { token } = useAuth(); // Get token from auth context
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coursename: null,
  });

  const [courses, setCourses] = useState([]); // Store courses for selection
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const courseOptions = response.data.map((course) => ({
          value: course._id,
          label: course.coursetitle, // Assuming `coursetitle` is the course name
        }));
        setCourses(courseOptions);
      } catch (error) {
        toastr.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, coursename: selectedOption }));
  };

  // Function to validate the chapter title format
  const validateTitle = (title) => {
    const titlePattern = /^CHAPTER \d+$/;
    return titlePattern.test(title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation logic
    const errors = {};
    if (!formData.title) {
      errors.title = "Chapter title is required.";
    } else if (!validateTitle(formData.title)) {
      errors.title = "Title must be in the format 'CHAPTER {number}' uppercase letters, e.g., CHAPTER 1.";
    }

    if (!formData.description) {
      errors.description = "Description is required.";
    }
    if (!formData.coursename) {
      errors.coursename = "Course selection is required.";
    }

    setFormErrors(errors);

    // If there are errors, stop submission
    if (Object.keys(errors).length) {
      setIsSubmitting(false);
      return;
    }

    try {
      // API submission logic
      const newChapter = {
        title: formData.title,
        description: formData.description,
        coursename: formData.coursename.value, // Get the selected course ID
      };

      const response = await axios.post(`${API_BASE_URL}/api/chapters`, newChapter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastr.success(response.data.message);
      // Reset form after submission
      setFormData({ title: "", description: "", coursename: null });
      setFormErrors({});
    } catch (error) {
      toastr.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBarBox title="Create Chapter" />

      <div className="container-fluid mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <p className="card-title fw-light m-2">Create New Chapter</p>
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
                  className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
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
                  className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter chapter description"
                />
                {formErrors.description && (
                  <div className="invalid-feedback">{formErrors.description}</div>
                )}
              </div>

              {/* Course Name (Select) */}
              <div className="mb-3">
                <label htmlFor="coursename" className="form-label">
                  Course Name
                </label>
                <Select
                  id="coursename"
                  name="coursename"
                  options={courses}
                  value={formData.coursename}
                  onChange={handleSelectChange}
                  placeholder="Select a course"
                  className={`react-select ${formErrors.coursename ? "is-invalid" : ""}`}
                />
                {formErrors.coursename && (
                  <div className="invalid-feedback">{formErrors.coursename}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Chapter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChapter;
