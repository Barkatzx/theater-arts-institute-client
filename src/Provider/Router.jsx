import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home";
import Classes from "../Component/Classes/Classes";
import Main from "../Layout/Main";
import Login from "../Component/Login/Login";
import SignUp from "../Component/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Component/Dashboard/Dashboard";
import Instructor from "../Component/Instructor/Instructor";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import AddClass from "../Component/Dashboard/InstructorDashBoard/AddClass/AddClass";
import AdminRoute from "./AdminRoute";
import TotalEnrolled from "../Component/Dashboard/InstructorDashBoard/TotalEnrolled/TotalEnrolled";
import MyClasses from "../Component/Dashboard/InstructorDashBoard/MyClasses/MyClasses";
import ManageUser from "../Component/Dashboard/AdminDashboard/ManageUser/ManageUser";
import ManageClasses from "../Component/Dashboard/AdminDashboard/ManageClasses/ManageClasses";
import AdminHome from "../Component/Dashboard/AdminDashboard/AdminHome/AdminHome";
import MySelectedClass from "../Component/Dashboard/StudentDashboard/MySelectedClass/MySelectedClass";
import StudentRoute from "./StudentRoute";
import PaymentHistory from "../Component/Dashboard/StudentDashboard/Payment/PaymentHistory";
import Payment from "../Component/Dashboard/StudentDashboard/Payment/Payment";
import Feedback from "../Component/Dashboard/AdminDashboard/FeedBack/FeedBack";
import InstructorHome from "../Component/Dashboard/InstructorDashBoard/InstructorHome/InstructorHome";
import MyEnrolledClass from "../Component/Dashboard/StudentDashboard/MyEnrolledClass/MyEnrolledClass";
import StudentHome from "../Component/Dashboard/StudentDashboard/StudentHome/StudentHome";
import instructorRoute from "./instructorRoute";


  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/classes",
          element: <Classes/>
        },
        {
          path: "/instructors",
          element: <Instructor/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/signup",
          element: <SignUp/>,
        },
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: 'addAclass', 
          element: <instructorRoute><AddClass/></instructorRoute>
        },
        {
          path: 'totalEnrolled', 
          element:<instructorRoute><TotalEnrolled/></instructorRoute>,
        },
        {
          path: 'myClasses', 
          element:<instructorRoute><MyClasses/></instructorRoute>,
        },
        {
          path: 'managerUser', 
          element:<AdminRoute>
            <ManageUser/>
          </AdminRoute>,
        },
        {
          path: 'manageClasses', 
          element:<AdminRoute>
           <ManageClasses/>
          </AdminRoute>,
        },
        {
          path: 'adminHome', 
          element:<AdminRoute>
           <AdminHome/>
          </AdminRoute>,
        },
        {
          path: 'selectedClass', 
          element:<StudentRoute> <MySelectedClass/></StudentRoute>,
        },
        {
          path: 'paymentHistory', 
          element:<StudentRoute> <PaymentHistory/></StudentRoute>,
        },
        {
          path: 'payment', 
          element:<StudentRoute> <Payment/></StudentRoute>,
        },
        {
          path: 'feedback/:id', 
          element:<AdminRoute><Feedback></Feedback></AdminRoute>,
        },
        {
          path: 'instructorHome', 
          element:<instructorRoute><InstructorHome/></instructorRoute> ,
        },
        {
          path: 'enrolledClass', 
          element:<instructorRoute><MyEnrolledClass/></instructorRoute>,
        },
        {
          path: 'studenthome', 
          element:<instructorRoute><StudentHome/></instructorRoute>,
        },
      ]
    }
  ]);

export default router;