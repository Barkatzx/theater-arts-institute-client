import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const queryClient = new QueryClient(); // Create a QueryClient instance

  const { data: users = [], refetch } = useQuery(
    ['users'],
    async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
    {
      queryClient, // Provide the QueryClient instance to useQuery
    }
  );

  useEffect(() => {
    const handleMakeAdmin = (user) => {
      fetch(`http://localhost:5000/users/admin/${user._id}`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    };

    const handleDelete = (user) => {
      // Add your delete logic here
    };

    // You can move other side effects or initializations here

    return () => {
      // Cleanup logic, if any
    };
  }, [axiosSecure, refetch]);

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      'admin'
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost bg-orange-600  text-white"
                      >
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
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

const App = () => {
  const queryClient = new QueryClient(); // Create a QueryClient instance

  return (
    <QueryClientProvider client={queryClient}>
      <AllUsers />
    </QueryClientProvider>
  );
};

export default App;
