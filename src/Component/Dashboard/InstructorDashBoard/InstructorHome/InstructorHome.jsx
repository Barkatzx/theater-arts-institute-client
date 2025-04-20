import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaClock, FaEnvelope, FaUsers } from 'react-icons/fa';
import { useQuery } from 'react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const InstructorHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    
    const { data: classes = [], isLoading: classesLoading } = useQuery(
        ["instructorClasses", user?.email],
        async () => {
            const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
            return res.data;
        },
        { enabled: !!user?.email }
    );

    // Calculate statistics
    const totalClasses = classes.length;
    const totalStudents = classes.reduce((sum, cls) => sum + (cls.enrolledStudents?.length || 0), 0);
    const pendingApprovals = classes.filter(cls => cls.status === 'pending').length;
    const totalMessages = classes.reduce((sum, cls) => sum + (cls.unreadMessages || 0), 0);

    if (classesLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="loader loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
                    Welcome Back, Instructor
                </h1>
                <p className="text-base md:text-lg text-gray-600">
                    Your teaching dashboard overview
                </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden border border-gray-100 mb-8"
            >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5 md:p-1">
                    <div className="bg-white rounded-xl p-6 md:p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                                <FaChalkboardTeacher className="text-2xl md:text-3xl" />
                            </div>
                        </div>
                        <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-3 md:mb-4">
                            {totalClasses}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 md:mb-2">
                            Your Classes
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            {totalClasses === 0 ? 'No classes created yet' : 
                             totalClasses === 1 ? '1 active class' : 
                             `${totalClasses} active classes`}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="max-w-4xl mx-auto mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100 text-center"
                >
                    <div className="text-indigo-600 text-2xl md:text-3xl font-bold mb-2 flex justify-center">
                        <div className="bg-indigo-100 p-2 rounded-full mr-2">
                            <FaUsers className="text-lg md:text-xl" />
                        </div>
                        {totalStudents}
                    </div>
                    <h4 className="text-gray-700 font-medium text-sm md:text-base">Students Enrolled</h4>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100 text-center"
                >
                    <div className="text-purple-600 text-2xl md:text-3xl font-bold mb-2 flex justify-center">
                        <div className="bg-purple-100 p-2 rounded-full mr-2">
                            <FaClock className="text-lg md:text-xl" />
                        </div>
                        {pendingApprovals}
                    </div>
                    <h4 className="text-gray-700 font-medium text-sm md:text-base">Pending Approvals</h4>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100 text-center"
                >
                    <div className="text-indigo-400 text-2xl md:text-3xl font-bold mb-2 flex justify-center">
                        <div className="bg-indigo-50 p-2 rounded-full mr-2">
                            <FaEnvelope className="text-lg md:text-xl" />
                        </div>
                        {totalMessages}
                    </div>
                    <h4 className="text-gray-700 font-medium text-sm md:text-base">New Messages</h4>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm md:shadow-md border border-gray-100 text-center col-span-2 md:col-span-1"
                >
                    <div className="text-green-600 text-2xl md:text-3xl font-bold mb-2">
                        {classes.filter(c => c.status === 'approved').length}
                    </div>
                    <h4 className="text-gray-700 font-medium text-sm md:text-base">Approved Classes</h4>
                </motion.div>
            </div>

            {/* Call to Action */}
            {totalClasses === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8 md:mt-12"
                >
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors">
                        Create Your First Class
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default InstructorHome;