import { motion } from "framer-motion";
import React from "react";
import { Helmet } from "react-helmet";
import { FaArrowRight, FaSadTear, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useClass from "../../../Hooks/useClass";

const MySelectedClass = () => {
  const [classess, refetch] = useClass();
  const total = classess.reduce((add, item) => item.price + add, 0);

  const handleDelete = (classes) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://summer-camp-server-barkatzx.vercel.app/selectedClass/${classes._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your class has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <Helmet>
        <title>My Selected Class</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-700">My Selected Classes</h2>
              <p className="text-gray-500 text-sm md:text-base">Manage your class selections</p>
            </div>
            
            <div className="w-full md:w-auto grid grid-cols-2 md:flex gap-4 md:gap-6">
              <div className="text-center bg-indigo-50 p-2 md:p-3 rounded-lg">
                <p className="text-xs md:text-sm font-medium text-gray-500">Total Classes</p>
                <p className="text-lg md:text-2xl font-bold text-indigo-600">{classess.length}</p>
              </div>
              
              <div className="text-center bg-indigo-50 p-2 md:p-3 rounded-lg">
                <p className="text-xs md:text-sm font-medium text-gray-500">Total Price</p>
                <p className="text-lg md:text-2xl font-bold text-indigo-600">${total.toFixed(2)}</p>
              </div>
              
              <Link 
                to="/dashboard/payment" 
                className="col-span-2 md:col-span-1"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all text-sm md:text-base"
                >
                  Proceed to Payment
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Classes List */}
        {classess.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-700 to-purple-700">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Instructor
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Seats
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classess.map((classes) => (
                    <motion.tr 
                      key={classes._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={classes.classImage} alt={classes.className} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{classes.className}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{classes.instructorName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes.availabeSeats < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {classes.availabeSeats} seats
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${classes.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          onClick={() => handleDelete(classes)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <FaTrash className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {classess.map((classes) => (
                <motion.div
                  key={classes._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <img 
                      className="h-16 w-16 rounded-full object-cover" 
                      src={classes.classImage} 
                      alt={classes.className} 
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{classes.className}</h3>
                      <p className="text-sm text-gray-500 mt-1">{classes.instructorName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`px-2 text-xs font-semibold rounded-full ${classes.availabeSeats < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {classes.availabeSeats} seats
                        </span>
                        <span className="">${classes.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(classes)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 md:py-12 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="text-gray-400 mb-4">
              <FaSadTear className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-500">No classes selected yet</h3>
            <p className="text-gray-400 mt-1 mb-4">Browse classes and add them to your selection</p>
            <Link 
              to="/classes" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse Classes <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MySelectedClass;