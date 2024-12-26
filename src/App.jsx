import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import { config } from "./components/shared/config";

import FameSidebar from "./components/layout/FameSidebar";
import RouteSidebar from "./components/layout/RouteSidebar";
import RouteBottomBar from "./components/layout/RouteBottombar";
import FloatButton from "./components/shared/FloatButton";

import "./App.css";

import useCurrentUser from "./hooks/useCurrentUser";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useMediaQuery } from "usehooks-ts";
import { twMerge } from "tailwind-merge";

function App() {
  const inBigScreen = useMediaQuery("(min-width: 1000px)");
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
    return <LoadingSpinner />;
  }

  return (
    <div className="xl:px-30 container mx-auto h-full md:max-w-7xl">
      <div
        className={twMerge(
          "grid h-full w-full grid-cols-none grid-rows-[1fr,auto] xs:grid-rows-1 xl:grid-cols-[1fr,1fr,1fr,1fr]",
          inBigScreen
            ? "xs:grid-cols-[minmax(auto,4rem),1fr,1fr,1fr]"
            : "xs:grid-cols-[minmax(auto,5rem),1fr]",
        )}
      >
        <RouteSidebar />
        <div
          // Invalid: can't see the last post
          className={twMerge(
            "w-full border-neutral-200 xs:border-x-[1px]",
            inBigScreen ? "col-span-2" : "",
          )}
        >
          <Outlet />
        </div>
        <FameSidebar />
        <RouteBottomBar />
        <FloatButton title={title} link={link} icon={icon} />
      </div>
    </div>
  );
}

export default App;
