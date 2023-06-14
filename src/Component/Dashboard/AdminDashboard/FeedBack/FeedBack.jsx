import { data } from "autoprefixer";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


const Feedback = () => {
  const { id } = useParams();
  console.log(id);
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("https://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
  <h1 className="text-3xl font-bold mt-8">Write Your Feedback</h1>
  <div className="relative flex mt-5">
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <textarea
        {...register("textarea", { required: true })}
        className="border border-gray-300 rounded-l-lg py-2 px-4 block w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your text"
        rows={4}
      ></textarea>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-r-lg ml-1">
        Send
      </button>
    </form>
  </div>
</div>

  );
};

export default Feedback;
