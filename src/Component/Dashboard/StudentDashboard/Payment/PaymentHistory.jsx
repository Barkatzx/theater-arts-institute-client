import { motion } from "framer-motion";
import React from "react";
import { FaCheckCircle, FaReceipt, FaRegFileAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import usePayment from "../../../Hooks/usePayment";

const PaymentHistory = () => {
  const [payment] = usePayment();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Payment History</h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            View all your completed transactions
          </p>
        </div>

        {/* Stats Summary - Mobile Only */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Total Payments</p>
            <p className="text-lg font-bold text-indigo-600">{payment.length}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Total Spent</p>
            <p className="text-lg font-bold text-indigo-600">
              ${payment.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Cards */}
        {payment.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {payment.map((paymentItem, index) => (
              <motion.div
                key={paymentItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-4 md:p-6">
                  {/* Top Row - Transaction Info */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 md:p-3 rounded-lg mr-3 text-indigo-600">
                        <FaReceipt className="text-lg md:text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">
                          Transaction #{index + 1}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500">
                          {new Date(paymentItem.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 hidden md:block">Total</p>
                      <p className="text-lg md:text-xl font-bold text-indigo-600">
                        ${paymentItem.price}
                      </p>
                    </div>
                  </div>

                  {/* Middle Row - Status and ID */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                      <FaCheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Paid
                    </span>
                    <p className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
                      ID: {paymentItem.transctionId}
                    </p>
                  </div>

                  {/* Classes List */}
                  <div className="mt-3 md:mt-4 border-t border-gray-100 pt-3 md:pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm md:text-md font-medium text-gray-700 flex items-center">
                        <MdPayment className="mr-2 text-indigo-500" />
                        Classes ({paymentItem.quantity})
                      </h4>
                      <span className="text-xs text-gray-500 md:hidden">
                        ${paymentItem.price}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {paymentItem.className.slice(0, 2).map((name, nameIndex) => (
                        <li key={nameIndex} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2 md:mr-3"></span>
                          <span className="text-sm md:text-base text-gray-700 truncate">
                            {name}
                          </span>
                        </li>
                      ))}
                      {paymentItem.className.length > 2 && (
                        <li className="text-sm text-indigo-600 ml-3.5">
                          +{paymentItem.className.length - 2} more classes
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8 bg-white rounded-lg md:rounded-xl shadow-sm"
          >
            <div className="mx-auto h-16 w-16 text-gray-400">
              <FaRegFileAlt className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-500">
              No payment history yet
            </h3>
            <p className="mt-1 text-gray-400 text-sm md:text-base">
              Your completed payments will appear here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              Browse Classes
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentHistory;