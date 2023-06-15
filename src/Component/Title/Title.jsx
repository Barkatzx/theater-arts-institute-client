import React from "react";

const Title = ({ heading }) => {
  return (
    <div className="text-center mx-auto">
      <h2 className="uppercase text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-indigo-800 to-indigo-200 py-2 mb-4">
        {heading}
      </h2>
      <hr className="border-indigo-800" />
    </div>
  );
};

export default Title;
