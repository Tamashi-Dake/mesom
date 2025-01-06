import { Button } from "@headlessui/react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const MobileSidebarNav = ({ name, path, icon, onClick }) => {
  let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div className="flex items-center justify-start">
      {onClick ? (
        <Button
          onClick={onClick}
          className="flex cursor-pointer items-center justify-start gap-4 rounded-2xl py-2"
        >
          {icon}
          <p className="pb-[0.1rem] text-xl">{name}</p>
        </Button>
      ) : (
        <NavLink
          to={path}
          // TODO-Low Priority: Change icon colors on route match.
          className={twMerge(
            "flex cursor-pointer items-center justify-start gap-4 rounded-2xl py-2 hover:bg-slate-400 hover:bg-opacity-10",
            match ? "bg-teal-600 bg-opacity-10 font-semibold" : "",
          )}
        >
          {icon}
          <p className="pb-[0.1rem] text-xl">{name}</p>
        </NavLink>
      )}
    </div>
  );
};

export default MobileSidebarNav;
