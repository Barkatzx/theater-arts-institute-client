import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Feedback = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Include the class ID in the feedback data
    const feedbackData = {
      ...data,
      classId: id,
      date: new Date().toISOString()
    };

    fetch("https://summer-camp-server-barkatzx.vercel.app/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Feedback Submitted Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          reset();
        }
      })
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to Submit Feedback',
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
          >
            Share Your Feedback
          </motion.h1>
          <p className="text-gray-600">
            Your opinion helps us improve our classes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              {...register("feedback", { 
                required: "Feedback is required",
                minLength: {
                  value: 10,
                  message: "Feedback must be at least 10 characters"
                },
                maxLength: {
                  value: 500,
                  message: "Feedback cannot exceed 500 characters"
                }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${errors.feedback ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="What did you think about the class? What could be improved?"
              rows={6}
            />
            {errors.feedback && (
              <p className="mt-1 text-sm text-red-600">{errors.feedback.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                id="rating"
                {...register("rating", { required: "Please select a rating" })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.rating ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select a rating</option>
                <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (Very Good)</option>
                <option value="3">⭐⭐⭐ (Good)</option>
                <option value="2">⭐⭐ (Fair)</option>
                <option value="1">⭐ (Poor)</option>
              </select>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Submit Feedback
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Feedback;