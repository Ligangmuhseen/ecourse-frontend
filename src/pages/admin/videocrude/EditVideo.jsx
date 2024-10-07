import React, { useState, useEffect } from "react";
import NavBarBox from "../../../components/admin/NavBarBox";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";
import Select from "react-select";
import { Modal, Spinner } from "react-bootstrap"; // Import Spinner and Modal

const EditVideo = () => {
  const { token } = useAuth(); // Get auth token
  const { id } = useParams(); // Get video ID from URL parameters

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    chapterId: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [chapters, setChapters] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false); // Manage upload state
  const [ws, setWs] = useState(null); // WebSocket state

  useEffect(() => {
    // Fetch video data for editing
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/video/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const videoData = response.data;
        setFormData({
          title: videoData.title,
          description: videoData.description,
          chapterId: videoData.chapter._id,
        });
      } catch (error) {
        toastr.error("Failed to load video data");
      }
    };

    // Fetch chapters for selection
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/chapters`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const chapterOptions = response.data.chapters.map((chapter) => ({
          value: chapter._id,
          label: `${chapter.coursename.coursetitle} => ${chapter.title}`,
        }));
        setChapters(chapterOptions);
      } catch (error) {
        toastr.error("Failed to load chapters");
      }
    };

    fetchVideoData();
    fetchChapters();

    // WebSocket connection for upload progress
    const socket = new WebSocket(`ws://localhost:5000`); // Adjust the WebSocket URL if needed
    socket.onmessage = (event) => {
      const { progress } = JSON.parse(event.data);

      setUploadProgress(progress);
    };
    setWs(socket);

    return () => {
      // Clean up WebSocket connection
      if (ws) ws.close();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      chapterId: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.chapterId) errors.chapterId = "Please select a chapter";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const videoData = new FormData();
      videoData.append("title", formData.title);
      videoData.append("description", formData.description);
      if (formData.video) {
        videoData.append("video", formData.video); // Append video file if available
      }
      videoData.append("chapterId", formData.chapterId);

      try {
        setUploading(true); // Start showing modal and progress

        await axios.put(`${API_BASE_URL}/api/video/${id}`, videoData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toastr.success("Video updated successfully!");
      } catch (error) {
        toastr.error("Failed to update video");
      } finally {
        setUploading(false); // Hide modal when upload is finished
        setUploadProgress(0); // Reset progress after completion
      }
    }
  };

  return (
    <>
      <NavBarBox title="Edit Video Information" />
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <p className="card-title fw-light m-2">Edit Video</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Enter video title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {formErrors.title && (
                      <span className="text-danger">{formErrors.title}</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Video Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter video description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    {formErrors.description && (
                      <span className="text-danger">
                        {formErrors.description}
                      </span>
                    )}
                  </div>

                  {/* Video File */}
                  <div className="mb-3">
                    <label htmlFor="video" className="form-label">
                      Video File (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="video"
                      name="video"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Chapter Selection */}
                  <div className="mb-3">
                    <label htmlFor="chapterId" className="form-label">
                      Chapter Name
                    </label>
                    <Select
                      id="chapterId"
                      name="chapterId"
                      options={chapters}
                      value={chapters.find(
                        (chapter) => chapter.value === formData.chapterId
                      )} // Set selected chapter
                      placeholder="Select a chapter"
                      className="react-select"
                      onChange={handleSelectChange}
                    />
                    {formErrors.chapterId && (
                      <span className="text-danger">
                        {formErrors.chapterId}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      Update Video
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {formData.video != null ? (
        <>
          {/* Uploading Modal */}
          <Modal show={uploading} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Uploading Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center m-2">
                <Spinner animation="border" variant="success" />
              </div>

              {/* Circular Progress */}
              <div className="text-center">
                <p>Uploading video... Please wait.</p>
                <p>
                  Upload Progress:{" "}
                  <span className="text-success fw-bolder">
                    {uploadProgress}
                  </span>
                  %
                </p>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          {/* Uploading Modal */}
          <Modal show={uploading} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Updating Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center m-2">
                <Spinner animation="border" variant="success" />
              </div>

              {/* Circular Progress */}
              <div className="text-center">
                <p>Updating video... Please wait.</p>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditVideo;
