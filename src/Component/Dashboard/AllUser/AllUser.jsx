import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { useQuery, useMutation } from 'react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { FcVoicePresentation } from 'react-icons/fc';

const AllUser = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery('users', async () => {
    const res = await axiosSecure.get('http://localhost:5000/users');
    return res.data;
  });
  
  const isAdmin = true;

  const handleMakeAdmin = (user) => {
    if (isAdmin) {
      fetch(`http://localhost:5000/users/admin/${user._id}`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            refetch();
            toast.success(`${user.name} is an admin successfully`);
          }
        });
    }
  };

  const handleMakeInstructor = (user) => {
    if (isAdmin) {
      fetch(`http://localhost:5000/users/instructor/${user._id}`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            refetch();
            toast.success(`${user.name} is an instructor successfully`);
          }
        });
    }
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
      <h3 className="text-3xl font-semibold">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Instructor</th>
              <th>Delete</th>
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
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn text-white bg-[#fa538d] btn-ghost"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === 'instructor' ? (
                      'instructor'
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn text-white bg-[#4db5ff] btn-ghost"
                      >
                        <FcVoicePresentation />
                      </button>
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
