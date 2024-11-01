import PropTypes from "prop-types";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const RouteItem = ({ name, path, icon }) => {
  let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div className="flex items-center justify-center sm:justify-normal">
      <NavLink
        to={path}
        className={twMerge(
          " relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer md:hidden",
          match ? "bg-teal-600 bg-opacity-10" : ""
        )}
      >
        {icon}
      </NavLink>

      <NavLink
        to={path}
        className={twMerge(
          "relative hidden xs:w-full md:flex items-center gap-4 p-4 rounded-full hover:bg-slate-800 hover:bg-opacity-10 cursor-pointer",
          match ? "bg-teal-600 bg-opacity-10" : ""
        )}
      >
        {icon}
        <p className="hidden md:block text-xl pb-[0.1rem]"> {name}</p>
      </NavLink>
    </div>
  );
};
RouteItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};

export default RouteItem;
