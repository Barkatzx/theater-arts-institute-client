import React from "react";
import { motion } from "framer-motion";
import usePayment from "../../../Hooks/usePayment";

const MyEnrolledClass = () => {
  const [payment] = usePayment();
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-8">My Enrolled Classes</h1>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 shadow-2xl md:m-1">
          <table className="table w-[950px] collapse border-collapse bg-gray-100 text-left text-sm text-gray-500">
            {/* head */}
            <thead className="text-center font-extrabold bg-indigo-800 text-white text-lg">
              <tr>
                <th scope="col" className="px-2 py-4 font-bold text-md text-white">
                  Sl:
                </th>
                <th scope="col" className="px-2 py-4 font-bold text-md text-white">
                  Class Name :
                </th>

                <th scope="col" className="px-2 py-4 font-bold text-md text-white">
                  Quantity
                </th>
                <th scope="col" className="px-2 py-4 font-bold text-md text-white">
                  Price
                </th>

                <th scope="col" className="px-2 py-4 font-bold text-md text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payment.map((classes, index) => (
                <tr className="text-center text-lg" key={classes._id}>
                  <td>{index + 1}</td>
                  <td>
                    {classes.className.map((name, nameIndex) => (
                      <li className="mt-2" key={nameIndex}>{name}</li>
                    ))}
                  </td>
                  <td>{classes.quantity}</td>
                  <td>${classes.price}</td>
                  <td className="text-indigo-800">{"Payment Success"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyEnrolledClass;
