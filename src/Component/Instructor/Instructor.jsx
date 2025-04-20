import { useQuery } from "react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ShowInstructor from "./Showinstructor";

;
// import CommonBanner from "../../../Shared/CommonBanner/CommonBanner";

const Instructor = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: instructor = [], refetch } = useQuery(
    ["instructor"],
    async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    }
  );
  return (
    <div className="md:px-40 px-5 py-5">
      <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4">
        {instructor.map((instructor) => (
          <ShowInstructor
            key={instructor._id}
            instructor={instructor}
          ></ShowInstructor>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
