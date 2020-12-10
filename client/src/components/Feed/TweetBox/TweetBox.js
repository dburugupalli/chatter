/**
 * Component Responsible for Tweet Message Holder
 */
import React, { useState, forwardRef } from "react";
import "./TweetBox.css";
import { Avatar, Button, Snackbar } from "@material-ui/core";
import { bannedWords } from "../../../utils/Constants";
import Alert from "@material-ui/lab/Alert";

// Function Definition for TweetBox
const TweetBox = forwardRef(({ avatarName, triggerNewTweet }, _ref) => {
  // States for Tweet Message and Banned Words
  const [tweetMessage, setTweetMessage] = useState("");
  const [isBannedWordUsed, setIsBannedWordUsed] = useState(false);

  // State for Snackbar
  const [state] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  // Helper function to trigger a tweet send request in parent (Feed.js)
  const sendTweet = (e) => {
    e.preventDefault();
    // check for banned words
    if (isMessageSanitized(tweetMessage.trim())) {
      // post api call trigger in parent component
      triggerNewTweet(tweetMessage.trim());
      setTweetMessage("");
    } else {
      // update foul error popup show
      setIsBannedWordUsed(true);
      // timeOut to make the snackbar close
      setTimeout(() => {
        setIsBannedWordUsed(false);
      }, 3000);
    }
  };

  // Helper function to check if the Tweet Message has used banned words
  const isMessageSanitized = (message) => {
    const wordsInMessage = message.toLowerCase().split(" ");
    let commonWords = wordsInMessage.filter((word) =>
      bannedWords.includes(word)
    );
    console.log(commonWords);
    return commonWords.length === 0;
  };

  // Main render function to display Tweet Box UI
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
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={isBannedWordUsed}>
        <Alert severity="error">
          The tweet cannot be posted due to foul language
        </Alert>
      </Snackbar>
    </div>
  );
});

export default TweetBox;
