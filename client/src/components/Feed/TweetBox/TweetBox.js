import React, { useState, forwardRef } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";

const TweetBox = (forwardRef (
  ({avatarName, triggerNewTweet}, ref) => {
  const [tweetMessage, setTweetMessage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

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