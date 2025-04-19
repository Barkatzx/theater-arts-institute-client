import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyClasses = () => {
  const [classs, setClasss] = useState("");
  const { id } = useParams();

  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
    return res.data;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <Helmet>
        <title>Theater Arts Institute || My Classes</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Teaching Classes
          </h1>
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200">
            <span className="text-gray-600 mr-2">Total Classes:</span>
            <span className="text-xl font-bold text-indigo-600">{classes.length}</span>
          </div>
        </div>

        {/* Classes Table */}
        {classes.length > 0 ? (
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
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          classItem.status === 'approved' ? 'bg-green-100 text-green-800' :
                          classItem.status === 'denied' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {classItem?.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {classItem?.totalEnrolled || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {classItem?.feedback || "No feedback yet"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
                        >
                          Update
                        </motion.button>
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
            <h3 className="mt-4 text-lg font-medium text-gray-500">No Classes Found</h3>
            <p className="mt-1 text-gray-400">You haven't created any classes yet</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyClasses;