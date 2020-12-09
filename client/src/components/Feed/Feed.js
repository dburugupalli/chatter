import React, { useState, useEffect } from "react";
import "./Feed.css";
import Tweet from "./Tweet/Tweet";
import TweetBox from "./TweetBox/TweetBox";
import FlipMove from "react-flip-move";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const baseUrl = "http://localhost:3000/v1";

function Feed() {
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const response = await fetch(`${baseUrl}/tweets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmNjMzAyNzA1MTk1NzU4YjNkNDRiMWEiLCJpYXQiOjE2MDcyMTcyMTcsImV4cCI6MTYwNzgyMjAxN30.WAZxam4Arme_8mESOeimOXElpY4tUMRwU6_Hg7RAV-o",
        },
      });
      return response.json();
    } catch (error) {
      console.log("Some issue occured !!", error.message);
    }
  };

  useEffect(() => {
    async function fetchTweets() {
      let response = await getTweets();
      setTweets(response.reverse());
    }

    fetchTweets();
  }, []);

  const sendTweet = async (tweetMessage) => {
    try {
      // make the fetch api call and change the tweets state if success
      console.log(tweetMessage);
      const tweet = {
        tweetId: uuidv4(),
        tweet: tweetMessage,
        createdBy: {
          displayName: "Ravi Kumar",
          userName: "ravi",
          avatarLink: "",
        },
        createdAt: moment().format(),
        imageLink: "",
        likes: [],
        comments: [],
      };

      // call the post api
      await apiSendTweet(tweet);

      // update the tweets
      const currentTweets = tweets;
      // currentTweets.unshift(tweet);

      // console.log(currentTweets);

      setTweets([tweet, ...currentTweets]);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  const updateTweetState = (tweetId, userId, liked) => {
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

  const addTweetToFavorites = async (tweetId) => {
    try {
      const reqBody = {
        userId: "5fd037979364aac820b769c5",
        liked: 1,
      };
      console.log(tweetId);
      await updateTweetFavorites(tweetId, reqBody);

      // Update the tweets in state
      updateTweetState(tweetId, reqBody.userId, reqBody.liked);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  const addCommentToTweet = async (tweetId, comment) => {
    try {
      const reqBody = {
        commentId: uuidv4(),
        commentedBy: "Ravi Kumar",
        userName:"ravi",
        avatarLink: "",
        comment: comment,
      };
      console.log(tweetId);
      await updateTweetComments(tweetId, reqBody);

      // Update the tweets in state
      updateTweetStateForComments(tweetId, reqBody);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  const updateTweetComments = async (tweetId, reqBody) => {
    console.log(tweetId);
    try {
      const response = await fetch(`${baseUrl}/${tweetId}/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmNjMzAyNzA1MTk1NzU4YjNkNDRiMWEiLCJpYXQiOjE2MDcyMTcyMTcsImV4cCI6MTYwNzgyMjAxN30.WAZxam4Arme_8mESOeimOXElpY4tUMRwU6_Hg7RAV-o",
        },
        body: JSON.stringify(reqBody),
      });
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeTweetFromFavorites = async (tweetId) => {
    try {
      const reqBody = {
        userId: "5fd037979364aac820b769c5",
        liked: 0,
      };

      await updateTweetFavorites(tweetId, reqBody);
      // Update the tweets in state
      updateTweetState(tweetId, reqBody.userId, reqBody.liked);
    } catch (error) {
      console.log(error);
      console.log("Some error occured");
    }
  };

  const updateTweetFavorites = async (tweetId, reqBody) => {
    console.log(tweetId);
    try {
      const response = await fetch(`${baseUrl}/${tweetId}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmNjMzAyNzA1MTk1NzU4YjNkNDRiMWEiLCJpYXQiOjE2MDcyMTcyMTcsImV4cCI6MTYwNzgyMjAxN30.WAZxam4Arme_8mESOeimOXElpY4tUMRwU6_Hg7RAV-o",
        },
        body: JSON.stringify(reqBody),
      });
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const apiSendTweet = async (tweet) => {
    try {
      const response = await fetch(`${baseUrl}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmNjMzAyNzA1MTk1NzU4YjNkNDRiMWEiLCJpYXQiOjE2MDcyMTcyMTcsImV4cCI6MTYwNzgyMjAxN30.WAZxam4Arme_8mESOeimOXElpY4tUMRwU6_Hg7RAV-o",
        },
        body: JSON.stringify(tweet),
      });
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox triggerNewTweet={sendTweet} avatarName={"Ravi Kumar"} />
      <FlipMove>
        {tweets.map((tweet, index) => (
          <Tweet
            key={tweet.tweetId}
            tweetId={tweet.tweetId}
            displayName={tweet.createdBy.displayName}
            username={tweet.createdBy.userName}
            text={tweet.tweet}
            avatar={""}
            triggerNewComment={addCommentToTweet}
            addTweetToFavorites={addTweetToFavorites}
            removeTweetFromFavorites={removeTweetFromFavorites}
            image={`https://picsum.photos/id/${index + 10}/500/300`}
            likes={tweet.likes}
            comments={tweet.comments}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
