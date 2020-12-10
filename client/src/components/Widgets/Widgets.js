/**
 * Component Responsible for Twitter widgets
 */
import React from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";

// Widgets Function definition
function Widgets() {
  // Main render
  return (
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
  );
}

export default Widgets;
