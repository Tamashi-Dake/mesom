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
      navigate("/auth");
    }
  }, [currentUser.isLoading, currentUser.data, navigate]);

  if (currentUser.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // Invalid: Weird layout shift + abnormal white space in mobile
    <div className="xl:px-30 container mx-auto h-full max-w-6xl">
      <div className="grid h-full w-full grid-cols-none grid-rows-[1fr,auto] xs:grid-cols-[minmax(auto,5rem),1fr,1fr,1fr] xs:grid-rows-1 lg:grid-cols-4">
        <RouteSidebar />
        <div className="relative col-span-3 w-full border-neutral-200 xs:border-x-[1px] md:col-span-2">
          <Outlet />
        </div>
        <RouteBottomBar />
        <FloatButton title={title} link={link} icon={icon} />
        <FameSidebar />
      </div>
    </div>
  );
}

export default App;
