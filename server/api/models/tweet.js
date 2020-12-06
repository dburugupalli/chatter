const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose schema for Tweet object.
 */
let tweetSchema = new Schema(
  {

    /**
     * Custom Tweet Id
     */
    tweetId: {
      type: String,
      required: "Tweet ID is required"
    },
   
    /**
     * Tweet text.
     */
    tweet: {
      type: String,
      required: "Tweet Description is required",
    },
    
    /**
     * Tweet Created by
     */
    createdBy: {
      userName: {
        type: String
      },
      avatarLink: {
        type: String
      }
    },

    /**
     * Tweet Created TimeStamp from Redis
     */
    createdAt: {
      type: String
    },

    /**
     * Image Link for the tweet
     */
    imageLink: {
      type: String
    },

    /**
     * Likes for a Tweet
     */
    likes: [String],

    comments: [{ 
      commentId:String,
      commentedBy:String,
      avatarLink:String,
      comment:String 
    }]
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.model("Tweets", tweetSchema);
