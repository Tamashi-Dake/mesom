import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        // TODO: Add error page
        // errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   path: "/discovery",
      //   element: <Discovery />,
      // },
      // {
      //   path: "/messages",
      //   element: <Messages />,
      // },
      // {
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      // TODO: Add fallback element
      // fallback={<Loading />}
    />
  </React.StrictMode>
);
