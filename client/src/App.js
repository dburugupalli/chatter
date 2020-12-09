import React from "react";

// import Feed from "./Feed";

import "./App.css";
import SignIn from "./components/Auth/SignIn";
import Auth from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";
import Widgets from "./components/Widgets/Widgets";

function App() {
  return (
    <div className="app">
      <Auth/>
    {/* <SignIn/> */}

      {/* <Sidebar />
      <Feed/>
      <Widgets /> */}
    </div>
  );
}

export default App;