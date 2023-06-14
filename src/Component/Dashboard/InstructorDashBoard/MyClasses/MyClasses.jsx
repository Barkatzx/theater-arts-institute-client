import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const MyClasses = () => {
  const [classs, setClasss] = useState("");
  const { id } = useParams();

  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery(["class"], async () => {
    const res = await axiosSecure.get(`/class/instructor/${user?.email}`);
    return res.data;
  });
  return (
    <div className="w-full">
      <Helmet>
        <title>Theater Arts Institute || My Classes</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mt-5">Total Classes: {classes.length}</h1>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="overflow-x-auto  overflow-hidden rounded-lg border border-gray-200 shadow-md md:m-1">
          <table className="table w-full collapse  border-collapse bg-gray-100 text-left text-sm text-gray-500">
            {/* head */}
            <thead className="text-center font-extrabold bg-indigo-800 text-white">
              <tr>
                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Class Image:
                </th>
                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Class Name :
                </th>
                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Total Enrolled
                </th>
                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Feedback
                </th>

                <th
                  scope="col"
                  className=" px-2  py-4 font-bold text-lg text-white"
                >
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classes, index) => (
                <tr className="text-center text-md" key={classes._id}>
                  <td>
                    <img
                      className="h-11 rounded-full w-12"
                      src={classes.classImage}
                      alt=""
                    />
                  </td>
                  <td className="text-lg font-semibold">{classes.className}</td>
                  <td className="text-lg font-semibold">{classes?.status || "pending"}</td>
                  <td>{classes?.totalEnrolled}</td>
                  <td>{classes?.feedback}</td>

                  <td className="">
                    <button className="px-4 rounded-lg py-2 bg-green-600 text-white text-lg font-bold">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyClasses;
