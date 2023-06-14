import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('access-token');

      if (!token) {
        console.error('Access token not found.');
        return;
      }

      const response = await axios.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedInstructors = response.data.filter(
        (user) => user.role === 'instructor'
      );
      setInstructors(fetchedInstructors);
    } catch (error) {
      console.error('Failed to fetch instructors:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Instructors</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">Image</th>
            <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">Name</th>
            <th className="py-3 px-6 bg-indigo-500 text-white font-semibold uppercase">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td className="py-4 px-6">
                <img
                  src={instructor.image}
                  alt="Instructor"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-4 px-6">{instructor.name}</td>
              <td className="py-4 px-6">{instructor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Instructor;
