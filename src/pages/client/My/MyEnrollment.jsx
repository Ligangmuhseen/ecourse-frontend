import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "datatables.net-bs5"; // Import the DataTable with Bootstrap 5 styling
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import axios from "axios";
import toastr from "toastr";
import "../../../assets/lib/toastr/toastr.css"; // Toastr for notifications
import API_BASE_URL from "../../../utils/apiConfig";
import { useAuth } from "../../../context/AuthContext";

const MyEnrollment = () => {
  const [enrollments, setEnrollments] = useState([]); // State to hold enrollment data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const { token } = useAuth(); // Get the token from AuthContext

  // Fetch enrollments when the component mounts
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/userenrollments`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token for authentication
        });
        setEnrollments(response.data.enrollments); // Assuming the API returns enrollments as an array
        setLoading(false);
      } catch (err) {
        setError("Error fetching enrollments");
        toastr.error("Failed to load enrollments");
        setLoading(false);
      }
    };

    if (token) {
      fetchEnrollments();
    }
  }, [token]);

  // Initialize DataTable once enrollments are fetched
  useEffect(() => {
    if (enrollments.length > 0) {
     const mytable = new DataTable("#enrollmentTable", {
     
        //searching: true, // Enable searching
        //ordering: true, // Enable column ordering
        //responsive: true, // Make the table responsive
        //autoWidth: false, // Disable automatic column width calculation
        //destroy: true, // Destroy the previous DataTable before re-initializing
        responsive: true,
        searchable: true,
        sortable: true,
        retrieve: true,
      });

      // Cleanup: Destroy the table instance on component unmount
      return () => {
        mytable.destroy();
      };
    }
  }, [enrollments]);

  if (loading) return <p>Loading enrollments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid">
      <div className="my-card-box">
        <h4 className="header-title mb-3">My All Enrollments</h4>
        <div className="table-striped">
          <table id="enrollmentTable" className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Course Name</th>
                <th>Date Enrolled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? (
                enrollments.map((enrollment, index) => (
                  <tr key={enrollment._id}>
                    <td>{index + 1}</td>
                    <td>{enrollment.course.coursetitle}</td> {/* Assuming the course title is in the course object */}
                    <td>{new Date(enrollment.enrollDate).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/mydashboard/viewmyenrollment/${enrollment._id}`}>
                        <button className="btn btn-sm btn-primary1 me-1" title="View Course">
                          <i className="fas fa-eye"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEnrollment;

