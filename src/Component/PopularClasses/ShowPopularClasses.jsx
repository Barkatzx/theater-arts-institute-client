import { useContext } from "react";
import { FaBook, FaChair, FaDollarSign, FaUserTie } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ShowPopularClasses = ({ classes }) => {
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
    _id 
  } = classes;

  const handleSelectButton = () => {
    const classDetails = {
      ClassId: _id,
      availabeSeats,
      classImage,
      instructorName,
      price,
      className,
      email: user?.email,
    };

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to select classes",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3B82F6",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        backdrop: `
          rgba(0,0,0,0.7)
          url("https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif")
          center top
          no-repeat
        `
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    if (availabeSeats <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Seats Available",
        text: "This class is currently full. Please check back later.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    axiosSecure.post("/selectClass", classDetails)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Class Selected Successfully!",
            text: `${className} has been added to your list.`,
            showConfirmButton: false,
            timer: 2000,
            background: "#F3F4F6",
          });
        }
      })
      .catch((error) => {
        console.error("Error selecting class:", error);
        Swal.fire({
          icon: "error",
          title: "Selection Failed",
          text: error.response?.data?.message || "Failed to select class. Please try again.",
          confirmButtonColor: "#3B82F6",
        });
      });
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" 
          src={classImage} 
          alt={className} 
        />
        {availabeSeats <= 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            FULL
          </div>
        )}
      </div>
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-indigo-700 flex items-center gap-2">
          <FaBook className="text-indigo-500" /> {className}
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-700 flex items-center gap-2">
            <FaUserTie className="text-indigo-400" /> 
            <span className="font-medium">Instructor:</span> {instructorName}
          </p>
          
          <p className="text-gray-700 flex items-center gap-2">
            <FaChair className={availabeSeats <= 0 ? "text-red-400" : "text-green-400"} /> 
            <span className="font-medium">Seats:</span> 
            <span className={availabeSeats <= 0 ? "text-red-500 font-bold" : "text-gray-700"}>
              {availabeSeats} {availabeSeats <= 0 ? "(Full)" : "available"}
            </span>
          </p>
          
          <p className="text-gray-700 flex items-center gap-2">
            <FaDollarSign className="text-yellow-500" /> 
            <span className="font-medium">Price:</span> ${price.toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="px-6 pt-2 pb-4">
        <button
          onClick={handleSelectButton}
          disabled={availabeSeats <= 0}
          className={`w-full py-2 px-4 rounded-lg font-bold text-white transition-colors duration-300 ${
            availabeSeats <= 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {availabeSeats <= 0 ? "Class Full" : "Select Class"}
        </button>
      </div>
    </div>
  );
};

export default ShowPopularClasses;