 import React from "react";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";
import Widgets from "./components/Widgets/Widgets";

function Home({userInfo}) {

  return (
    <div className="app">
      <Sidebar userInfo={userInfo}/>
      <Feed userInfo={userInfo} />
      <Widgets />
    </div>
  );
}

export default Home;