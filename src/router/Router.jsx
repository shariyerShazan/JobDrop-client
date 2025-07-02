import { createBrowserRouter } from "react-router";

import React from "react";
// import ReactDOM from "react-dom/client";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";
import AdminLayout from "../layout/AdminLayout";
import CreateJobs from "../Pages/adminPages/CreateJobs";
import AdminJobs from "../Pages/adminPages/AdminJobs";
import ApplicantsInMyJobs from "../Pages/adminPages/ApplicantsInMyJobs";
import DashBoardHome from "../Pages/adminPages/DashBoardHome";
import UpdateAdminJob from "../Pages/adminPages/UpdateAdminJob";
import Jobs from "../Pages/Jobs";
import JobDetails from "../Pages/JobDetails";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import PrivateRouteForAdmin from "./PrivateRouteForAdmin";
import PrivateRoute from "./PrivateRoute";
import PrivateRouteForStudent from "./PrivateRouteForStudent";
import MyAppliedJob from "../Pages/studentPages/MyAppliedJob";
import Chats from "../Pages/chats/Chats";
import LoginRegister from "../Pages/LoginRegister";
// import ApplicantsHandel from "../Pages/adminPages/ApplicantsHandel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "job-details/:id",
        element:
        <PrivateRoute >
      <JobDetails />
           </PrivateRoute> ,
      },
      {
        path: "profile",
        element:
        <PrivateRoute >
     <Profile />
        </PrivateRoute> ,
      },
      {
        path: "edit-profile",
        element:<PrivateRoute >
      <EditProfile />
        </PrivateRoute>
   
      },
      {
        path: "my-applied-job",
        element:<PrivateRouteForStudent >
      <MyAppliedJob />
        </PrivateRouteForStudent>
   
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login-register",
        element: <LoginRegister />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouteForAdmin>
        <AdminLayout />
       </PrivateRouteForAdmin>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouteForAdmin>
            <DashBoardHome />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "create-job",
        element: (
          <PrivateRouteForAdmin>
            <CreateJobs />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "admin-job",
        element: (
          <PrivateRouteForAdmin>
            <AdminJobs />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "applicants",
        element: (
          <PrivateRouteForAdmin>
            <ApplicantsInMyJobs />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "admin-job/update-job/:id",
        element: (
          <PrivateRouteForAdmin>
            <UpdateAdminJob />
          </PrivateRouteForAdmin>
        ),
      },
      {
        path: "chats",
        element: (
          <PrivateRouteForAdmin>
            <Chats/>
          </PrivateRouteForAdmin>
        ),
      }
    ],
  },
]);
