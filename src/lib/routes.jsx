import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import Protected from "./Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/explore" />,
      },
      {
        path: "/home",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/explore",
        element: (
          <Protected>
            <Explore />
          </Protected>
        ),
      },
      {
        path: "/bookmarks",
        element: (
          <Protected>
            <Bookmarks />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);
