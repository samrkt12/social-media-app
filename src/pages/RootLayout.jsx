import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav/MainNav";
const RootLayout = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
      <footer style={{ textAlign: "center", margin: "25px 0" }}>
        created by Sam
      </footer>
    </>
  );
};

export default RootLayout;
