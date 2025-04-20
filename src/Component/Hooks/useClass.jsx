import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../Provider/AuthProvider";


const useClass = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { refetch, data: classess = [] } = useQuery({
    queryKey: ["classes", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await fetch(
    `https://summer-camp-server-barkatzx.vercel.app/selectedClass?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      // console.log(classess);
      return res.json();
    },
  });
  return [classess, refetch];
};

export default useClass;
