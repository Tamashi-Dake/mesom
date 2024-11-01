import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import { config } from "./components/shared/config";

import FameSidebar from "./components/FameSidebar";
import RouteSidebar from "./components/RouteSidebar";
import RouteBottomBar from "./components/RouteBottombar";
import FloatButton from "./components/shared/FloatButton";

import "./App.css";

import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  let location = useLocation();
  const { title, link, icon } = config[location.pathname] || config["/"];

  useEffect(() => {
    if (!currentUser.isLoading && !currentUser.data) {
      navigate("/login");
    }
  }, [currentUser.isLoading, currentUser.data, navigate]);

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto h-full xl:px-30 max-w-6xl">
      <div className="grid grid-cols-[auto,1fr,1fr,1fr] grid-rows-[1fr,auto] xs:grid-rows-1 md:grid-cols-4 h-full">
        <RouteSidebar />
        <div className="col-span-4 xs:col-span-3 lg:col-span-2 border-x-[1px] border-neutral-200 relative">
          <Outlet />
        </div>
        {isMobile && <RouteBottomBar />}
        {isMobile && <FloatButton title={title} link={link} icon={icon} />}
        <FameSidebar />
      </div>
    </div>
  );
}

export default App;
