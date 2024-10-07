import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import NavBarBox from "../../components/admin/NavBarBox";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";

const Enrolledusers = () => {
  const [enrollments, setEnrollments] = useState([]);
  const { token } = useAuth();
  const { id } = useParams();

  // Function to fetch enrollment data
  const fetchEnrollments = async () => {
    // Build the URL with or without courseId
    const url = id
      ? `${API_BASE_URL}/api/alluserenrollments?courseId=${id}`
      : `${API_BASE_URL}/api/alluserenrollments`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [id]);

  useEffect(() => {
    // Initialize DataTable after data is fetched and enrollments are available
    if (enrollments.length > 0) {
      const myTable = new DataTable("#enrollTable", {
        responsive: true,
        searchable: true,
        sortable: true,
        retrieve: true,
      });
    }
  }, [enrollments]);

  return (
    <>
      <NavBarBox title="All Enrolled Users" />

      <div className="container-fluid">
        <table
          id="enrollTable"
          className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>FullName</th>
              <th>Email</th>
              <th>EnrollDate</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enrollment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{enrollment.user._id}</td>
                  <td>{enrollment.user.fullname}</td>
                  <td>{enrollment.user.email}</td>
                  <td>{enrollment.enrollDate}</td>
                  <td>{enrollment.course.coursetitle}</td>
                  <td>
                    <Link to={`/admin/viewuser/${enrollment.user._id}`}>
                      <button className="btn btn-primary1 btn-sm me-1">
                        <i className="fas fa-eye"></i>
                      </button>
                    </Link>
                    <Link to={`/admin/edituser/${enrollment.user._id}`}>
                      <button className="btn btn-primary btn-sm me-1">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Enrolledusers;
