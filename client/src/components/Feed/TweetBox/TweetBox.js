import React, { useState, forwardRef } from "react";
import "./TweetBox.css";
import { Avatar, Button, Snackbar } from "@material-ui/core";
import { bannedWords } from "../../../utils/Constants";
import Alert from "@material-ui/lab/Alert";

const TweetBox = forwardRef(({ avatarName, triggerNewTweet }, ref) => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [isBannedWordUsed, setIsBannedWordUsed] = useState(false);
  const [state] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
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
      console.log("Foul language used");
    }
  };

  const isMessageSanitized = (message) => {
    const wordsInMessage = message.toLowerCase().split(" ");
    let commonWords = wordsInMessage.filter((word) =>
      bannedWords.includes(word)
    );
    console.log(commonWords);
    return commonWords.length === 0;
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
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={isBannedWordUsed}>
        <Alert severity="error">
          The tweet cannot be posted due to foul language
        </Alert>
      </Snackbar>
    </div>
  );
});

export default TweetBox;
