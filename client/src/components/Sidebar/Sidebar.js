/**
 * Component Responsible for Siderbar UI and icons
 */
import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

// Function definition for Sidebar
function Sidebar({ userInfo }) {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption active Icon={HomeIcon} text="Home" />
      <div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              marginBottom: "120px",
            }}
          >
            <div>
              <Avatar
                src={`https://ui-avatars.com/api/?name=${userInfo.displayName}`}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px",
              }}
            >
              <span>{userInfo.displayName}</span>
              <span className="post__headerSpecial">@ {userInfo.username}</span>
            </div>
          </div>
        </div>
      </div>
      <Link className="btnLogOut" to="/logout">
        <label>LogOut</label>
        <ExitToAppIcon />
      </Link>
    </div>
  );
}

export default Sidebar;
