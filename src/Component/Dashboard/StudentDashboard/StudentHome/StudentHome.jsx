import React from 'react';
import usePayment from '../../../Hooks/usePayment';

const StudentHome = () => {
    const [payment] = usePayment();
    return (
        <div>
            <div className='mt-10'>
        <h2 className='text-5xl'>Welcome Back,</h2>
    </div>
      <div className='bg-indigo-800 text-white p-10 rounded-3xl shadow-2xl text-center font-bold mt-4'>
      <div className='text-6xl mb-10'>{payment.length}</div>
      <div className='text-3xl'>Payment Times</div>
      </div>
        </div>
    );
};

export default StudentHome;