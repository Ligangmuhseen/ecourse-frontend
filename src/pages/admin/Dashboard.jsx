import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ApexCharts from "react-apexcharts";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const {token} = useAuth()

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Enrollments",
      data: [], // Initially empty, will be filled by API
    },
  ]);

  // Fetch the enrollment data from the backend
  const fetchEnrollmentData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/enrollment-data`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }); // Make sure this matches your API route
      const { enrollments } = response.data;
      
      setChartSeries([
        {
          name: "Enrollments",
          data: enrollments, // Update data from API response
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch enrollment data", error);
    }
  };

  useEffect(() => {
    fetchEnrollmentData(); // Fetch data when the component mounts
  }, []);

   // State to hold counts
   const [counts, setCounts] = useState({
    userCount: 0,
    videoCount: 0,
    courseCount: 0,
  });

  // Fetch counts on component mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/counts`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setCounts(response.data); // Update state with counts
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []); // Empty dependency array means this runs once on mount


  return (
    <>
      {/* Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-dark" type="button">
            <i className="bi-search"></i>
          </button>
        </div>
      </div>
      <hr />
      {/* Dashboard Cards */}
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <div className="card l-bg-cherry">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0 text-white">All Courses</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0 text-white">
                  {counts.courseCount.toLocaleString()} {/* Display Course Count */}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <Link to="/admin/allcourses">
                    <span className="btn btn-light">
                      <i className="fa fa-eye"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className="progress mt-1 "
                data-height="8"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar l-bg-cyan"
                  role="progressbar"
                  data-width="25%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-users"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0 text-white">All Users</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0 text-white">
                  {counts.userCount.toLocaleString()} {/* Display User Count */}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <Link to="/admin/allusers">
                    <span className="btn btn-success">
                      <i className="fa fa-eye"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className="progress mt-1 "
                data-height="8"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar l-bg-green"
                  role="progressbar"
                  data-width="25%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="card l-bg-green-dark">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0 text-white">All Videos</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0 text-white">
                  {counts.videoCount.toLocaleString()} {/* Display Video Count */}
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <Link to="/admin/allvideos">
                    <span className="btn btn-info">
                      <i className="fa fa-eye"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className="progress mt-1 "
                data-height="8"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar l-bg-orange"
                  role="progressbar"
                  data-width="25%"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="row">
        <div className="col-lg-7 mt-2">
          <div className="card shadow">
            <div className="card-body">
            <ApexCharts
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5 mt-2">
          <div className="card shadow bg-light p-1">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
