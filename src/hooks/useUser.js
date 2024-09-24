import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { toggleFollow } from "../services/userService";

export const useFollowUser = (user) => {
  const queryClient = useQueryClient();

  const followMutate = useMutation({
    mutationFn: toggleFollow,
    onSuccess: (data) => {
      const { followers } = data;

      Promise.all([
        queryClient.setQueryData(["suggestedUsers"], (oldData) => {
          return oldData.map((suggestedUser) => {
            if (suggestedUser._id === user._id) {
              return { ...suggestedUser, followers: followers };
            }
            return suggestedUser;
          });
        }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return followMutate;
};
