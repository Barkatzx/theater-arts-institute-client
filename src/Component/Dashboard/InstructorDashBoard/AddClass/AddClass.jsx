import { motion } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const img_token = import.meta.env.VITE_Image_token;

const AddClass = () => {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const img_url = `https://api.imgbb.com/1/upload?key=${img_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgUrl = imgRes.data.url;
          const {
            availabeSeats,
            className,
            email,
            instructorName,
            price,
          } = data;
          const newClass = {
            availabeSeats: parseInt(availabeSeats),
            classImage: imgUrl,
            className,
            email,
            date: new Date(),
            instructorName,
            price: parseFloat(price),
          };
          axiosSecure.post("/class", newClass).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Class is successfully Added.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Add Your Class
            </h1>
            <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
              Welcome to Theater Arts Institute. Share your expertise and create 
              an engaging learning experience for students.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Class Name
                  </label>
                  <input
                    {...register("className", { required: true })}
                    type="text"
                    placeholder="Enter class name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  />
                  {errors.className && (
                    <p className="mt-1 text-sm text-red-600">Class name is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Instructor Name
                  </label>
                  <input
                    {...register("instructorName", { required: true })}
                    type="text"
                    placeholder="Instructor name"
                    defaultValue={user?.displayName}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Available Seats
                  </label>
                  <input
                    {...register("availabeSeats", { required: true })}
                    type="number"
                    placeholder="Number of seats"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  />
                  {errors.availabeSeats && (
                    <p className="mt-1 text-sm text-red-600">Seat count is required</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Instructor Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Instructor email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price ($)
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    placeholder="Class price"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">Price is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Class Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input 
                        {...register("image", { required: true })} 
                        type="file" 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">Image is required</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="mt-8"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Add Class
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddClass;