import React from "react";
import { Route } from "react-router-dom";
import Index from "../components/admin/Index";
import Dashboard from "../pages/admin/Dashboard";
import AllUsers from "../pages/admin/AllUsers";
import AllCourses from "../pages/admin/AllCourses";
import Enrolledusers from "../pages/admin/EnrolledUsers";
import CreateUser from "../pages/admin/usercrude/CreateUser";
import EditUser from "../pages/admin/usercrude/EditUser";
import CreateCourse from "../pages/admin/coursecrude/CreateCourse";
import EditCourse from "../pages/admin/coursecrude/EditCourse";
import ViewCourse from "../pages/admin/coursecrude/ViewCourse";
import ViewUser from "../pages/admin/usercrude/ViewUser";
import Profile from "../pages/admin/profile/Profile";
import AllChapters from "../pages/admin/AllChapters";
import ViewChapter from "../pages/admin/chaptercrude/ViewChapter";
import CreateChapter from "../pages/admin/chaptercrude/CreateChapter";
import EditChapter from "../pages/admin/chaptercrude/EditChapter";
import Login from "../pages/admin/Login";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AllVideos from "../pages/admin/AllVideos";
import ViewVideo from "../pages/admin/videocrude/ViewVideo";
import EditVideo from "../pages/admin/videocrude/EditVideo";
import CreateVideo from "../pages/admin/videocrude/CreateVideo";

const AdminRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="private-route-admin" element={<PrivateRouteAdmin />}>
    <Route key="admin" path="/admin" element={<Index />}>
      <Route key="dashboard" path="" element={<Dashboard />} />
      <Route key="profile" path="profile" element={<Profile />} />

      <Route key="allusers" path="allusers" element={<AllUsers />} />
      <Route key="enrolledusers-id" path="enrolledusers/:id" element={<Enrolledusers />} />
      <Route key="enrolledusers" path="enrolledusers" element={<Enrolledusers />} />
      <Route key="allcourses" path="allcourses" element={<AllCourses />} />
      <Route key="viewuser" path="viewuser/:id" element={<ViewUser />} />
      <Route key="createuser" path="createuser" element={<CreateUser />} />
      <Route key="edituser" path="edituser/:id" element={<EditUser />} />
      <Route key="createcourse" path="createcourse" element={<CreateCourse />} />
      <Route key="editcourse" path="editcourse/:id" element={<EditCourse />} />
      <Route key="viewcourse" path="viewcourse/:id" element={<ViewCourse />} />
      <Route key="allchapters" path="allchapters" element={<AllChapters />} />
      <Route key="allchapters-id" path="allchapters/:id" element={<AllChapters />} />
      <Route key="viewchapter" path="viewchapter/:id" element={<ViewChapter />} />
      <Route key="createchapter" path="createchapter" element={<CreateChapter />} />
      <Route key="editchapter" path="editchapter/:id" element={<EditChapter />} />
      <Route key="allvideos" path="allvideos" element={<AllVideos />} />
      <Route key="allvideos-id" path="allvideos/:id" element={<AllVideos />} />
      <Route key="viewvideo" path="viewvideo/:id" element={<ViewVideo />} />
      <Route key="createvideo" path="createvideo" element={<CreateVideo />} />
      <Route key="editvideo" path="editvideo/:id" element={<EditVideo />} />
    </Route>
  </Route>,
];

export default AdminRoutes;
