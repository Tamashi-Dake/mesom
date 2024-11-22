import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { toggleFollow } from "../services/userService";

export const useFollowUser = (userId, refetchSingle = false) => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: toggleFollow,
    onSuccess: (data) => {
      const { followers } = data;

      if (!refetchSingle) {
        queryClient.setQueryData(["suggestedUsers"], (existingUsers = []) => {
          const suggestedUsers = existingUsers.suggestedUsers;
          suggestedUsers.map((targetUser) => {
            if (targetUser._id === userId) {
              return { ...targetUser, followers: followers };
            }
            return targetUser;
          });
          // Invalid: Cannot read properties of undefined (reading 'map')?
          // return suggestedUsers.map((targetUser) => {
          //   if (targetUser._id === userId) {
          //     return { ...targetUser, followers: followers };
          //   }
          //   return targetUser;
          // });
        });
      }

      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return followMutation;
};
