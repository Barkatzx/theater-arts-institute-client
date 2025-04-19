import { motion } from "framer-motion";
import React from "react";
import usePayment from "../../../Hooks/usePayment";

const MyEnrolledClass = () => {
  const [payment] = usePayment();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            My Enrolled Classes
          </h1>
          <p className="text-lg text-gray-600">
            {payment.length} {payment.length === 1 ? 'Class' : 'Classes'} Enrolled
          </p>
        </div>

        {/* Enrolled Classes List */}
        {payment.length > 0 ? (
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
                          <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Enrolled
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-white rounded-xl shadow-sm"
          >
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-500">No Enrolled Classes Yet</h3>
            <p className="mt-1 text-gray-400">Your enrolled classes will appear here after payment</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyEnrolledClass;