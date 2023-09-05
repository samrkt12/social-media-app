import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "../UI/Card";
import { useAuth, useLogout } from "../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./UserActions.scss";

const UserActions = () => {
  const [isActionsShown, setIsActionsShown] = useState(false);
  const { user, loading: userLoading } = useAuth();
  const { initiateLogout, loading: logoutLoading } = useLogout();
  const navigate = useNavigate();
  return (
    <div className="profile">
      {!userLoading && (
        <Avatar uid={user.id} image={user.displayImg} className="sm-img" />
      )}

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
          <ul onClick={() => setIsActionsShown(false)}>
            {!userLoading && (
              <li>
                <Link to={`/profile/${user?.id}`}>
                  <AccountCircleIcon />
                  <span>My Profile</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/settings">
                <SettingsIcon />
                <span>Settings</span>
              </Link>
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
