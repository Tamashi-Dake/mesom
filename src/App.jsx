import FameSidebar from "./components/FameSidebar";
import RouteSidebar from "./components/RouteSidebar";
import { Outlet } from "react-router";

import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="container mx-auto h-full xl:px-30 max-w-6xl">
        <div className="grid grid-cols-[auto,1fr,1fr,1fr] md:grid-cols-4 h-full">
          {/* TODO: Add Header: Search bar in Discovery, Number on User, ... */}
          <RouteSidebar />
          <div className="col-span-4 xm:col-span-3 lg:col-span-2 border-x-[1px] border-neutral-200">
            <Outlet />
          </div>
          <FameSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
