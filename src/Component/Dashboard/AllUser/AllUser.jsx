import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AllUser = () => {
  const [axiosSecure] = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState('');

  const queryClient = new QueryClient();

  const { data: users = [], refetch } = useQuery(
    'users',
    async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
    {
      queryClient,
    }
  );

  const roleMutation = useMutation(
    (user) => {
      const role = selectedRole.toLowerCase();
      return axiosSecure.patch(`/users/role/${user._id}/${role}`);
    },
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Failed to update the user role.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    }
  );

  const isAdmin = true; // Replace this with your logic to determine if the current user is an admin

  const handleMakeAdmin = (user) => {
    setSelectedRole('admin');
    roleMutation.mutate(user);
  };

  const handleDelete = (user) => {
    axiosSecure
      .delete(`/users/${user._id}`)
      .then(() => {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Failed to delete the user.',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      'admin'
                    ) : (
                      <div>
                        {user.role === 'instructor' ? (
                          'instructor'
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className={`btn btn-ghost bg-orange-600 text-white ${
                              isAdmin ? '' : 'hidden'
                            }`}
                          >
                            <FaUserShield />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => handleDelete(user)}
                        className="btn btn-ghost bg-red-600 text-white"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
// const App = () => {
//   const queryClient = new QueryClient();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="container mx-auto">
//         <AllUsers />
//       </div>
//     </QueryClientProvider>
//   );
// };

// export default App;
