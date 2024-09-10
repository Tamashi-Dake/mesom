import { useMediaQuery } from "usehooks-ts";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import { config } from "./components/shared/config";

import FameSidebar from "./components/FameSidebar";
import RouteSidebar from "./components/RouteSidebar";

import RouteBottomBar from "./components/RouteBottombar";
import FloatButton from "./components/shared/FloatButton";

import "./App.css";
import AuthModal from "./components/AuthModal";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect } from "react";
import { useAuthModal } from "../hooks/useModal";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { data: currentUser } = useCurrentUser();
  const authModal = useAuthModal();

  let location = useLocation();
  const { title, link, icon } = config[location.pathname] || config["/"];

  useEffect(() => {
    !currentUser ? authModal.onOpen() : authModal.onClose();
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="h-screen w-screen">
      <div className="container mx-auto h-full xl:px-30 max-w-6xl">
        <div className="grid grid-cols-[auto,1fr,1fr,1fr] grid-rows-[1fr,auto] xm:grid-rows-1 md:grid-cols-4 h-full">
          <AuthModal />
          {/* TODO: Add Header: Search bar in Discovery, Number on User, ... */}
          <RouteSidebar />
          <div className="col-span-4 xm:col-span-3 lg:col-span-2 border-x-[1px] border-neutral-200">
            <Outlet />
          </div>
          {isMobile && <RouteBottomBar />}
          {isMobile && <FloatButton title={title} link={link} icon={icon} />}
          <FameSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
