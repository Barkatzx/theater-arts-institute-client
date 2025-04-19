import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/404.jpg";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Default values if error doesn't contain these properties
  const status = error?.status || 404;
  const message = error?.message || "Oops! Page not found";
  
  // Custom messages based on status code
  const getErrorMessage = () => {
    switch(status) {
      case 404:
        return "The page you're looking for doesn't exist.";
      case 401:
        return "You are not authorized to view this page.";
      case 403:
        return "You don't have permission to access this resource.";
      case 500:
        return "Internal server error. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">

        <title>Error {status} | WRS</title>
        <meta name="description" content={`Error ${status} page`} />

      
      <div className="container flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
        {/* Error Image */}
        <div className="w-full lg:w-1/2">
          <img 
            src={errorImg} 
            alt="Error illustration" 
            className="w-full max-h-[500px] object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Error Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-indigo-600 mb-4">
              {status}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {message}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {getErrorMessage()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FaHome /> Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg shadow-sm hover:bg-indigo-50 transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>

          {/* Additional help section */}
          <div className="mt-10 text-sm text-gray-500">
            <p>If the problem persists, please contact our support team.</p>
            <p className="mt-1">
              Error code: {status} | {error?.statusText || "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;