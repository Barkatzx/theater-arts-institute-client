import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaChair, FaChartLine, FaInfoCircle, FaUsers } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const TotalEnrolled = () => {
    // State for loading and data
    const [loading, setLoading] = useState(true);
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');

    // Simulate fetching data from an API
    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            // Replace this with actual API call
            setTimeout(() => {
                const mockData = [
                    { className: 'Acting Fundamentals', enrolled: 24, capacity: 30 },
                    { className: 'Stage Production', enrolled: 18, capacity: 25 },
                    { className: 'Improvisation', enrolled: 12, capacity: 20 },
                    { className: 'Voice Training', enrolled: 15, capacity: 20 },
                    { className: 'Script Analysis', enrolled: 8, capacity: 15 },
                    { className: 'Movement for Actors', enrolled: 22, capacity: 25 },
                ];
                setEnrollmentData(mockData);
                setLastUpdated(new Date().toLocaleTimeString());
                setLoading(false);
            }, 800);
        };

        fetchData();
    }, []);

    // Calculate totals
    const totalEnrolled = enrollmentData.reduce((sum, course) => sum + course.enrolled, 0);
    const totalCapacity = enrollmentData.reduce((sum, course) => sum + course.capacity, 0);
    const enrollmentPercentage = Math.round((totalEnrolled / totalCapacity) * 100);
    const availableSlots = totalCapacity - totalEnrolled;

    // Refresh data
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLastUpdated(new Date().toLocaleTimeString());
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 md:mb-10 text-center"
                >
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
                        Enrollment Overview
                    </h1>
                    <p className="text-gray-600">
                        Track your class enrollment statistics
                    </p>
                    <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                        <span>Last updated: {lastUpdated}</span>
                        <button 
                            onClick={handleRefresh}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            <FiRefreshCw className={`inline ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-10">
                    {/* Total Enrolled Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm md:text-base font-medium text-gray-700 mb-1">
                                    Total Enrolled
                                </h3>
                                {loading ? (
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                ) : (
                                    <div className="text-2xl md:text-4xl font-bold text-indigo-600">
                                        {totalEnrolled}
                                    </div>
                                )}
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                                <FaUsers className="text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Enrollment Rate Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm md:text-base font-medium text-gray-700 mb-1">
                                    Enrollment Rate
                                </h3>
                                {loading ? (
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                ) : (
                                    <div className="text-2xl md:text-4xl font-bold text-purple-600">
                                        {enrollmentPercentage}%
                                    </div>
                                )}
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                <FaChartLine className="text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Available Slots Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm md:text-base font-medium text-gray-700 mb-1">
                                    Available Slots
                                </h3>
                                {loading ? (
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                ) : (
                                    <div className="text-2xl md:text-4xl font-bold text-green-600">
                                        {availableSlots}
                                    </div>
                                )}
                            </div>
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <FaChair className="text-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Enrollment Progress Bars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-md md:shadow-lg overflow-hidden border border-gray-100 p-4 md:p-6"
                >
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">
                            Class Enrollment Details
                        </h2>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaInfoCircle className="mr-1" />
                            <span>Updated: {lastUpdated}</span>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-2.5 w-full bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 md:space-y-6">
                            {enrollmentData.map((course, index) => {
                                const percentage = Math.round((course.enrolled / course.capacity) * 100);
                                const isAlmostFull = percentage >= 80;
                                const isHalfFull = percentage >= 50;
                                
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="space-y-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium text-gray-800 text-sm md:text-base">
                                                {course.className}
                                            </h3>
                                            <span className={`text-xs md:text-sm font-medium ${
                                                isAlmostFull ? 'text-green-600' :
                                                isHalfFull ? 'text-blue-600' :
                                                'text-yellow-600'
                                            }`}>
                                                {course.enrolled}/{course.capacity} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.8 }}
                                                className={`h-full rounded-full ${
                                                    isAlmostFull ? 'bg-green-500' :
                                                    isHalfFull ? 'bg-blue-500' :
                                                    'bg-yellow-500'
                                                }`}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TotalEnrolled;