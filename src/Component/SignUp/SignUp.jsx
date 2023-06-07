import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className=" bg-white p-10 shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-bold mb-5 text-center">Registration</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="name" className=" text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className=" text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className=" text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className=" text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="photoURL" className=" text-gray-700 font-bold mb-2">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your photo URL"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-indigo-600 transition-colors w-full mb-4"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 w-16"></div>
            <span className="text-gray-500 mx-2">Or sign up with</span>
            <div className="border-t border-gray-300 w-16"></div>
          </div>
          <button
            type="button"
            className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 transition-colors w-full mt-4 flex items-center justify-center rounded-lg"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign Up with Google
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login"><span className='text-indigo-800'>Log in</span> </Link> 
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
