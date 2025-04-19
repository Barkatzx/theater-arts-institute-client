import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const InstructorHome = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [] } = useQuery(["class"], async () => {
        const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
        return res.data;
    });
    const totalClassLength = classes.length;
  
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Welcome Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Welcome Back, Instructor
                </h1>
                <p className="text-lg text-gray-600">
                    Your teaching dashboard overview
                </p>
            </div>

            {/* Stats Card */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1">
                    <div className="bg-white rounded-xl p-8 text-center">
                        <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
                            {totalClassLength}
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            Your Classes
                        </h3>
                        <p className="text-gray-500">
                            {totalClassLength === 0 ? 'No classes created yet' : 
                             totalClassLength === 1 ? '1 active class' : 
                             `${totalClassLength} active classes`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats (if classes exist) */}
            {totalClassLength > 0 && (
                <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <div className="text-indigo-600 text-3xl font-bold mb-2">0</div>
                        <h4 className="text-gray-700 font-medium">Students Enrolled</h4>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <div className="text-purple-600 text-3xl font-bold mb-2">0</div>
                        <h4 className="text-gray-700 font-medium">Pending Approvals</h4>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                        <div className="text-indigo-400 text-3xl font-bold mb-2">0</div>
                        <h4 className="text-gray-700 font-medium">New Messages</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorHome;