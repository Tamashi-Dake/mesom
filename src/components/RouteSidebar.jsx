import { routes } from "./shared/config";

import RouteItem from "./shared/RouteItem";
import { BiSolidLogOut } from "react-icons/bi";
import RouteCreatePost from "./shared/RouteCreatePost";

const RouteSidebar = () => {
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
            <RouteItem
              name="Logout"
              path="/logout"
              icon={<BiSolidLogOut size={24} color="black" />}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteSidebar;
