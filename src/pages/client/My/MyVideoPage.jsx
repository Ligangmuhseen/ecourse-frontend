import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/vimeo";
import "./MyVideoPage.css";
import API_BASE_URL from "../../../utils/apiConfig";
import { useAuth } from "../../../context/AuthContext";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css";

const MyVideoPage = () => {
  const { id } = useParams(); // Get courseId from URL
  const { token } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [chapters, setChapters] = useState([]);
  const [coursetitle, setCourseTitle] = useState("");
  const [coursedesc, setCourseDesc] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completionStatus, setCompletionStatus] = useState(false); // State for completion status
  const [processing, setProcessing] = useState(false); // State for video processing status
  const [videoAvailable, setVideoAvailable] = useState(false); // State to track if video is available

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (chapterId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setPlaying(true);
    setCompletionStatus(false); // Reset completion status when a new video is selected
    setProcessing(true); // Set processing to true when a new video is selected
    setVideoAvailable(false); // Reset video available status
  };

  // Fetch chapters and videos for the course
  useEffect(() => {
    const fetchChaptersAndVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/course/${id}/chapters-with-videos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChapters(response.data.chapters);
        setCourseTitle(response.data.coursetitle);
        setCourseDesc(response.data.description);
      } catch (error) {
        setError("Failed to load chapters and videos.");
        console.error("Error fetching chapters and videos:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompletionStatus = async (videoId) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/video/${videoId}/completion-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompletionStatus(response.data.is_completed); // Assume the response contains the completion status
      } catch (error) {
        console.error("Error fetching completion status:", error);
      }
    };

    fetchChaptersAndVideos();
    // Fetch completion status if a video is selected
    if (selectedVideo) {
      fetchCompletionStatus(selectedVideo._id);
      checkVideoProcessing(selectedVideo.vimeovideourl); // Check processing when a video is selected
    }
  }, [id, token, selectedVideo]);

  // Function to check if the video is processing
  const checkVideoProcessing = async (videoUrl) => {
    const vimeoVideoId = videoUrl.split("/").pop();
    try {
      const response = await axios.get(
        `https://api.vimeo.com/videos/${vimeoVideoId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_VIMEO_ACCESS_TOKEN}`, // Use your Vimeo access token
          },
        }
      );

      if (response.data.status === "available") {
        setProcessing(false); // Video is available
        setVideoAvailable(true); // Mark video as available
        toastr.success("Video is ready for viewing!");
      } else {
        setProcessing(true); // Video is still processing
        toastr.info("Video is still processing. Please wait...");
      }
    } catch (error) {
      console.error("Error fetching video processing status:", error);
      toastr.error("Failed to check video processing status.");
    }
  };

  // Polling function to check video processing status periodically
  const startProcessingCheck = (videoUrl) => {
    const interval = setInterval(() => {
      if (!videoAvailable) { // Only check if video is not available
        checkVideoProcessing(videoUrl);
      } else {
        clearInterval(interval); // Stop checking once video is available
      }
    }, 10000); // Check every 10 seconds

    return interval; // Return interval ID to clear it later
  };

  // Handle video selection and start processing check
  useEffect(() => {
    let processingInterval;

    if (selectedVideo) {
      processingInterval = startProcessingCheck(selectedVideo.vimeovideourl);
    }

    // Clear the interval when the component unmounts or video changes
    return () => {
      clearInterval(processingInterval);
    };
  }, [selectedVideo, videoAvailable]);

  // Handle video completion
  const handleComplete = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/video/${selectedVideo._id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompletionStatus(true); // Set status to completed
      toastr.success(response.data.message);
    } catch (error) {
      console.error("Error marking video as completed:", error);
      toastr.error(error.response.data.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container-fluid main-content">
        <div className="row">
          {/* Custom Hamburger Button */}
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <span className={`bar ${isSidebarOpen ? "open" : ""}`}></span>
            <span className={`bar ${isSidebarOpen ? "open" : ""}`}></span>
            <span className={`bar ${isSidebarOpen ? "open" : ""}`}></span>
          </button>

          {/* Sidebar */}
          <div
            className={`col-xl-3 sidebar-container ${
              isSidebarOpen ? "open" : "side-collapsed"
            }`}
          >
            <div className="sidebar bg-light">
              <ul className="list-group list-group-flush">
                {/* Courses */}
                <li
                  className="list-group-item"
                  style={{ textTransform: "uppercase" }}
                >
                  {coursetitle}
                </li>

                {/* Check if there are any chapters */}
                {chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <li
                      key={chapter._id}
                      className={`list-group-item dropdown ${
                        dropdownOpen[chapter._id] ? "expanded" : ""
                      }`}
                      onClick={() => toggleDropdown(chapter._id)}
                    >
                      <span className="dropdown-title">
                        {chapter.title}
                        <span
                          className={`arrow ${
                            dropdownOpen[chapter._id] ? "up" : "down"
                          }`}
                        ></span>
                      </span>

                      {/* Check if the chapter has any videos */}
                      {dropdownOpen[chapter._id] && (
                        <ul className="dropdown-content">
                          {chapter.videos.length > 0 ? (
                            chapter.videos.map((video) => (
                              <li
                                key={video._id}
                                className="dropdown-item"
                                onClick={() => handleVideoSelect(video)}
                              >
                                {video.title}
                              </li>
                            ))
                          ) : (
                            <li className="dropdown-item">
                              No videos in this chapter
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">
                    No chapters available for this course
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className={`col-xl-9 ${isSidebarOpen ? "" : "col-xl-12"}`}>
            <div className="container-fluid p-4">
              <div className="row">
                {selectedVideo ? (
                  <>
                    {/* Two-column layout for video and details */}
                    <div className="col-md-6 mb-4">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <div className="embed-responsive embed-responsive-16by9">
                            {processing ? (
                              // Show spinner if the video is still processing
                              <div className="spinner-container text-center">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <p>Video is processing, please wait...</p>
                              </div>
                            ) : (
                              <ReactPlayer
                                url={selectedVideo.vimeovideourl}
                                controls
                                playing={playing}
                                className="react-player"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">{selectedVideo.title}</h5>
                          <p className="card-text">{selectedVideo.description}</p>
                          <button
                            className="btn btn-success mt-3"
                            onClick={handleComplete}
                            disabled={completionStatus}
                          >
                            {completionStatus ? "Completed" : "Mark as Completed"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <h5 className="text-muted">Select a video to watch</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyVideoPage;
