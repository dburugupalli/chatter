/**
 * Component Responsible for showing Home Feed to users
 */
import React, { useState, useEffect } from "react";
import "./Feed.css";
import Tweet from "./Tweet/Tweet";
import TweetBox from "./TweetBox/TweetBox";
import FlipMove from "react-flip-move";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { getTweets, postTweet, updateTweetComments, updateTweetFavorites} from "../../utils/ApiManager";


// Feed Function Definition
function Feed({userInfo}) {
  const [tweets, setTweets] = useState([]);

   /**
   * SECTION START FOR
   * Tweet Management by calling helper functions in APIManager.js
   * 
   */

  // Use effect to get the tweets from redis
  useEffect(() => {
    async function fetchTweets() {
      let response = await getTweets(userInfo.token);
      setTweets(response.reverse());
    }
    fetchTweets();
  }, []);

 
  // Function to construct the tweet and call api to post a new tweet
  const sendTweet = async (tweetMessage, imageUrl) => {
    try {
      // make the fetch api call and change the tweets state if success
      console.log(tweetMessage);
      const tweet = {
        tweetId: uuidv4(),
        tweet: tweetMessage,
        createdBy: {
          displayName: userInfo.displayName,
          userName: userInfo.username,
          avatarLink: "",
        },
        createdAt: moment().format(),
        imageLink: imageUrl,
        likes: [],
        comments: [],
      };

      // call the post Tweet api
      await postTweet(tweet, userInfo.token)
      // update the tweets
      const currentTweets = tweets;
      // update state
      setTweets([tweet, ...currentTweets]);
      
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  // Function to construct requestBody and call api to like a tweet
  const addTweetToFavorites = async (tweetId) => {
    try {
      const reqBody = {
        userId: userInfo.id,
        liked: 1,
      };
      await updateTweetFavorites(tweetId, reqBody, userInfo.token);

      // Update the tweets in state
      updateTweetStateForFavorites(tweetId, reqBody.userId, reqBody.liked);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  // Function to construct requestBody and call api to dislike a tweet
  const removeTweetFromFavorites = async (tweetId) => {
    try {
      const reqBody = {
        userId: userInfo.id,
        liked: 0,
      };

      await updateTweetFavorites(tweetId, reqBody, userInfo.token);

      // Update the tweets in state
      updateTweetStateForFavorites(tweetId, reqBody.userId, reqBody.liked);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  // Function to construct requestBody and call api to comment on a tweet
  const addCommentToTweet = async (tweetId, comment) => {
    try {
      const reqBody = {
        commentId: uuidv4(),
        commentedBy: userInfo.displayName,
        userName: userInfo.username,
        avatarLink: "",
        comment: comment,
      };
      console.log(tweetId);
      await updateTweetComments(tweetId, reqBody, userInfo.token);

      // Update the tweets in state
      updateTweetStateForComments(tweetId, reqBody);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };


  //-------------- END OF SECTION ---------------------------//

  /**
   * SECTION START FOR
   * Tweet Management by updating state
   * 
   */

  // Function to update tweet state for Like/DisLike
  const updateTweetStateForFavorites = (tweetId, userId, liked) => {
    let index = tweets.findIndex((tweet) => tweet.tweetId === tweetId);
    if (index === -1) return;
    else {
      let tweetToUpdate = tweets[index];
      if (liked === 1) {
        tweetToUpdate.likes.unshift(userId);
      } else {
        let likeIndex = tweetToUpdate.likes.findIndex(
          (like) => like === userId
        );
        console.log(likeIndex);
        tweetToUpdate.likes.splice(likeIndex, 1);
        console.log(tweetToUpdate);
      }
      setTweets([
        ...tweets.slice(0, index),
        Object.assign({}, tweets[index], tweetToUpdate),
        ...tweets.slice(index + 1),
      ]);
    }
  };

  // Function to update Tweet state for comments
  const updateTweetStateForComments = (tweetId, commentBody) => {
    let index = tweets.findIndex((tweet) => tweet.tweetId === tweetId);
    if (index === -1) return;
    else {
      let tweetToUpdate = tweets[index];
      tweetToUpdate.comments.unshift(commentBody);

      setTweets([
        ...tweets.slice(0, index),
        Object.assign({}, tweets[index], tweetToUpdate),
        ...tweets.slice(index + 1),
      ]);
    }
  };

  
  // Main render function for UI
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox triggerNewTweet={sendTweet} avatarName={userInfo.displayName} />
      <FlipMove>
        {tweets.map((tweet, index) => (
          <Tweet
            key={tweet.tweetId}
            tweetId={tweet.tweetId}
            displayName={tweet.createdBy.displayName}
            username={tweet.createdBy.userName}
            loggedInUserId={userInfo.id}
            loggedInUserDisplayName={userInfo.displayName}
            text={tweet.tweet}
            avatar={""}
            triggerNewComment={addCommentToTweet}
            addTweetToFavorites={addTweetToFavorites}
            removeTweetFromFavorites={removeTweetFromFavorites}
            image={tweet.imageLink}
            likes={tweet.likes}
            comments={tweet.comments}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
