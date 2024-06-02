import { routes } from "./shared/config";

import RouteItem from "./shared/RouteItem";

const RouteBottomBar = () => {
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
