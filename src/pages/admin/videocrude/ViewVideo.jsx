import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./vimeoplayer.css";
import NavBarBox from "../../../components/admin/NavBarBox";
import API_BASE_URL from "../../../utils/apiConfig";
import ReactPlayer from "react-player/vimeo"; // Use ReactPlayer for Vimeo
import "../../../assets/lib/toastr/toastr.css";
import toastr from "toastr"; // Import toastr

const VIMEO_ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;

const ViewVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // Track if video is processing
  const [error, setError] = useState(null);
  const [videoAvailable, setVideoAvailable] = useState(false); // Track video availability

  // Fetch video data based on ID
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/video/${id}`);
        const videoData = response.data;
        setVideo(videoData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        toastr.error("Failed to fetch the video. " + err.message);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Check if video is ready on Vimeo
  const checkVideoAvailability = async (videoUrl) => {
    const vimeoVideoId = videoUrl.split("/").pop();
    try {
      const vimeoResponse = await axios.get(
        `https://api.vimeo.com/videos/${vimeoVideoId}`,
        {
          headers: {
            Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          },
        }
      );

      if (vimeoResponse.data.status === "available") {
        setProcessing(false);
        setVideoAvailable(true);
        toastr.success("Video is ready for viewing!");
      } else {
        setProcessing(true);
        toastr.info("Video is still processing. Please wait...");
      }
    } catch (err) {
      toastr.error("Failed to check video availability. " + err.message);
    }
  };

  // Polling every 10 seconds to check video availability
  useEffect(() => {
    let processingInterval;

    if (video && !videoAvailable) {
      checkVideoAvailability(video.vimeovideourl);
      processingInterval = setInterval(() => {
        checkVideoAvailability(video.vimeovideourl);
      }, 10000);
    }

    // Cleanup on unmount or when video becomes available
    return () => {
      if (processingInterval) {
        clearInterval(processingInterval);
      }
    };
  }, [video, videoAvailable]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!video) return <div>No video found.</div>;

  return (
    <>
      <NavBarBox title="View Video" />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Responsive ReactPlayer for Vimeo */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="embed-responsive embed-responsive-16by9">
                  {processing ? (
                    // Show spinner if video is still processing
                    <div className="spinner-container text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Processing video...</span>
                      </div>
                      <p className="text-center text-white">Processing video...</p>
                    </div>
                  ) : (
                    <ReactPlayer
                      url={video.vimeovideourl}
                      width="100%"
                      height="100%"
                      controls
                      playing={true} // Autoplay enabled
                      className="react-player"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Video Details */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Video Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Video Title:</strong>
                    <p>{video.title}</p>
                  </li>
                  <li className="list-group-item">
                    <strong>Description:</strong>
                    <p className="text-wrap">{video.description}</p>
                  </li>
                  <li className="list-group-item">
                    <strong>Chapter Name:</strong>
                    <p>{video.chapter.title}</p>
                  </li>
                  <li className="list-group-item">
                    <strong>Course Name:</strong>
                    <p>{video.chapter.coursename.coursetitle}</p>
                  </li>
                  <li className="list-group-item">
                    <strong>Vimeo URL:</strong>
                    <p>
                      <a
                        href={video.vimeovideourl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {video.vimeovideourl}
                      </a>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <strong>Video Created At:</strong>
                    <p>{new Date(video.createdAt).toLocaleDateString()}</p>
                  </li>
                  <li className="list-group-item">
                    <strong>Video Updated At:</strong>
                    <p>{new Date(video.updatedAt).toLocaleDateString()}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVideo;
