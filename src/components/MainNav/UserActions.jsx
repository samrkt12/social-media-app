import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "../UI/Card";
import { useAuth, useLogout } from "../../hooks/auth";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./UserActions.scss";

const UserActions = () => {
  const [isActionsShown, setIsActionsShown] = useState(false);
  const { user, loading: userLoading } = useAuth();
  const { initiateLogout, loading: logoutLoading } = useLogout();
  const userActionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userActionsRef.current &&
        !userActionsRef.current.contains(event.target)
      ) {
        setIsActionsShown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          onClick={(event) => {
            event.stopPropagation();
            setIsActionsShown(true);
          }}
        />
      )}
      {isActionsShown ? (
        <Card className="nav-actions" ref={userActionsRef}>
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
