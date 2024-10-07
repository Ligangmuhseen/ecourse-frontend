import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL params
  const { token } = useAuth(); // Get token from auth context

  const [formData, setFormData] = useState({
    coverimage: null,
    coursetitle: "",
    description: "",
    isAvailable: false, // Add isAvailable to the state
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing course data to pre-fill the form
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          coverimage: null, // Leave as null to allow optional upload
          coursetitle: response.data.coursetitle,
          description: response.data.description,
          isAvailable: response.data.isAvailable || false, // Fetch isAvailable from the response
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load course data");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "coverimage") {
      setFormData((prev) => ({ ...prev, coverimage: files[0] }));
    } else if (name === "isAvailable") {
      setFormData((prev) => ({ ...prev, isAvailable: checked })); // Update isAvailable based on checkbox
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // FormData for sending course updates (only add coverimage if uploaded)
    const formDataToSend = new FormData();
    if (formData.coverimage) {
      formDataToSend.append("coverimage", formData.coverimage);
    }
    formDataToSend.append("coursetitle", formData.coursetitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("isAvailable", formData.isAvailable); // Add isAvailable to the request

    try {
      // API call to update the course
      const response = await axios.put(`${API_BASE_URL}/api/courses/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toastr.success(response.data.message);
      setFormErrors({});
    } catch (err) {
      toastr.error(err.response?.data?.message || "Something went wrong!");
      setFormErrors({ general: "Failed to update the course." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading course data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBarBox title="Edit Course" />

      <div className="container-fluid mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <p className="card-title fw-light m-2">Edit Course</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Cover Image */}
              <div className="mb-3">
                <label htmlFor="coverimage" className="form-label">
                  Cover Image (optional)
                </label>
                <input
                  type="file"
                  className={`form-control ${formErrors.coverimage ? "is-invalid" : ""}`}
                  id="coverimage"
                  name="coverimage"
                  onChange={handleChange}
                />
                {formErrors.coverimage && <div className="invalid-feedback">{formErrors.coverimage}</div>}
              </div>

              {/* Title */}
              <div className="mb-3">
                <label htmlFor="coursetitle" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  className={`form-control ${formErrors.coursetitle ? "is-invalid" : ""}`}
                  id="coursetitle"
                  name="coursetitle"
                  value={formData.coursetitle}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                />
                {formErrors.coursetitle && <div className="invalid-feedback">{formErrors.coursetitle}</div>}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Course Description
                </label>
                <textarea
                  className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter course description"
                  required
                />
                {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
              </div>

              {/* Is Available Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isAvailable">
                  Available for enrollment
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Course"}
              </button>

              {formErrors.general && <p className="text-danger mt-2">{formErrors.general}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
