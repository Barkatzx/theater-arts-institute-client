import React, { useContext, useState } from "react";
import { AiFillDashboard, AiFillHome } from "react-icons/ai";
import { CgClipboard } from "react-icons/cg";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
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
      setIsOpen(false);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Failed to log out. Please try again.",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Default avatar image
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const renderUserAvatar = () => (
    <div className="flex items-center">
      <div className="relative">
        <img
          src={user?.photoURL || defaultAvatar}
          alt={user?.displayName || "User"}
          className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultAvatar;
          }}
        />
        {user && (
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white"></span>
        )}
      </div>
      {isOpen && user?.displayName && (
        <span className="ml-2 text-gray-700 text-sm truncate max-w-[120px]">
          {user.displayName}
        </span>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="md:px-16 lg:px-40 px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://i.ibb.co/cQ68nnZ/Arts-Institute-removebg-preview-1.png"
              alt="Logo"
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm lg:text-base"
              >
                <AiFillHome className="mr-1 lg:mr-2" />
                Home
              </Link>
              <Link
                to="/classes"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm lg:text-base"
              >
                <CgClipboard className="mr-1 lg:mr-2" />
                Classes
              </Link>
              <Link
                to="/instructors"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm lg:text-base"
              >
                <FaUserCircle className="mr-1 lg:mr-2" />
                Instructors
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm lg:text-base"
                >
                  <AiFillDashboard className="mr-1 lg:mr-2" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4 ml-6">
              {user ? (
                <>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 lg:px-4 lg:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-xs lg:text-sm font-medium"
                  >
                    Logout
                  </button>
                  {renderUserAvatar()}
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 lg:px-4 lg:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-xs lg:text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={handleToggle}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white py-4 px-2 shadow-lg rounded-b-lg">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors"
              >
                <AiFillHome className="mr-3" />
                Home
              </Link>
              <Link
                to="/classes"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors"
              >
                <CgClipboard className="mr-3" />
                Classes
              </Link>
              <Link
                to="/instructors"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors"
              >
                <FaUserCircle className="mr-3" />
                Instructors
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  <AiFillDashboard className="mr-3" />
                  Dashboard
                </Link>
              )}

              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    {renderUserAvatar()}
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-red-600 hover:text-red-800 ml-4"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;