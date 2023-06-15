import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const InstructorHome = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
    return res.data;
  });
  const totalClassLength = classes.length;
  
    return (
        <div className='mx-auto'>
            <div className='mt-10'>
        <h2 className='text-5xl'>Welcome Back Instructor,</h2>
    </div>
            <div className='bg-indigo-800 text-white p-10 rounded-3xl shadow-2xl text-center font-bold mt-5'>
      <div className='text-6xl mb-10'>{totalClassLength}</div>
      <div className='text-3xl'>My Classes</div>
      </div>
        </div>
    );
};

export default InstructorHome;