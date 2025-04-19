import React, { useContext, useState } from "react";
import { AiFillDashboard, AiFillHome } from "react-icons/ai";
import { CgClipboard } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logOut = authContext?.logOut;

  const handleSignOut = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Failed to log out. Please try again.",
      });
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-50 md:px-40 px-4">
      <nav className="flex flex-wrap items-center justify-between py-2 relative">
        {/* Logo - Left */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img
              src="https://i.ibb.co/cQ68nnZ/Arts-Institute-removebg-preview-1.png"
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden absolute right-4 top-4"
          onClick={handleToggle}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 12H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2zm0-7H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2zm0 14H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25zm0 7.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12zm0 7.25a.75.75 0 1 1 0-1.5h16.5a.75.75 0 0 1 0 1.5H3z"
              />
            )}
          </svg>
        </button>

        {/* Center Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:justify-center md:w-auto md:mt-0 gap-6 text-center text-sm`}
        >
          <Link
            to="/"
            className="hover:text-indigo-800 flex gap-2 items-center justify-center"
          >
            <AiFillHome />
            Home
          </Link>
          <Link
            to="/classes"
            className="hover:text-indigo-800 flex gap-2 items-center justify-center"
          >
            <CgClipboard />
            Classes
          </Link>
          <Link
            to="/instructors"
            className="hover:text-indigo-800 flex gap-2 items-center justify-center"
          >
            <FaUserCircle />
            Instructors
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-indigo-800 flex gap-2 items-center justify-center"
            >
              <AiFillDashboard />
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side - Login / Logout / Avatar */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:justify-end md:w-auto mt-4 md:mt-0 gap-4`}
        >
          {user ? (
            <>
              <button
                className="bg-indigo-800 text-white py-1 px-5 rounded-lg hover:bg-indigo-600"
                onClick={handleSignOut}
              >
                Logout
              </button>
              <div className="btn btn-ghost btn-circle avatar">
                <div className="rounded-full overflow-hidden w-10">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="UserImage"
                      title={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link
              className="bg-indigo-800 text-white py-1 px-5 rounded-lg hover:bg-indigo-600"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
