import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import NavBarBox from "../../components/admin/NavBarBox";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DeleteVideo from "./videocrude/DeleteVideo";
import API_BASE_URL from "../../utils/apiConfig";


const AllVideos = () => {
  const [videos, setVideos] = useState([]); // State to hold videos
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [selectedVideoId, setSelectedVideoId] = useState(null); // State for selected video for deletion
  const {id} = useParams()

  // Function to fetch all videos
  const fetchVideos = async () => {
    const url = id
    ? `${API_BASE_URL}/api/video?courseId=${id}`
    : `${API_BASE_URL}/api/video`;
    try {
      const response = await axios.get(url); // Adjust the API endpoint as necessary
      setVideos(response.data); // Set the videos in state
    } catch (err) {
      setError("Failed to fetch videos. Please try again."); // Handle error
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  // Fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, [id]);

  // Initialize DataTable when videos change
  useEffect(() => {
    if (videos.length > 0) {
      const myTable = new DataTable("#videosTable", {
        responsive: true,
        searchable: true,
        sortable: true,
        retrieve: true,
      });
    }
  }, [videos]);

  // Function to handle video deletion
  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/video/${videoId}`); // Adjust the API endpoint for deletion
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId)
      ); // Update state to remove deleted video
    } catch (err) {
      setError("Failed to delete video. Please try again."); // Handle error
    }
  };

  return (
    <>
      <NavBarBox title="Videos" />

      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/admin/createvideo">
            <button className="btn btn-sm btn-primary me-1">Add Video</button>
          </Link>
        </div>

        <table
          id="videosTable"
          className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>vidID</th>
              <th>Title</th>
              <th>ChapterName</th>
              <th>CourseName</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading videos...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  {error}
                </td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No videos available.
                </td>
              </tr>
            ) : (
              videos.map((video, index) => (
                <tr key={video._id}>
                  <td>{index + 1}</td>
                  <td>{video._id}</td>
                  <td>{video.title}</td>
                  <td>{video.chapter.title}</td>
                  <td>{video.chapter.coursename.coursetitle}</td>
                  <td>
                    <Link to={`/admin/viewvideo/${video._id}`}>
                      <button className="btn btn-primary1 btn-sm me-1">
                        <i className="fas fa-eye"></i>
                      </button>
                    </Link>

                    <Link to={`/admin/editvideo/${video._id}`}>
                      <button className="btn btn-warning btn-sm me-1">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteVideoModal"
                      onClick={() => setSelectedVideoId(video._id)} // Set the selected video ID
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Render the DeleteVideo modal and pass the selected video ID */}
       {videos.map((video, index) => (
          <DeleteVideo   key={video._id}
           videoId={selectedVideoId} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default AllVideos;
