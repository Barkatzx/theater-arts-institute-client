import React from "react";

const ShowPopularClasses = ({ classes }) => {
  const { availabeSeats, classImage, className, instructorName, price } =
    classes;
  return (
    <div>
      <div className="card card-compact w-80 h-96 bg-slate-100 shadow-2xl">
  <figure><img src={classImage} alt="Class Image" /></figure>
  <div className="p-5">
    <h2 className="text-2xl font-bold"> Class Name: {className}</h2>
    <p className="text-xl font-semibold">Instructor: {instructorName}</p>
    <p className="text-lg font-semibold">Available Seats: {availabeSeats}</p>
    <p className="text-lg font-semibold">Price: ${price}</p>
    <div className="card-actions">
      <button onClick={() => {
                handleSelectButton(classes);
              }} className="btn btn-primary justify-center font-bold">Select</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default ShowPopularClasses;
