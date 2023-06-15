import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Title from "../Title/Title";
import ShowPopularInstructor from "./ShowPopularInstructor";

const PopularInstructor = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: instructor = [], refetch } = useQuery(
    ["instructor"],
    async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    }
  );
  return (
    <div>
      <div className="mt-5 container mx-auto">
        <Title
          heading={"Popular Instructor"}
        ></Title>
        <div className="grid md:grid-cols-3 px-2 md:px-28 py-4 gap-4">
          {instructor.slice(0, 6).map((instructor) => (
            <ShowPopularInstructor
              key={instructor._id}
              instructor={instructor}
            ></ShowPopularInstructor>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructor;
