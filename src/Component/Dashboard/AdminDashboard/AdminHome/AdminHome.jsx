import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminHome = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/class");
    return res.data;
  });

  const { data: instructors = [] } = useQuery(["instructors"], async () => {
    const res = await axiosSecure.get("/users/instructor");
    return res.data;
  });

  const { data: student = [] } = useQuery(["student"], async () => {
    const res = await axiosSecure.get("/users/student");
    return res.data;
  });

  const totalClassLength = classes.length;
  const totalStudentLength = student.length;
  const totalInstructorLength = instructors.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Welcome Back, <span className="text-indigo-600">Admin</span>
          </h1>
          <p className="text-lg text-gray-600">
            Dashboard Overview
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Classes Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
              <h3 className="text-xl font-semibold">Total Classes</h3>
            </div>
            <div className="p-6 text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-3">
                {totalClassLength}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500" 
                  style={{ width: `${Math.min(100, totalClassLength)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Instructors Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
              <h3 className="text-xl font-semibold">Total Instructors</h3>
            </div>
            <div className="p-6 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-3">
                {totalInstructorLength}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${Math.min(100, totalInstructorLength)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Students Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 text-white">
              <h3 className="text-xl font-semibold">Total Students</h3>
            </div>
            <div className="p-6 text-center">
              <div className="text-5xl font-bold text-green-600 mb-3">
                {totalStudentLength}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${Math.min(100, totalStudentLength / 10)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 text-white">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center py-8 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="ml-3">Activity logs will appear here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;