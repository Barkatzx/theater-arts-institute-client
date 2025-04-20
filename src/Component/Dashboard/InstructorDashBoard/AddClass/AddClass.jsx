import { motion } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaChair, FaChalkboardTeacher, FaDollarSign, FaEnvelope, FaUpload, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const img_token = import.meta.env.VITE_Image_token;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const img_url = `https://api.imgbb.com/1/upload?key=${img_token}`;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      
      const imgRes = await fetch(img_url, {
        method: "POST",
        body: formData,
      }).then(res => res.json());

      if (imgRes.success) {
        const newClass = {
          availabeSeats: parseInt(data.availabeSeats),
          classImage: imgRes.data.url,
          className: data.className,
          email: user?.email,
          date: new Date(),
          instructorName: user?.displayName,
          price: parseFloat(data.price),
          status: "pending",
        };

        const { data: classData } = await axiosSecure.post("/class", newClass);
        
        if (classData.insertedId) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Class Added Successfully!",
            text: "Your class is under review by admin",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add class. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-8 sm:py-10 text-center">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Add New Class
            </motion.h1>
            <motion.p 
              className="text-indigo-100 text-sm sm:text-base max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create an engaging learning experience for your students
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Class Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaChalkboardTeacher className="mr-2 text-indigo-500" />
                  Class Name
                </label>
                <input
                  {...register("className", { 
                    required: "Class name is required",
                    minLength: {
                      value: 3,
                      message: "Class name must be at least 3 characters"
                    }
                  })}
                  type="text"
                  placeholder="e.g. Acting Fundamentals"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm sm:text-base"
                />
                {errors.className && (
                  <p className="mt-1 text-sm text-red-600">{errors.className.message}</p>
                )}
              </div>

              {/* Instructor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaUser className="mr-2 text-indigo-500" />
                    Instructor Name
                  </label>
                  <input
                    {...register("instructorName")}
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaEnvelope className="mr-2 text-indigo-500" />
                    Instructor Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Class Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaChair className="mr-2 text-indigo-500" />
                    Available Seats
                  </label>
                  <input
                    {...register("availabeSeats", { 
                      required: "Seats are required",
                      min: { value: 1, message: "Minimum 1 seat" },
                      max: { value: 50, message: "Maximum 50 seats" }
                    })}
                    type="number"
                    placeholder="10"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm sm:text-base"
                  />
                  {errors.availabeSeats && (
                    <p className="mt-1 text-sm text-red-600">{errors.availabeSeats.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaDollarSign className="mr-2 text-indigo-500" />
                    Price ($)
                  </label>
                  <input
                    {...register("price", { 
                      required: "Price is required",
                      min: { value: 1, message: "Minimum $1" },
                      max: { value: 500, message: "Maximum $500" }
                    })}
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm sm:text-base"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Image
                </label>
                <div className="mt-1">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-gray-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-xs sm:text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input
                      {...register("image", { 
                        required: "Image is required",
                        validate: {
                          lessThan5MB: files => files[0]?.size < 5000000 || "Max 5MB",
                          acceptedFormats: files => 
                            ['image/jpeg', 'image/png'].includes(files[0]?.type) || 
                            "Only JPEG/PNG allowed"
                        }
                      })}
                      type="file"
                      className="hidden"
                      accept="image/jpeg, image/png"
                    />
                  </label>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div 
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Add Class"
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddClass;