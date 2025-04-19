import { motion } from 'framer-motion';
import React from 'react';
import usePayment from '../../../Hooks/usePayment';

const StudentHome = () => {
    const [payment] = usePayment();
    
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-indigo-50">
            {/* Welcome Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Welcome Back, <span className="text-indigo-600">Student</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Here's your payment summary
                </p>
            </motion.div>

            {/* Payment Card */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 rounded-3xl"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex flex-col items-center">
                        {/* Animated Number */}
                        <motion.div
                            key={payment.length}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
                        >
                            {payment.length}
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                            Total Payments
                        </h3>
                        
                        {/* Subtitle */}
                        <p className="text-gray-500 text-lg">
                            You've made {payment.length} successful {payment.length === 1 ? 'payment' : 'payments'}
                        </p>
                        
                        {/* Decorative Elements */}
                        <div className="flex space-x-4 mt-6">
                            <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                            <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Additional decorative elements */}
            <div className="absolute bottom-10 right-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="#4F46E5"/>
                </svg>
            </div>
        </div>
    );
};

export default StudentHome;