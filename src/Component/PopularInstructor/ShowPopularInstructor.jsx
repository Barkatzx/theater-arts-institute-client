import { motion } from "framer-motion";
import React from "react";
import { FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";

const ShowPopularInstructor = ({ instructor }) => {
  const { email, name, photoURL, role, expertise } = instructor;
  
  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img
          className="w-full h-60 object-cover"
          src={photoURL || "https://i.ibb.co/vYZrbvM/x31xsp7q8-MP2.jpg"}
          alt={name}
        />
        {role && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaChalkboardTeacher /> {role}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
        
        {expertise && (
          <div className="flex flex-wrap gap-2 mb-3">
            {expertise.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600">
          <FaEnvelope className="text-indigo-500" />
          <a 
            href={`mailto:${email}`} 
            className="text-sm hover:text-indigo-600 hover:underline transition-colors"
          >
            {email}
          </a>
        </div>

        {/* <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300">
          View Profile
        </button> */}
      </div>
    </motion.div>
  );
};

export default ShowPopularInstructor;