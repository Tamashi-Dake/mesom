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
          "relative cursor-pointer items-center rounded-full p-4 hover:bg-slate-400 hover:bg-opacity-10",
          // Mobile: small square icon, desktop: full width and gap
          "lg:h-auto lg:w-full lg:justify-start lg:gap-4 lg:bg-opacity-10 lg:p-4 lg:hover:bg-slate-800",
          "flex h-14 w-14 justify-center xs:w-full",
          match ? "bg-teal-600 bg-opacity-10 font-semibold" : "",
        )}
      >
        {icon}
        {/* Text for large screens only */}
        <p className="hidden pb-[0.1rem] text-xl lg:block">{name}</p>
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
