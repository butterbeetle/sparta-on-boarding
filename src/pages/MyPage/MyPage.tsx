import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const MyPage = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.auth.getUserInfo(),
  });
  console.log("DATA___", data);
  return <div>MyPage</div>;
};

export default MyPage;
