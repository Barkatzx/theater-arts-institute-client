import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home";
import Classes from "../Component/Classes/Classes";
import Instractor from "../Component/Instractor/Instractor";
import Main from "../Layout/Main";
import Login from "../Component/Login/Login";
import SignUp from "../Component/SignUp/SignUp";
import Dashboard from "../Component/Dashboard/Dashboard";
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
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
          element: <Instractor/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/signup",
          element: <SignUp/>,
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
        }
      ]
    },
  ]);

export default router;