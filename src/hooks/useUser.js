import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { toggleFollow } from "../services/userService";

export const useFollowUser = (userId) => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: toggleFollow,
    onSuccess: (data) => {
      const { followers } = data;

      Promise.all([
        queryClient.setQueryData(["suggestedUsers"], (existingUsers) => {
          return existingUsers.map((targetUser) => {
            if (targetUser._id === userId) {
              return { ...targetUser, followers: followers };
            }
            return targetUser;
          });
        }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return followMutation;
};
