import { motion } from "framer-motion";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Title from "../Title/Title";

const testimonials = [
  {
    name: "Jessica Lennon",
    role: "Arnold's Fitness",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The instructors transformed my acting skills completely. I landed my first major role just 3 months after joining!"
  },
  {
    name: "Michael Chen",
    role: "Broadway Productions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Best investment I've made in my career. The personalized coaching helped me break through my performance barriers."
  },
  {
    name: "Sarah Johnson",
    role: "Disney Studios",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The community and training here is unparalleled. I've grown more in six months than I did in three years at drama school."
  }
];

const Testimonial = () => {
  return (
    <section className="md:px-40 px-5 py-5 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <Title 
          heading="Our Happy Clients"
          subheading="Success Stories"
          // decorative={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden p-8 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-full">
                    <FaQuoteLeft className="text-xs" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-indigo-600 text-sm font-medium mb-4">{testimonial.role}</p>
                
                <div className="relative">
                  <FaQuoteLeft className="text-gray-200 text-3xl absolute -top-8 left-0" />
                  <p className="text-gray-600 italic relative z-10">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;