import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-lg font-semibold">Website Name</span>
          </div>
          <div className="flex items-center">
            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/instructors" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Instructors</a>
            <a href="/classes" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Classes</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <img src="user-profile-picture.jpg" alt="User Profile" className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
