import React from "react";

const ShowInstructor = ({ instructor }) => {
  console.log(instructor);
  const { email, name } = instructor;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-2xl p-6">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="p-5">
              <img
                src="https://i.ibb.co/vYZrbvM/x31xsp7q8-MP2.jpg"
                alt="Instructor Image"
                className="w-20 h-20 object-cover rounded-full"
              />
            </td>
            <td className="p-2">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <p className="text-gray-600">Instructor</p>
              <p className="text-gray-600">{email}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowInstructor;
