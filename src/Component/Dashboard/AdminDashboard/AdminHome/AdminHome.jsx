import { motion } from 'framer-motion';
import React from 'react';
import { FaBook, FaChalkboardTeacher, FaChartLine, FaHistory, FaUserGraduate } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminHome = () => {
  const [axiosSecure] = useAxiosSecure();
  const [lastUpdated, setLastUpdated] = React.useState(new Date().toLocaleTimeString());

  const { data: classes = [], isLoading: classesLoading, refetch: refetchClasses } = useQuery(
    ["classes"],
    async () => {
      const res = await axiosSecure.get("/class");
      return res.data;
    }
  );

  const { data: instructors = [], isLoading: instructorsLoading, refetch: refetchInstructors } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    }
  );

  const { data: students = [], isLoading: studentsLoading, refetch: refetchStudents } = useQuery(
    ["students"],
    async () => {
      const res = await axiosSecure.get("/users/student");
      return res.data;
    }
  );

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString());
    refetchClasses();
    refetchInstructors();
    refetchStudents();
  };

  // Calculate statistics
  const totalClasses = classes.length;
  const totalInstructors = instructors.length;
  const totalStudents = students.length;
  const approvalRate = totalClasses > 0 
    ? Math.round((classes.filter(c => c.status === 'approved').length / totalClasses) * 100) 
    : 0;

  if (classesLoading || instructorsLoading || studentsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className='loading loading-spinner'></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="text-indigo-600">Admin</span>
          </h1>
          <p className="text-gray-600 mb-2">Dashboard Overview</p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <span>Last updated: {lastUpdated}</span>
            <button 
              onClick={handleRefresh}
              className="ml-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <FiRefreshCw className="inline" />
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {/* Classes Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Total Classes</h3>
              <FaBook className="text-xl" />
            </div>
            <div className="p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                {totalClasses}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaChartLine className="mr-1 text-indigo-400" />
                <span>{approvalRate}% approval rate</span>
              </div>
            </div>
          </motion.div>

          {/* Instructors Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Instructors</h3>
              <FaChalkboardTeacher className="text-xl" />
            </div>
            <div className="p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {totalInstructors}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Active: {instructors.filter(i => i.status === 'active').length}</span>
              </div>
            </div>
          </motion.div>

          {/* Students Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Students</h3>
              <FaUserGraduate className="text-xl" />
            </div>
            <div className="p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {totalStudents}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Enrolled: {classes.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0)}</span>
              </div>
            </div>
          </motion.div>

          {/* Approval Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pending Approvals</h3>
              <FaHistory className="text-xl" />
            </div>
            <div className="p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
                {classes.filter(c => c.status === 'pending').length}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Requires your attention</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 text-white flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <FaHistory className="text-xl" />
          </div>
          <div className="p-4 md:p-6">
            {classes.slice(0, 3).map((classItem, index) => (
              <motion.div
                key={classItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center py-3 ${index !== classes.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  classItem.status === 'approved' ? 'bg-green-100 text-green-600' :
                  classItem.status === 'denied' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <FaBook className="text-sm" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{classItem.className}</h4>
                  <p className="text-sm text-gray-500">
                    {classItem.status === 'approved' ? 'Approved' : 
                     classItem.status === 'denied' ? 'Denied' : 'Pending'} • {new Date(classItem.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
            {classes.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No recent activity found</p>
              </div>
            )}
            {classes.length > 3 && (
              <div className="mt-4 text-center">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All Activity →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;