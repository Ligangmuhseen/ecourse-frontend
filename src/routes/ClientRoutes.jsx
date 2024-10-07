import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/client/Home";
import Courses from "../pages/client/Courses";
import Contact from "../pages/client/Contact";
import "../assets/css/client.css";
import CourseDetail from "../pages/client/CourseDetail";
import Mydashboard from "../pages/client/My/Mydashboard";
import MyHome from "../pages/client/My/MyHome";
import MyEnrollment from "../pages/client/My/MyEnrollment";
import MyVideoPage from "../pages/client/My/MyVideoPage";
import EditProfile from "../pages/client/My/EditProfile";
import PrivateClientRoutes from "./PrivateClientRoutes";
import ViewMyEnrollment from "../pages/client/My/ViewMyEnrollment";

const ClientRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="courses" path="/courses" element={<Courses />} />,
  <Route key="coursedetail" path="/coursedetail/:id" element={<CourseDetail />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route key="private-client-routes" element={<PrivateClientRoutes />}>
    <Route key="mydashboard" path="/mydashboard" element={<Mydashboard />}>
      <Route key="myhome" path="" element={<MyHome />} />
      <Route key="myenrollment" path="myenrollment" element={<MyEnrollment />} />
      <Route key="viewmyenrollment" path="viewmyenrollment/:id" element={<ViewMyEnrollment />} />
      <Route key="videoswatch" path="videoswatch/:id" element={<MyVideoPage />} />
      <Route key="editprofile" path="editprofile" element={<EditProfile />} />
    </Route>
  </Route>,
];

export default ClientRoutes;

