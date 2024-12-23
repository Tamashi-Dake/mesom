import { useMemo } from "react";

import { mobileRoutes } from "../shared/config";
import MobileSidebarNav from "../shared/MobileSidebarNav";
import { useModal } from "../../hooks/useModal";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { MdDisplaySettings } from "react-icons/md";
import DisplayModal from "./DisplayModal";
import ActionLogout from "./ActionLogout";

const MobileSidebarModal = ({ user }) => {
  const logoutModal = useModal();
  const displayModal = useModal();

  const routes = useMemo(() => {
    if (!user) return mobileRoutes;

    return mobileRoutes.map((route) => {
      if (route.path === "/profile") {
        return {
          ...route,
          path: `/profile/${user?.username}`,
        };
      }
      return route;
    });
  }, [user]);

  return (
    <>
      <aside className="flex flex-col gap-4 px-6 py-4">
        <div className="flex flex-col gap-4">
          <Link to={`/profile/${user?.username}`}>
            <div className="avatar mb-4 h-12 w-12 xs:hidden">
              <img
                src={user?.profile.avatarImg || "/placeholder.png"}
                alt="User Avatar"
                className="h-full w-full rounded-full object-fill"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="truncate text-lg font-semibold leading-none text-gray-900 hover:underline">
                {user?.displayName || user?.username}
              </p>
              <p className="text-sm font-normal text-gray-500">
                @{user?.username}
              </p>
            </div>
          </Link>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold">
                {user?.following.length}
              </span>
              <span className="text-base text-slate-500">Following</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base font-bold">
                {user?.followers.length}
              </span>
              <span className="text-base text-slate-500">Followers</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {routes.map((route) => (
            <MobileSidebarNav
              key={route.path}
              name={route.name}
              path={route.path}
              icon={route.icon}
              onClick={route.onClick}
            />
          ))}
          <MobileSidebarNav
            name={"Display"}
            icon={<MdDisplaySettings size={24} color="black" />}
            onClick={displayModal.openModal}
          />

          <MobileSidebarNav
            name={"Log Out"}
            icon={<TbLogout size={24} color="black" />}
            onClick={logoutModal.openModal}
          />
        </div>
      </aside>
      {displayModal.open && <DisplayModal modal={displayModal} />}
      {logoutModal.open && <ActionLogout modal={logoutModal} />}
    </>
  );
};

export default MobileSidebarModal;
