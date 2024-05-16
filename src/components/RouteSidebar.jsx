import {
  BsBellFill,
  BsChatDotsFill,
  BsHouseFill,
  BsInfoCircleFill,
  BsPersonFill,
} from "react-icons/bs";
import { FaEarthAsia } from "react-icons/fa6";

import RouteItem from "./shared/RouteItem";
import { BiSolidLogOut } from "react-icons/bi";
import RouteCreatePost from "./shared/RouteCreatePost";

const RouteSidebar = () => {
  const routes = [
    { name: "Home", path: "/", icon: <BsHouseFill size={24} color="black" /> },
    {
      name: "Discovery",
      path: "/discovery",
      icon: <FaEarthAsia size={24} color="black" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <BsBellFill size={24} color="black" className="shrink-0" />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <BsChatDotsFill size={24} color="black" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BsPersonFill size={24} color="black" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <BsInfoCircleFill size={24} color="black" />,
    },
  ];

  return (
    // TODO: Change to bottom bar on mobile
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
  );
};

export default RouteSidebar;
