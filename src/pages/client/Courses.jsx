import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";
import { Image } from "antd";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);

  useEffect(() => {
    // Fetch courses based on current page
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/courses/available/paginated?page=${currentPage}`);
        setCourses(res.data.courses);
        setTotalPages(res.data.totalPages);
        setStartPage(res.data.startPage);
        setEndPage(res.data.endPage);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      {/* <!-- Header Start --> */}
      <div className="container-fluid page-header" style={{ marginBottom: "90px" }}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: "300px" }}>
            <h3 className="display-4 text-white text-uppercase">Courses</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <Link className="text-white" to="/">Home</Link>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Courses</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Courses Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>
              Courses
            </h5>
            <h1>Our Courses</h1>
          </div>
          <div className="row">
            {courses.map((course) => (
              <div key={course._id} className="col-lg-4 col-md-6 mb-4">
                <div className="rounded overflow-hidden mb-2">
                  <Image className="img-fluid" src={`${API_BASE_URL}/${course.coverimage}`} alt={course.coursetitle} width={400} height={200} />
                  <div className="bg-secondary p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <small className="m-0">
                        <i className="fa fa-users text-primary mr-2"></i>{course.studentsCount || 0} Students
                      </small>
                      <small className="m-0">
                        <i className="far fa-clock text-primary mr-2"></i>Duration
                      </small>
                    </div>
                    <Link to={`/coursedetail/${course._id}`} className="h5">
                      {course.coursetitle}
                    </Link>
                    <div className="border-top mt-4 pt-4">
                      <div className="d-flex justify-content-between">
                        <h6 className="m-0">
                          <i className="fa fa-star text-primary mr-2"></i>4.5 <small>250</small>
                        </h6>
                        <h5 className="m-0">$99</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="col-12">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-lg justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(1)} aria-label="First">
                    <i className="bi bi-chevron-double-left"></i>
                  </button>
                </li>
                {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((page) => (
                  <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(totalPages)} aria-label="Last">
                    <i className="bi bi-chevron-double-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Courses End --> */}

      <Footer />
    </>
  );
};

export default Courses;
