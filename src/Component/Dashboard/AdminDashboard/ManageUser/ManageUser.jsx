import { motion } from 'framer-motion';
import { FaTrashAlt, FaUserGraduate, FaUserShield } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const isAdmin = true;

  const { data: users = [], refetch } = useQuery('users', async () => {
    const res = await axiosSecure.get('https://summer-camp-server-barkatzx.vercel.app/users');
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    if (isAdmin) {
      fetch(`https://summer-camp-server-barkatzx.vercel.app/users/admin/${user._id}`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${user.name} is now an Admin`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const handleMakeInstructor = (user) => {
    if (isAdmin) {
      fetch(`https://summer-camp-server-barkatzx.vercel.app/users/instructor/${user._id}`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${user.name} is now an Instructor`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(() => {
            refetch();
            Swal.fire(
              'Deleted!',
              `${user.name} has been deleted.`,
              'success'
            );
          })
          .catch(() => {
            Swal.fire(
              'Error!',
              'Failed to delete the user.',
              'error'
            );
          });
      }
    });
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Admin</span>;
      case 'instructor':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Instructor</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">Student</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Manage Users
          </h1>
          <div className="inline-block bg-white px-4 py-1 md:px-6 md:py-2 rounded-full shadow-sm border border-gray-200">
            <span className="text-sm md:text-base text-gray-600 mr-2">Total Users:</span>
            <span className="text-lg md:text-xl font-bold text-indigo-600">{users.length}</span>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.length > 0 ? (
            users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2">
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between space-x-2">
                  {user.role !== 'admin' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMakeAdmin(user)}
                      className="flex-1 py-2 rounded-md bg-purple-600 text-white flex items-center justify-center"
                    >
                      <FaUserShield className="mr-1" /> Make Admin
                    </motion.button>
                  )}
                  {user.role !== 'instructor' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMakeInstructor(user)}
                      className="flex-1 py-2 rounded-md bg-blue-600 text-white flex items-center justify-center"
                    >
                      <FaUserGraduate className="mr-1" /> Make Instructor
                    </motion.button>
                  )}
                  {isAdmin && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(user)}
                      className="flex-1 py-2 rounded-md bg-red-600 text-white flex items-center justify-center"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8 bg-white rounded-lg shadow-sm"
            >
              <div className="mx-auto h-16 w-16 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-500">No Users Found</h3>
              <p className="mt-1 text-sm text-gray-400">There are currently no users to manage</p>
            </motion.div>
          )}
        </div>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th> */}
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <motion.tr 
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name} <br /> {user.email}</div>
                            </div>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-end ">
                          {user.role !== 'admin' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMakeAdmin(user)}
                              className="px-3 py-1 rounded-md bg-purple-600 text-white text-xs hover:bg-purple-700 flex items-center"
                            >
                              <FaUserShield className="mr-1" /> Admin
                            </motion.button>
                          )}
                          {user.role !== 'instructor' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMakeInstructor(user)}
                              className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 flex items-center"
                            >
                              <FaUserGraduate className="mr-1" /> Instructor
                            </motion.button>
                          )}
                          {isAdmin && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(user)}
                              className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700 flex items-center"
                            >
                              <FaTrashAlt className="mr-1" /> Delete
                            </motion.button>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <div className="mx-auto h-16 w-16 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-500">No Users Found</h3>
                        <p className="mt-1 text-sm text-gray-400">There are currently no users to manage</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUser;