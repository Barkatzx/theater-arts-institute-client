import { motion } from "framer-motion";
import React from "react";
import usePayment from "../../../Hooks/usePayment";

const PaymentHistory = () => {
  const [payment] = usePayment();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Payment History</h1>
          <p className="text-gray-600 mt-2">View all your completed transactions</p>
        </div>

        {/* Payment Cards */}
        {payment.length > 0 ? (
          <div className="space-y-4">
            {payment.map((paymentItem, index) => (
              <motion.div
                key={paymentItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Transaction Info */}
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Transaction #{index + 1}</h3>
                          <p className="text-sm text-gray-500">ID: {paymentItem.transctionId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4 md:mb-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Payment Success
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-indigo-600">${paymentItem.price}</p>
                    </div>
                  </div>

                  {/* Classes List */}
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Classes ({paymentItem.quantity})</h4>
                    <ul className="space-y-2">
                      {paymentItem.className.map((name, nameIndex) => (
                        <li key={nameIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                          <span className="text-gray-700">{name}</span>
                        </li>
                      ))}
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
            className="text-center py-12 bg-white rounded-xl shadow-sm"
          >
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-500">No payment history yet</h3>
            <p className="mt-1 text-gray-400">Your completed payments will appear here</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentHistory;