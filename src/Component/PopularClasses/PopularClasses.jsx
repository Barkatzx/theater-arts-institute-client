import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "react-query";
import ShowPopularClasses from "./ShowPopularClasses";
import Title from "../Title/Title";

const PopularClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [approvedClass, setApprovedClass] = useState([]);

  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/class");
    return res.data;
  });

  useEffect(() => {
    const filter = classes.filter((classItem) => classItem.status === "approved");
    setApprovedClass(filter);
  }, [classes]);

  console.log(approvedClass);

  return (
    <div className="mt-6 container mx-auto">
      <Title heading={"Popular Classes"} />
      <div className="grid md:grid-cols-3 gap-4 px-5 py-5">
        {approvedClass.slice(0, 6).map((classItem) => (
          <ShowPopularClasses key={classItem._id} classes={classItem} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
