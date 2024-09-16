import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export default useCurrentUser;
