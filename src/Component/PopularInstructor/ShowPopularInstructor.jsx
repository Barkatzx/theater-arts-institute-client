import React from "react";

const ShowPopularInstructor = ({ instructor }) => {
  const { email, name } = instructor;
  return (
    <div className="rounded-2xl shadow-2xl bg-slate-100">
      <figure>
      <img
      className="rounded-2xl w-full"
        src="https://i.ibb.co/vYZrbvM/x31xsp7q8-MP2.jpg"
        alt="Profile"
      />
      </figure>

      <div className="p-5">
        <div className="font-bold text-gray-800 text-2xl md:text-3xl mb-2">
          {" "}
          {name}
        </div>
        <p className="text-gray-700 text-sm">
          {" "}
          <span>{email}</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ShowPopularInstructor;
