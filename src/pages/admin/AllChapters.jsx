import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import NavBarBox from "../../components/admin/NavBarBox";
import { Link, useParams } from "react-router-dom";
import DeleteChapter from "./chaptercrude/DeleteChapter";
import axios from "axios"; // Import Axios
import { useAuth } from "../../context/AuthContext"; // Adjust the import based on your Auth context
import API_BASE_URL from "../../utils/apiConfig";

const AllChapters = () => {
  const [chapters, setChapters] = useState([]); // State to store chapters
  const { token } = useAuth(); // Assuming you have a context to get the token
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedChapterId, setSelectedChapterId] = useState(null); // State for selected video for deletion
  const {id} = useParams()

  // Fetch all chapters when the component mounts
  useEffect(() => {
    const fetchChapters = async () => {
      const url = id
      ? `${API_BASE_URL}/api/chapters?courseId=${id}`
      : `${API_BASE_URL}/api/chapters`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChapters(response.data); // Set chapters in state
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchChapters();
  }, [token,id]);

  // Handle chapter deletion
  const handleDeleteChapter = async (chapterId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/chapters/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChapters(chapters.filter((chapter) => chapter._id !== chapterId)); // Remove deleted chapter from state
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  // Initialize DataTable when chapters are loaded
  useEffect(() => {
    if (chapters.length > 0) {
      new DataTable("#chaptersTable", {
        responsive: true,
        retrieve: true, // Avoid re-initialization on every render
        searchable: true,
      });
    }
  }, [chapters]);

  return (
    <>
      <NavBarBox title="All Chapters" />
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/admin/createchapter">
            <button className="btn btn-sm btn-primary me-1">
              Create Chapter
            </button>
          </Link>
        </div>

        <table
          id="chaptersTable"
          className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          {loading ? ( // Show loading indicator while fetching
            <tr>
              <td colSpan="5" className="text-center">
                Loading chapters......
              </td>
            </tr>
          ) : chapters.length === 0 ? ( // Check if there are no chapters
            <tr>
              <td colSpan="5" className="text-center">
                No chapters available yet
              </td>
            </tr>
          ) : (
            <tbody>
              {chapters.map((chapter, index) => (
                <tr key={chapter._id}>
                  <td>{index + 1}</td>
                  <td>{chapter.title}</td>
                  <td>{chapter.coursename?.coursetitle || "N/A"}</td>{" "}
                  {/* Adjust based on course data structure */}
                  <td>
                    <Link to={`/admin/viewchapter/${chapter._id}`}>
                      <button className="btn btn-primary1 btn-sm me-1">
                        <i className="fas fa-eye"></i>
                      </button>
                    </Link>

                    <Link to={`/admin/editchapter/${chapter._id}`}>
                      <button className="btn btn-primary btn-sm me-1">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteChapterModal"
                      onClick={() => setSelectedChapterId(chapter._id)} // Set the selected video ID
                      
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {chapters.map((chapter, index) => (
           <DeleteChapter
           key={chapter._id}
           chapterId={selectedChapterId}
           handleDelete={handleDeleteChapter}
         />

        ))}
      </div>
    </>
  );
};

export default AllChapters;
