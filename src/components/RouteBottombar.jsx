import { useMemo } from "react";
import { routes as staticRoutes } from "./shared/config";

import RouteItem from "./shared/RouteItem";
import useCurrentUser from "../hooks/useCurrentUser";

const RouteBottomBar = () => {
  const currentUser = useCurrentUser();

  const routes = useMemo(() => {
    if (!currentUser) return staticRoutes;

    // Nếu có user, thêm username vào route profile
    return staticRoutes.map((route) => {
      if (route.path === "/profile") {
        return {
          ...route,
          path: `/profile/${currentUser.data.username}`,
        };
      }
      return route;
    });
  }, [currentUser]);

  return (
    <div className="block xm:hidden col-span-4 border-[1px] border-neutral-200">
      <div className="flex justify-between sm:space-y-1 sm:m-1 [&>*:nth-child(6)]:hidden">
        {routes.map((route) => (
          <RouteItem
            key={route.path}
            name={route.name}
            path={route.path}
            icon={route.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteBottomBar;
