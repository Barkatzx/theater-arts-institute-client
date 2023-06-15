import React from "react";
import Title from "../Title/Title";

const Testimonial = () => {
  return (

    <div className="mx-auto container mt-10">
    <Title
          heading={"Our Happy Clients"}
        ></Title>
        <div className="md:flex gap-6">
        <div className="mx-auto bg-slate-100 rounded-2xl overflow-hidden shadow-2xl mt-5 p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
        <h3 className="text-xl font-bold text-center mt-4">Jesica Lenin</h3>
        <p className="text-gray-600 text-center">Arnolds</p>
        <p className="text-gray-800 mt-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          placerat posuere nibh, at commodo nulla consectetur a. Nullam dictum
          sapien et nisi efficitur sagittis."
        </p>
      </div>
      <div className="p-4 mx-auto bg-slate-100 rounded-2xl overflow-hidden shadow-2xl mt-5">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
        <h3 className="text-xl font-bold text-center mt-4">Jesica Lenin</h3>
        <p className="text-gray-600 text-center">Arnolds</p>
        <p className="text-gray-800 mt-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          placerat posuere nibh, at commodo nulla consectetur a. Nullam dictum
          sapien et nisi efficitur sagittis."
        </p>
      </div>
      <div className="p-4 mx-auto bg-slate-100 rounded-2xl overflow-hidden shadow-2xl mt-5">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
        <h3 className="text-xl font-bold text-center mt-4">Jesica Lenin</h3>
        <p className="text-gray-600 text-center">Arnolds</p>
        <p className="text-gray-800 mt-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          placerat posuere nibh, at commodo nulla consectetur a. Nullam dictum
          sapien et nisi efficitur sagittis."
        </p>
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
