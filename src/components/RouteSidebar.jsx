import { BiSolidLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

import { routes as staticRoutes } from "./shared/config";
import RouteItem from "./shared/RouteItem";
import RouteCreatePost from "./shared/RouteCreatePost";
import Button from "./shared/Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const RouteSidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  // Dùng useMemo để tạo lại routes khi user thay đổi
  const routes = useMemo(() => {
    if (!currentUser) return staticRoutes;

    // Nếu có user, thêm username vào route profile
    return staticRoutes.map((route) => {
      if (route.path === "/profile") {
        return {
          ...route,
          path: `/profile/${currentUser.data?.username}`,
        };
      }
      return route;
    });
  }, [currentUser]);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/login");
  };

  return (
    <>
      <div className=" h-screen col-span-1 lg:p-2 xl:p-4 hidden xm:block sticky top-0">
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
            {/*TODO: Chuyển button sang RouteItem hoặc custom button logout */}

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
