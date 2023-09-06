import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import bigLogo from "../../assets/tweeter.svg";
import smallLogo from "../../assets/tweeter-small.svg";
import "./MainNav.scss";
import UserActions from "./UserActions";

const MainNav = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isNarrowScreen = windowWidth <= 768;

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={isNarrowScreen ? smallLogo : bigLogo} alt="tweeter-logo" />
        </div>
        <ul className="list">
          <li>
            <NavLink to="/home" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks">Bookmarks</NavLink>
          </li>
        </ul>
        <UserActions />
      </nav>
    </header>
  );
};

export default MainNav;
