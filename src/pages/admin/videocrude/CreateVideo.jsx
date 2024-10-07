import React, { useState, useEffect } from "react";
import NavBarBox from "../../../components/admin/NavBarBox";
import axios from "axios";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";
import Select from "react-select";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../utils/apiConfig";
import { Modal, Spinner } from "react-bootstrap"; // Import Spinner and Modal
import { WEB_SOCKET_URL } from "../../../utils/apiConfig";

const CreateVideo = () => {
  const { token } = useAuth();
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
    // Fetch chapters on component mount
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/chapters`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const chapterOptions = response.data.map((chapter) => ({
          value: chapter._id,
          label: `${chapter.coursename.coursetitle} => ${chapter.title}`,
        }));
        setChapters(chapterOptions);
      } catch (error) {
        toastr.error("Failed to load chapters");
      }
    };
    fetchChapters();

    // WebSocket connection
    const socket = new WebSocket(WEB_SOCKET_URL); // Ensure this matches your backend URL
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

    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.video) errors.video = "Video file is required";
    if (!formData.chapterId) errors.chapterId = "Please select a chapter";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const videoData = new FormData();
      videoData.append("title", formData.title);
      videoData.append("description", formData.description);
      videoData.append("video", formData.video);
      videoData.append("chapterId", formData.chapterId);

      try {
        setUploading(true); // Show the modal and start uploading
        await axios.post(`${API_BASE_URL}/api/video/`, videoData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toastr.success("Video uploaded successfully!");
      } catch (error) {
        toastr.error("Failed to upload video");
      } finally {
        setUploading(false); // Hide the modal after upload completes
        setUploadProgress(0); // Reset progress
      }
    }
  };

  return (
    <>
      <NavBarBox title="Create New Video" />
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                <p className="card-title fw-light m-2">Add Video</p>
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
                    >
                      </textarea>
                    {formErrors.description && (
                      <span className="text-danger">
                        {formErrors.description}
                      </span>
                    )}
                  </div>

                  {/* Video File */}
                  <div className="mb-3">
                    <label htmlFor="video" className="form-label">
                      Video File
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="video"
                      name="video"
                      onChange={handleChange}
                    />
                    {formErrors.video && (
                      <span className="text-danger">{formErrors.video}</span>
                    )}
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
                      Upload Video
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <span className="text-success fw-bolder">{uploadProgress}</span>%
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateVideo;
