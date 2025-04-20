import { motion } from "framer-motion";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { FaChalkboardTeacher, FaCommentAlt, FaEdit, FaRegSadTear, FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  
  const { data: classes = [], isLoading, refetch } = useQuery(
    ["instructorClasses", user?.email],
    async () => {
      const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
      return res.data;
    },
    { enabled: !!user?.email }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="loading loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <Helmet>
        <title>Theater Arts Institute | My Classes</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-6 md:mb-8 text-center">
          <motion.h1 
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            My Teaching Classes
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white px-4 py-2 md:px-6 md:py-2 rounded-full shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-center">
              <FaChalkboardTeacher className="text-indigo-600 mr-2" />
              <span className="text-gray-600 mr-2">Total Classes:</span>
              <span className="text-lg md:text-xl font-bold text-indigo-600">
                {classes.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Classes Table */}
        {classes.length > 0 ? (
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
                          Class
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Enrolled
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Feedback
                        </th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {classes.map((classItem) => (
                        <motion.tr 
                          key={classItem._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={classItem.classImage} alt={classItem.className} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{classItem.className}</div>
                                <div className="text-sm text-gray-500">${classItem.price}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              classItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                              classItem.status === 'denied' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {classItem.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            <div className="flex items-center justify-center">
                              <FaUsers className="text-indigo-500 mr-1" />
                              {classItem.totalEnrolled || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                            <div className="flex items-center">
                              <FaCommentAlt className="text-indigo-500 mr-2 flex-shrink-0" />
                              <span className="truncate">{classItem.feedback || "No feedback"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center"
                            >
                              <FaEdit className="mr-2" />
                              Update
                            </motion.button>
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
              {classes.map((classItem) => (
                <motion.div
                  key={classItem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <img 
                        className="h-16 w-16 rounded-lg object-cover mr-4"
                        src={classItem.classImage} 
                        alt={classItem.className} 
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{classItem.className}</h3>
                        <p className="text-sm text-gray-500">${classItem.price}</p>
                        
                        <div className="flex items-center mt-2">
                          <span className={`px-2 text-xs font-semibold rounded-full mr-2 ${
                            classItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                            classItem.status === 'denied' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {classItem.status}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <FaUsers className="mr-1 text-indigo-500" />
                            {classItem.totalEnrolled || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {classItem.feedback && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-start">
                          <FaCommentAlt className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{classItem.feedback}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center"
                      >
                        <FaEdit className="mr-2" />
                        Update Class
                      </motion.button>
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
            className="text-center py-12 bg-white rounded-xl shadow-sm"
          >
            <div className="mx-auto h-16 w-16 text-gray-400">
              <FaRegSadTear className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-500">No Classes Found</h3>
            <p className="mt-1 text-gray-400">You haven't created any classes yet</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              Create New Class
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyClasses;