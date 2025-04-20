import { motion } from 'framer-motion';
import React from 'react';
import { FaBookOpen, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import usePayment from '../../../Hooks/usePayment';

const StudentHome = () => {
    const [payment] = usePayment();
    const totalSpent = payment.reduce((sum, item) => sum + item.price, 0);
    
    return (
        <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-50 to-indigo-50">
            {/* Welcome Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 md:mb-10"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
                    Welcome Back, <span className="text-indigo-600">Student</span>
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 text-center">
                    Here's your learning dashboard
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* Payment Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm md:text-base">Total Payments</p>
                            <motion.div
                                key={payment.length}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="text-3xl md:text-4xl font-bold text-gray-800 mt-1"
                            >
                                {payment.length}
                            </motion.div>
                        </div>
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <FaCheckCircle className="text-xl md:text-2xl" />
                        </div>
                    </div>
                </motion.div>

                {/* Classes Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm md:text-base">Enrolled Classes</p>
                            <div className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
                                {payment.reduce((sum, item) => sum + item.quantity, 0)}
                            </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full text-green-600">
                            <FaBookOpen className="text-xl md:text-2xl" />
                        </div>
                    </div>
                </motion.div>

                {/* Total Spent Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm md:text-base">Total Spent</p>
                            <div className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
                                ${totalSpent.toFixed(2)}
                            </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                            <FaMoneyBillWave className="text-xl md:text-2xl" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
            >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                
                {payment.length > 0 ? (
                    <div className="space-y-4">
                        {payment.slice(0, 3).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                                    <FaCheckCircle className="text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800">
                                        Payment for {item.className.length} {item.className.length === 1 ? 'class' : 'classes'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        ${item.price} • {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No recent activity yet</p>
                    </div>
                )}

                {payment.length > 3 && (
                    <div className="mt-4 text-center">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                            View All Activity →
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default StudentHome;