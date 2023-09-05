import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import Protected from "./Protected";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
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
        path: "/profile/:userID",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/settings",
        element: (
          <Protected>
            <Settings />
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
