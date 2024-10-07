import React, { useEffect, useState } from "react";
import "./MyHome.css";
import API_BASE_URL from "../../../utils/apiConfig";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


const MyHome = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    completedVideosCount: 0,
    enrolledCoursesCount: 0,
    totalAvailableCoursesCount: 0
  });

  const { token } = useAuth(); // Access the token from the context

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData === null && token) {
        try {
          // Fetch user profile
          const response = await axios.get(`${API_BASE_URL}/api/users/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);

          // Fetch user stats counts (completed videos, enrolled courses, available courses)
          const statsResponse = await axios.get(`${API_BASE_URL}/api/user/stats/counts/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setStats(statsResponse.data); // Assuming it returns the counts

        } catch (error) {
          console.error("Error fetching user data or stats:", error);
        }
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, [userData, token]);

  // Check if userData is null before rendering
  if (userData === null) {
    return null; // or a loading indicator if desired
  }

  return (
    <>
    <div className="my-body">

    <div className="content" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              {/* <!-- meta --> */}
              <div className="my-profile-user-box my-card-box my-bg-custom">
                <div className="row">
                  <div className="col-sm-6">
                    <span className="float-left mr-3">
                      <img
                        src={`${API_BASE_URL}${userData.profile_photo}`}
                        alt=""
                        className="my-thumb-lg rounded-circle"
                      />
                    </span>
                    <div className="media-body text-white">
                      <h4 className="mt-1 mb-1 font-18">{userData.fullname}</h4>
                      <p className="my-font-13" style={{color:"green"}}>
                        Welcome {userData.fullname}
                      </p>
                      <p className="text-light fw-bolder mb-0">{userData.location}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-right">
                      <Link to="/mydashboard/editprofile">

                      <button type="button" className="btn btn-light waves-effect">
                        <i className="fas fa-user mr-1"></i>{" "}
                        Edit Profile
                      </button>
                      
                      
                      </Link>
                   
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/ meta --> */}
            </div>
          </div>
          {/* <!-- end row --> */}
          <div className="row">
            <div className="col-xl-4">
              {/* <!-- Personal-Information --> */}
              <div className="my-card-box">
                <h4 className="header-title mt-0">Personal Information</h4>
                <div className="panel-body">
                  {/* <p className="my-text-muted my-font-13">
                   
                  </p> */}
                  <hr />
                  <div className="text-left">
                    <p className="my-text-muted my-font-13">
                      <strong>Full Name :</strong>{" "}
                      <span className="m-l-15">{userData.fullname}</span>
                    </p>
                    <p className="my-text-muted my-font-13">
                      <strong>Mobile :</strong>
                      <span className="m-l-15">{userData.phone_no}</span>
                    </p>
                    <p className="my-text-muted my-font-13">
                      <strong>Email :</strong>{" "}
                      <span className="m-l-15">{userData.email}</span>
                    </p>
                    <p className="my-text-muted my-font-13">
                      <strong>Location :</strong>{" "}
                      <span className="m-l-15">{userData.location}</span>
                    </p>
                    <p className="my-text-muted my-font-13">
                      <strong>Gender :</strong>{" "}
                      <span className="m-l-15">{userData.gender}</span>
                    </p>

                    <p className="my-text-muted my-font-13">
                      <strong>Role :</strong>{" "}
                      <span className="m-l-15">{userData.role}</span>
                    </p>
                   
                  </div>
               
                </div>
              </div>
             
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-sm-4">
                  <div className="my-card-box tilebox-one">
                    <i className="icon-layers float-right my-text-muted"></i>
                    <h6 className="my-text-muted text-uppercase mt-0">Enrolled Courses</h6>
                    <h2 className="" data-plugin="counterup">
                    {stats.enrolledCoursesCount}
                    </h2>
                    <span className="my-badge my-badge-custom">+11% </span>
               
                  </div>
                </div>
                {/* <!-- end col --> */}
                <div className="col-sm-4">
                  <div className="my-card-box tilebox-one">
                    <i className="icon-paypal float-right my-text-muted"></i>
                    <h6 className="my-text-muted text-uppercase mt-0">Available Courses</h6>
                    <h2 className="">
                      <span data-plugin="counterup">{stats.totalAvailableCoursesCount}</span>
                    </h2>
                    <span className="my-badge badge-danger">-29% </span>
                  
                  </div>
                </div>
                {/* <!-- end col --> */}
                <div className="col-sm-4">
                  <div className="my-card-box tilebox-one">
                    <i className="icon-rocket float-right my-text-muted"></i>
                    <h6 className="my-text-muted text-uppercase mt-0">Video watched</h6>
                    <h2 className="" data-plugin="counterup">
                    {stats.completedVideosCount}
                    </h2>
                    <span className="my-badge my-badge-custom">+89% </span>
               
                  </div>
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!-- end row --> */}
            
              
            </div>
            {/* <!-- end col --> */}
          </div>
          {/* <!-- end row --> */}
        </div>
        {/* <!-- container --> */}
      </div>



    </div>
     
    </>
  );
};

export default MyHome;
