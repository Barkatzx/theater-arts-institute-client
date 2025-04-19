import { motion } from 'framer-motion';
import React from 'react';

const TotalEnrolled = () => {
    // Sample data - replace with your actual data
    const enrollmentData = [
        { className: 'Acting Fundamentals', enrolled: 24, capacity: 30 },
        { className: 'Stage Production', enrolled: 18, capacity: 25 },
        { className: 'Improvisation', enrolled: 12, capacity: 20 },
        { className: 'Voice Training', enrolled: 15, capacity: 20 },
    ];

    const totalEnrolled = enrollmentData.reduce((sum, course) => sum + course.enrolled, 0);
    const totalCapacity = enrollmentData.reduce((sum, course) => sum + course.capacity, 0);
    const enrollmentPercentage = Math.round((totalEnrolled / totalCapacity) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Enrollment Overview
                    </h1>
                    <p className="text-lg text-gray-600">
                        Track your class enrollment statistics
                    </p>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Total Enrolled Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    >
                        <div className="text-4xl font-bold text-indigo-600 mb-2">
                            {totalEnrolled}
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">
                            Total Students Enrolled
                        </h3>
                    </motion.div>

                    {/* Enrollment Rate Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    >
                        <div className="text-4xl font-bold text-purple-600 mb-2">
                            {enrollmentPercentage}%
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">
                            Overall Enrollment Rate
                        </h3>
                    </motion.div>

                    {/* Available Slots Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    >
                        <div className="text-4xl font-bold text-green-600 mb-2">
                            {totalCapacity - totalEnrolled}
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">
                            Available Slots Remaining
                        </h3>
                    </motion.div>
                </div>

                {/* Enrollment Progress Bars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Class Enrollment Details
                    </h2>
                    
                    <div className="space-y-6">
                        {enrollmentData.map((course, index) => {
                            const percentage = Math.round((course.enrolled / course.capacity) * 100);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-gray-800">
                                            {course.className}
                                        </h3>
                                        <span className="text-sm font-medium text-gray-600">
                                            {course.enrolled}/{course.capacity} ({percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${
                                                percentage >= 80 ? 'bg-green-500' :
                                                percentage >= 50 ? 'bg-blue-500' :
                                                'bg-yellow-500'
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TotalEnrolled;