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
  const { title, icon } = config[location.pathname] || config["/"];

  useEffect(() => {
    if (!currentUser.isLoading && !currentUser.data) {
      navigate("/auth");
    }
  }, [currentUser.isLoading, currentUser.data, navigate]);

  if (currentUser.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="xl:px-30 container mx-auto h-full bg-main-background md:max-w-7xl">
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
            "relative w-full overflow-hidden border-light-border dark:border-dark-border xs:border-x-[1px]",
            inBigScreen ? "col-span-2" : "",
          )}
        >
          <Outlet />
          {/* Hack: overflow might add weird space or cut some page contents and i don't have time to think about this sh */}
          <div className="block h-12 bg-transparent xs:hidden"></div>
        </div>
        <FameSidebar />
        <RouteBottomBar />
        {/* TODO: 2 chức năng: create post, và link đến conversations khi ở trong profile */}
        <FloatButton title={title} icon={icon} />
      </div>
    </div>
  );
}

export default App;
