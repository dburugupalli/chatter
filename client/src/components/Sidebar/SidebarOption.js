/**
 * Component responsible for displaying 
 * each option on side bar
 */
import React from "react";
import "./SidebarOption.css";

// SidebarOption Function definition
function SidebarOption({ active, text, Icon }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;