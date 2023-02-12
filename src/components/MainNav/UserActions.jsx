import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "../UI/Card";
import { activeUser } from "../../Data";
import { useLogout } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const UserActions = () => {
  const [isActionsShown, setIsActionsShown] = useState(false);
  const { initiateLogout, loading } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="profile">
      <img src={activeUser.dp} alt="dp" className="sm-img" />
      <span>{activeUser.name}</span>
      {isActionsShown ? (
        <ExpandLessIcon
          className="user-action-arrow"
          onClick={() => setIsActionsShown(false)}
        />
      ) : (
        <ExpandMoreIcon
          className="user-action-arrow"
          onClick={() => setIsActionsShown(true)}
        />
      )}
      {isActionsShown ? (
        <Card className="nav-actions">
          <ul>
            <li
              onClick={() => {
                setIsActionsShown(false);
                navigate("/profile");
              }}
            >
              <a>
                <AccountCircleIcon />
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <a>
                <ChatIcon />
                <span>Chat</span>
              </a>
            </li>
            <li>
              <a>
                <SettingsIcon />
                <span>Settings</span>
              </a>
            </li>
          </ul>
          <div className="line" />
          <button type="button" onClick={initiateLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserActions;
