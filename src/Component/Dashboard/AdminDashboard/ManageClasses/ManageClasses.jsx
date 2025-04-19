import { motion } from "framer-motion";
import React from "react";
import { Helmet } from "react-helmet";
import { FaCheck, FaCommentAlt, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get("/class");
    return res.data;
  });

  const handleStatusUpdate = (id, status) => {
    axiosSecure.patch(`/class/${status === 'approve' ? 'approved' : 'deny'}/${id}`, { status: status === 'approve' ? 'approved' : 'denied' })
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: status === 'approve' ? "success" : "error",
            title: `Class ${status === 'approve' ? 'Approved' : 'Denied'} Successfully`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case 'denied':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Denied</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <Helmet>
        <title>Manage Classes</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Manage Classes
          </h1>
          <div className="inline-block bg-white px-4 py-1 md:px-6 md:py-2 rounded-full shadow-sm border border-gray-200">
            <span className="text-sm md:text-base text-gray-600 mr-2">Total Classes:</span>
            <span className="text-lg md:text-xl font-bold text-indigo-600">{classes.length}</span>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <motion.div
                key={classItem._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4"
              >
                <div className="flex items-start space-x-4">
                  <img 
                    className="h-12 w-12 rounded-full object-cover" 
                    src={classItem.classImage} 
                    alt={classItem.className} 
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{classItem.className}</h3>
                    <p className="text-sm text-gray-500">{classItem.instructorName}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        Seats: {classItem.availabeSeats}
                      </span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        ${classItem.price}
                      </span>
                      <div className="w-full mt-1">
                        {getStatusBadge(classItem.status)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusUpdate(classItem._id, 'approve')}
                    disabled={classItem.status === 'approved'}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center ${
                      classItem.status === 'approved' 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <FaCheck className="mr-1" /> Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusUpdate(classItem._id, 'deny')}
                    disabled={classItem.status === 'denied'}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center ${
                      classItem.status === 'denied' 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <FaTimes className="mr-1" /> Deny
                  </motion.button>
                  <Link 
                    to={`/dashboard/feedback/${classItem._id}`}
                    className="flex-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      <FaCommentAlt className="mr-1" /> Feedback
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8 bg-white rounded-lg shadow-sm"
            >
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-500">No Classes Found</h3>
              <p className="mt-1 text-sm text-gray-400">There are currently no classes to manage</p>
            </motion.div>
          )}
        </div>

        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Class</th>
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Instructor</th> */}
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Seats</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.length > 0 ? (
                    classes.map((classItem) => (
                      <motion.tr 
                        key={classItem._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={classItem.classImage} alt={classItem.className} />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{classItem.className}</div>
                              <div className="text-xs text-gray-500">{classItem.instructorName}</div>
                              <div className="text-xs text-gray-500">{classItem.email}</div>
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{classItem.instructorName}</div>
                        </td> */}
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                          {classItem.availabeSeats}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                          ${classItem.price}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {getStatusBadge(classItem.status)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusUpdate(classItem._id, 'approve')}
                            disabled={classItem.status === 'approved'}
                            className={`px-2 py-1 rounded-md text-xs ${
                              classItem.status === 'approved' 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            <FaCheck className="inline mr-1" /> Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusUpdate(classItem._id, 'deny')}
                            disabled={classItem.status === 'denied'}
                            className={`px-2 py-1 rounded-md text-xs ${
                              classItem.status === 'denied' 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            <FaTimes className="inline mr-1" /> Deny
                          </motion.button>
                          <Link to={`/dashboard/feedback/${classItem._id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
                            >
                              <FaCommentAlt className="inline mr-1" /> Feedback
                            </motion.button>
                          </Link>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="mx-auto h-16 w-16 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-500">No Classes Found</h3>
                        <p className="mt-1 text-sm text-gray-400">There are currently no classes to manage</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageClasses;