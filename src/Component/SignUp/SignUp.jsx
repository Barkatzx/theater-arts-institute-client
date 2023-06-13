import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, googleSignIn, updateUserProfile, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegisterwithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        reset();
        navigate(from, { replace: true });
      })
      .catch(console.error);
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
  
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = { name: data.name, email: data.email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(() => {
                    navigate("/");
                  });
                }
              })
              .catch((error) => {
                console.error('Failed to save user:', error);
                Swal.fire({
                  icon: "error",
                  title: "User Creation Error",
                  text: "Failed to save user. Please try again later.",
                });
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "User Creation Error",
          text: error.message,
        });
      });
  };
  

  return (
    <div className="flex flex-col items-center mt-10">
      <Helmet>
        <title>Registration | Theater Art Institute</title>
      </Helmet>
      <div className=" bg-white p-10 shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-bold mb-5 text-center">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="name" className=" text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className=" text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className=" text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="photoURL"
              className=" text-gray-700 font-bold mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              id="photoURL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your photo URL"
              required
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-indigo-600 transition-colors w-full mb-4"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 w-16"></div>
            <span className="text-gray-500 mx-2">Or sign up with</span>
            <div className="border-t border-gray-300 w-16"></div>
          </div>
          <button
            type="button"
            onClick={handleRegisterwithGoogle}
            className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 transition-colors w-full mt-4 flex items-center justify-center rounded-lg"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign Up with Google
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-indigo-800">Log in</span>{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
