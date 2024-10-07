import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-scroller-bs5";
import NavBarBox from "../../components/admin/NavBarBox";
import { Link } from "react-router-dom";

import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";

const AllUsers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const { token } = useAuth();
  

  useEffect(() => {
    // Fetch all users from the API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/users/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is stored in localStorage
          },
        });
        setUsers(response.data); // Set users in state
        console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId);
    try {
      await axios.delete(`${API_BASE_URL}/api/users/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming the token is stored in localStorage
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      const myTable = new DataTable("#userTable", {
        responsive: true,
        searchable: true,
        sortable: true,
        retrieve: true,
      });
    }
  }, [users]);

  return (
    <>
      <NavBarBox title="All users" />

      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/admin/createuser">
            <button className="btn btn-sm btn-primary me-1">Create User</button>
          </Link>
        </div>

        <table
          id="userTable"
          className="table datatable table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              {/* <th>UserID</th> */}
              <th>Fullname</th>
              <th>Email</th>
              <th>Active</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  {/* <td>{user._id}</td> */}
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.isActive ? "badge-success" : "badge-danger"
                      }`}
                    >
                      {user.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/viewuser/${user._id}`}>
                      <button className="btn btn-primary1 btn-sm me-1">
                        <i className="fas fa-eye"></i>
                      </button>
                    </Link>

                    <Link to={`/admin/edituser/${user._id}`}>
                      <button className="btn btn-primary btn-sm me-1">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>

                   
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

     
      </div>
    </>
  );
};

export default AllUsers;
