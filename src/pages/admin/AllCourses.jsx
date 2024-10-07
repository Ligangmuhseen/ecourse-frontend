import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "datatables.net-bs5";
import { Link } from "react-router-dom";
import NavBarBox from "../../components/admin/NavBarBox";
import DeleteCourse from "./coursecrude/DeleteCourse";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an auth context to get the token
import API_BASE_URL from "../../utils/apiConfig";

const AllCourses = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const { token } = useAuth(); // Assuming you have a context to get the token
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  


  // Fetch all courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data); // Set courses in state
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchCourses();
  }, [token]);

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course._id !== courseId)); // Remove deleted course from state
      
    } catch (error) {
      console.error("Error deleting course:", error);
      
    }
  };

  // Initialize DataTable when courses are loaded
  useEffect(() => {
    if (courses.length > 0) {
      new DataTable("#coursesTable", {
        responsive: true,
        retrieve: true, // Avoid re-initialization on every render
      });
    }
  }, [courses]);

  return (
    <>
      <NavBarBox title="All Courses" />
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/admin/createcourse">
            <button className="btn btn-sm btn-primary">Create Course</button>
          </Link>
        </div>

        {/* Show loading spinner or message when fetching data */}

        <table
          id="coursesTable"
          className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
          </thead>

          {loading ? (
             <td colSpan="5" className="text-center">
             Loading Courses......
           </td>
          ) : (
            <>
              {/* Show message if no courses are available */}
              {courses.length === 0 ? (
                <tr>
                <td colSpan="5" className="text-center">
                  No courses available
                </td>
              </tr>
              ) : (
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course._id}>
                      <td>{index + 1}</td>
                      <td>{course._id}</td>
                      <td>{course.coursetitle}</td>
                      <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/admin/viewcourse/${course._id}`}>
                          <button className="btn btn-sm btn-primary1 me-1">
                            <i className="fas fa-eye"></i>
                          </button>
                        </Link>
                        <Link to={`/admin/editcourse/${course._id}`}>
                          <button className="btn btn-sm btn-warning me-1">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCourseModal"
                          onClick={() => setSelectedCourseId(course._id)} // Set the selected video ID
                        >
                          <i className="fas fa-trash"></i>
                        </button>

                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </>
          )}
        </table>
           {/* DeleteCourse Modal */}
        {courses.map((course, index) => (
        
           <DeleteCourse
           key={course._id}
           courseId={selectedCourseId}
           handleDelete={handleDeleteCourse}   />
           
          ))}
      
       

      </div>
    </>
  );
};

export default AllCourses;
