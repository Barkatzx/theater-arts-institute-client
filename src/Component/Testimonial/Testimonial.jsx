import React from "react";

const Testimonial = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
        <h3 className="text-xl font-bold text-center mt-4">Client Name</h3>
        <p className="text-gray-600 text-center">Company Name</p>
        <p className="text-gray-800 mt-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          placerat posuere nibh, at commodo nulla consectetur a. Nullam dictum
          sapien et nisi efficitur sagittis."
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
