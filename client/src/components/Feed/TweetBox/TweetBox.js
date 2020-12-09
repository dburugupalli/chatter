import React, { useState, forwardRef } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
// import db from "./firebase";

const TweetBox = (forwardRef (
  ({avatarName, triggerNewTweet}, ref) => {
  const [tweetMessage, setTweetMessage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    // db.collection("posts").add({
    //   displayName: "Rafeh Qazi",
    //   username: "cleverqazi",
    //   verified: true,
    //   text: tweetMessage,
    //   image: tweetImage,
    //   avatar:
    //     "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
    // });

    // post api call trigger in parent component
    triggerNewTweet(tweetMessage);

    setTweetMessage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={`https://ui-avatars.com/api/?name=${avatarName}`} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}));

export default TweetBox;