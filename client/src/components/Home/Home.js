/**
 * Component Responsible to hold all the 3 major
 * components Sidebar, Feed, Widgets
 */
import React from "react";
import Feed from "../Feed/Feed";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import "../../App.css";
// Home function definition
function Home({ userInfo }) {
  return (
    <div className="app">
      <Sidebar userInfo={userInfo} />
      <Feed userInfo={userInfo} />
      <Widgets />
    </div>
  );
}

export default Home;
