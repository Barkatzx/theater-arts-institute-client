import { motion } from "framer-motion";
import React from "react";
import { FaChalkboardTeacher, FaEnvelope, FaUserTie } from "react-icons/fa";

const ShowInstructor = ({ instructor }) => {
  const { email, name, photoURL, role, expertise } = instructor;

  return (
    <motion.div 
      className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          {/* Instructor Image */}
          <div className="relative">
            <img
              src={photoURL || "https://res.cloudinary.com/dnzvylpzu/image/upload/v1745131103/profile_pictures/cbksj2ttimqajkjlffdi.png"}
              alt={name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-indigo-100"
            />
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full">
              <FaChalkboardTeacher className="text-xs sm:text-sm" />
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                  <FaUserTie className="text-indigo-500 mr-2" />
                  {name}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-1 flex items-center">
                  <FaEnvelope className="text-indigo-400 mr-2" />
                  {email}
                </p>
              </div>

              {role && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800">
                  {role}
                </span>
              )}
            </div>

            {/* Expertise Tags */}
            {expertise?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {expertise.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
                {expertise.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    +{expertise.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowInstructor;