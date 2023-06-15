import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const AdminHome = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch: classRefetch } = useQuery(
    ["classes"],
    async () => {
      const res = await axiosSecure.get("/class");
      return res.data;
    }
  );

  const { data: instructors = [], refetch: instructorRefetch } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    }
  );

  const { data: student = [], refetch: studentRefetch } = useQuery(
    ["student"],
    async () => {
      const res = await axiosSecure.get("/users/student");
      return res.data;
    }
  );

  const totalClassLength = classes.length;
  const totalStudentLength = student.length;
  const totalInstructorLength = instructors.length;

  return (
    <div className='mx-auto'>
    <div className='mt-10'>
        <h2 className='text-5xl'>Welcome Back Admin,</h2>
    </div>
    <div className='mt-10 flex gap-4 justify-center'>
      <div className='bg-indigo-800 text-white p-10 rounded-3xl shadow-2xl text-center font-bold'>
      <div className='text-6xl mb-10'>{totalClassLength}</div>
      <div className='text-3xl'>Total Classes</div>
      </div>

      <div className='bg-indigo-800 text-white p-10 rounded-3xl shadow-2xl text-center font-bold'>
      <div className='text-6xl mb-10'>{totalInstructorLength}</div>
      <div className='text-3xl'>Total Instructor</div>
      </div>

      <div className='bg-indigo-800 text-white p-10 rounded-3xl shadow-2xl text-center font-bold'>
      <div className='text-6xl mb-10'>{totalStudentLength}</div>
      <div className='text-3xl'>Total Student</div>
      </div>
      
    </div>
    </div>
  );
};

export default AdminHome;
