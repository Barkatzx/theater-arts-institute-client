import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const ShowClasses = (classes) => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { availabeSeats, classImage, className, instructorName, price, _id } =
    classes.classes;
  const handleSelectButton = (classes) => {
    const classDetails = {
      ClassId: _id,
      availabeSeats,
      classImage,
      instructorName,
      price,
      className,
      email: user.email,
    };
    if (user && user.email) {
      axiosSecure.post("/selectClass", classDetails).then((data) => {
        console.log(data);
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
    <div className="card card-compact w-96 bg-base-100 shadow-xl text-center">
  <figure><img src={classImage} alt="Shoes" /></figure>
  <div className="card-body">
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
  );
};

export default ShowClasses;
