import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Messages from "./pages/Messages.jsx";
import Notifications from "./pages/Notification.jsx";
import Search from "./pages/Search.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Auth/Login.jsx";
import SignUpPage from "./pages/Auth/SignUp.jsx";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Create a new instance of BrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        // TODO: Add error page
        // errorElement: <Error />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
