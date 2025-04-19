import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ShowClasses = (classes) => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    availabeSeats,
    classImage,
    className,
    instructorName,
    price,
    _id,
  } = classes.classes;

  const handleSelectButton = (classes) => {
    const classDetails = {
      ClassId: _id,
      availabeSeats,
      classImage,
      instructorName,
      price,
      className,
      email: user?.email,
    };

    if (user && user.email) {
      axiosSecure.post("/selectClass", classDetails).then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Class is Selected",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please Login Now",
        text: "Login First",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className=" bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Card Image with subtle overlay */}
      <div className="relative h-56 w-full">
        <img
          src={classImage}
          alt={className}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <span className="absolute top-4 right-4 bg-white text-indigo-800 text-sm font-bold px-2 py-1 rounded-full">
          ${price}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-bold">{className}</h2>
          <p className="text-indigo-800 text-sm">{instructorName}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-gray-700 text-sm">
              <span className="font-semibold">{availabeSeats}</span> seats left
            </span>
          </div>

          <button
            onClick={() => handleSelectButton(classes)}
            className="px-3 py-1 bg-indigo-800 hover:bg-indigo-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowClasses;