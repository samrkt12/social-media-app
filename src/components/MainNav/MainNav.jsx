import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/tweeter.svg";
import "./MainNav.scss";
import UserActions from "./UserActions";

const MainNav = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="tweeter-logo" />
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
