import { FaTrashAlt, FaUserGraduate, FaUserShield } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUser = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery('users', async () => {
    const res = await axiosSecure.get('https://summer-camp-server-barkatzx.vercel.app/users');
    return res.data;
  });
  
  const isAdmin = true;

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
              position: 'top-end',
              icon: 'success',
              title: 'Update Admin Successfully',
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
              position: 'top-end',
              icon: 'success',
              title: 'Update Instructor Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
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
    <div className="w-full bg-slate-50 shadow-2xl mt-2 rounded-lg p-8">
      <h3 className="text-3xl font-semibold text-center mt-10">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-semibold text-lg">
          <thead className=' font-semibold text-lg'>
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
                        <FaUserGraduate/>
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
                        <FaUserShield />
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

export default ManageUser;
