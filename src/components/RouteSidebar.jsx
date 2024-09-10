import { BiSolidLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

import usePostData from "../../hooks/usePostData";
import { routes } from "./shared/config";
import RouteItem from "./shared/RouteItem";
import RouteCreatePost from "./shared/RouteCreatePost";
import Button from "./shared/Button";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

const RouteSidebar = () => {
  const queryClient = useQueryClient();
  // TODO: ui doesn't update when user logs out/ logs in
  const { data: currentUser } = useCurrentUser();

  const logoutMutation = usePostData({
    onSuccess: (response) => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries("authUser");
    },
    onError: (error) => {
      toast.error("An error occurred while logging out");
      console.error("An error occurred while logging out:", error);
    },
  });

  const handleLogout = async () => {
    try {
      logoutMutation.mutate({
        url: "/auth/logout",
      });
      console.log("Current user:", currentUser);
    } catch (error) {
      toast.error("Logout failed", error);
    }
  };
  return (
    // TODO: Add Side bar for mobile
    <>
      <div className="col-span-1 h-full lg:p-2 xl:p-4 hidden xm:block">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col space-y-4 m-2">
            {routes.map((route) => (
              <RouteItem
                key={route.path}
                name={route.name}
                path={route.path}
                icon={route.icon}
              />
            ))}
            <RouteCreatePost />
          </div>
          <div className="space-y-4 m-2">
            <Button
              name="Logout"
              // if the user is not logged in, hide the logout button
              classNames={
                currentUser
                  ? "flex items-center justify-center w-full rounded-lg p-2 bg-neutral-100 text-neutral-600"
                  : "hidden"
              }
              onClick={handleLogout}
              label={
                <>
                  <BiSolidLogOut size={24} color="black" /> Logout
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteSidebar;
