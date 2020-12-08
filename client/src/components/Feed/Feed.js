import React, { useState, useEffect } from "react";
import "./Feed.css";
import Tweet from "./Tweet/Tweet";
import TweetBox from "./TweetBox/TweetBox";
import FlipMove from "react-flip-move";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
const dbTweets = [
  
    {
      likes: ["2"],
      tweetId: "1",
      tweet: "Today is a great day",
      imageLink: "",
      createdBy: {
          displayName: "Prudhvi Chandra",
          userName: "prudhvi",
          avatarLink: ""
      },
      createdAt: "timeStamp from frontend",
      comments: []
  },
  {
    likes: ["1", "2"],
    tweetId: "2",
    tweet: "Wow this is so good",
    imageLink: "",
    createdBy: {
        displayName: "Ravi Kumar",
        userName: "ravi",
        avatarLink: ""
    },
    createdAt: "timeStamp from frontend",
    comments: [{ 
      commentId:"1",
      commentedBy:"Prudhvi Chandra",
      userName: "prudhvi",
      avatarLink:"",
      comment:"This is a good post" 
    }]
},
  
]

const baseUrl = 'http://localhost:3000/v1'

function Feed() {
  const [tweets, setPosts] = useState(dbTweets);

  const sendTweet = async (tweetMessage) => {
      // make the fetch api call and change the tweets state if success
      console.log(tweetMessage);
      const tweet = {
          tweetId: uuidv4(),
          tweet: tweetMessage,
          createdBy: {
              displayName: "Ravi Kumar",
              userName: "ravi",
              avatarLink: ""
          },
          createdAt:moment().format(),
          imageLink:""
      }
      
      try {
        const response = await fetch(`${baseUrl}/tweets`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmNjMzAyNzA1MTk1NzU4YjNkNDRiMWEiLCJpYXQiOjE2MDcyMTcyMTcsImV4cCI6MTYwNzgyMjAxN30.WAZxam4Arme_8mESOeimOXElpY4tUMRwU6_Hg7RAV-o" },
          body: JSON.stringify(tweet)
        });
        console.log(await response.json());
      } catch (error) {
        console.log("Some issue occured !!", error.message);
      }
  } 

//   useEffect(() => {
//     db.collection("posts").onSnapshot((snapshot) =>
//       setPosts(snapshot.docs.map((doc) => doc.data()))
//     );
//   }, []);

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
            displayName={tweet.createdBy.displayName}
            username={tweet.createdBy.userName}
            text={tweet.tweet}
            avatar={""}
            image={`https://picsum.photos/id/${index+10}/200/300`}
            likes={tweet.likes}
          />
      ))}
      </FlipMove>
    </div>
  );
}

export default Feed;