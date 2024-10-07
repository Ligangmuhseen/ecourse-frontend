import React, { useState } from "react";
import NavBarBox from "../../../components/admin/NavBarBox";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css"
import axios from "axios";
import API_BASE_URL from "../../../utils/apiConfig";
import { useAuth } from "../../../context/AuthContext";


const CreateCourse = () => {
  const {token} = useAuth()
  
  const [formData, setFormData] = useState({
    coverimage: null,
    coursetitle: "",
    description: "",
    isAvailable: true, // Optional field, set default if needed
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverimage") {
      setFormData((prev) => ({ ...prev, coverimage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation logic
    const errors = {};
    if (!formData.coursetitle) errors.coursetitle = "Course title is required";
    if (!formData.description) errors.description = "Course description is required";
    if (!formData.coverimage) errors.coverimage = "Cover image is required";
    
    setFormErrors(errors);

    // If there are errors, do not proceed
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    // Prepare form data for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("coursetitle", formData.coursetitle);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("coverimage", formData.coverimage);
   

    try {
      const response = await axios.post(`${API_BASE_URL}/api/courses`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${token}`
        },
      });

      // Show success message
      toastr.success(response.data.message);
      
      // Reset form after successful submission
      setFormData({ coverimage: null, coursetitle: "", description: "" });
      setFormErrors({});
    } catch (error) {
      // Show error message
      toastr.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBarBox title="Create Course" />

      <div className="container-fluid mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-dark  text-white">
            <p className="card-title fw-light m-2">Create New Course</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Cover Image */}
              <div className="mb-3">
                <label htmlFor="coverimage" className="form-label">
                  Cover Image
                </label>
                <input
                  type="file"
                  className={`form-control ${
                    formErrors.coverimage ? "is-invalid" : ""
                  }`}
                  id="coverimage"
                  name="coverimage"
                  onChange={handleChange}
                />
                {formErrors.coverimage && (
                  <div className="invalid-feedback">
                    {formErrors.coverimage}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="mb-3">
                <label htmlFor="coursetitle" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.coursetitle ? "is-invalid" : ""
                  }`}
                  id="coursetitle"
                  name="coursetitle"
                  value={formData.coursetitle}
                  onChange={handleChange}
                  placeholder="Enter course title"
                />
                {formErrors.coursetitle && (
                  <div className="invalid-feedback">{formErrors.coursetitle}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Course Description
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
                  placeholder="Enter course description"
                />
                {formErrors.description && (
                  <div className="invalid-feedback">
                    {formErrors.description}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
