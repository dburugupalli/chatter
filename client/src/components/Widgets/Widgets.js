/**
 * Component Responsible for Twitter widgets
 */
import React, {useEffect, useState} from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";

// Widgets Function definition
function Widgets() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });


  // Main render
  return (
    windowWidth > 700 ?
    <div className="widgets">
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="BBCNews"
          options={{ height: "100vh" }}
        />
      </div>
    </div>
    : null
  );
}

export default Widgets;
