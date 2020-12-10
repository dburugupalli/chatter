import { baseUrl } from "./Constants";

/**
 *
 * SECTION FOR USER MANAGEMENT API
 */

// Authenticate User
export const authenticateUserInfo = async (userInfo) => {
  try {
    const response = await fetch(`${baseUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

// Register User
export const registerUserInfo = async (userInfo) => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (response.status === 400) {
      throw new Error("Some issue occured while registering the user");
    }
  } catch (error) {
    throw new Error(error);
  }
};

//------------- END OF USER MANAGEMENT API -----------------//

/**
 *
 * SECTION FOR TWEET MANAGEMENT API
 */
// Get Tweets
export const getTweets = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/tweets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log("Some issue occured !!", error.message);
  }
};

// Post Tweet
export const postTweet = async (tweet, token) => {
  try {
    const response = await fetch(`${baseUrl}/tweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tweet),
    });
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Tweet for Comments
export const updateTweetComments = async (tweetId, reqBody, token) => {
  try {
    const response = await fetch(`${baseUrl}/${tweetId}/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Tweet for Favorites, both like and dislike
export const updateTweetFavorites = async (tweetId, reqBody, token) => {
  console.log(tweetId);
  try {
    const response = await fetch(`${baseUrl}/${tweetId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

//------------- END OF TWEET MANAGEMENT API -----------------//
