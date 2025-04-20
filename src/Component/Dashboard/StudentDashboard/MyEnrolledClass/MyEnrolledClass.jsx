import { motion } from "framer-motion";
import React from "react";
import { FaBook, FaCheckCircle, FaRegSadTear } from "react-icons/fa";
import usePayment from "../../../Hooks/usePayment";

const MyEnrolledClass = () => {
  const [payment] = usePayment();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
            My Enrolled Classes
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            {payment.length} {payment.length === 1 ? 'Class' : 'Classes'} Enrolled
          </p>
        </div>

        {/* Enrolled Classes List */}
        {payment.length > 0 ? (
          <>
            {/* Desktop Table */}
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
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Class Details
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payment.map((classes, index) => (
                        <motion.tr 
                          key={classes._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <ul className="space-y-2">
                              {classes.className.map((name, nameIndex) => (
                                <li key={nameIndex} className="flex items-center">
                                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                  <span className="text-sm text-gray-800">{name}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                              {classes.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            ${classes.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FaCheckCircle className="h-3 w-3 mr-1" />
                              Enrolled
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {payment.map((classes, index) => (
                <motion.div
                  key={classes._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaCheckCircle className="h-3 w-3 mr-1" />
                      Enrolled
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <FaBook className="text-indigo-500 mr-2" />
                      Classes:
                    </h3>
                    <ul className="space-y-1 pl-6">
                      {classes.className.map((name, nameIndex) => (
                        <li key={nameIndex} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                          <span className="text-sm text-gray-700">{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-500">Qty: </span>
                      <span className="font-medium">{classes.quantity}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Price: </span>
                      <span className="font-medium">${classes.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8 md:py-12 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
              <FaRegSadTear className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-500">No Enrolled Classes Yet</h3>
            <p className="mt-2 text-gray-400">Your enrolled classes will appear here after payment</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              Browse Classes
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyEnrolledClass;