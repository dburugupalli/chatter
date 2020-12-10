/**
 * Component Responsible for showing each tweet,
 * Modal for commenting, Interface for user action on tweets
 */
import React, { forwardRef, useState } from "react";
import "./Tweet.css";
import { Avatar, Button } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    marginTop: "5%",
    marginLeft: "25%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    width: 580,
    height: "80%",
    overflowY: "scroll",
    border: "transparent !important",
    borderRadius: "20px",
  },
}));

// Function definition for Tweet
const Tweet = forwardRef(
  (
    {
      displayName,
      loggedInUserId,
      loggedInUserDisplayName,
      username,
      text,
      image,
      likes,
      comments,
      tweetId,
      addTweetToFavorites,
      removeTweetFromFavorites,
      triggerNewComment,
    },
    ref
  ) => {
    const classes = useStyles();

    // States for Comment Modal and comment
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");

    // Helper functions for Modal Open/Close
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // Helper Functions to handle like/dislike for a tweet
    const handleFavoriteClick = () => {
      console.log(tweetId);
      addTweetToFavorites(tweetId);
    };

    const handleUnFavoriteClick = () => {
      removeTweetFromFavorites(tweetId);
    };

    // Helper Function to post a comment
    const sendComment = (e) => {
      e.preventDefault();

      // put api call trigger in parent component
      triggerNewComment(tweetId, comment);
      setComment("");
    };

    // Helper Funtion to render each comment on the UI
    const renderComment = (comment) => {
      return (
        <div key={comment.commentId} style={{ display: "flex" }}>
          <div className="post__avatar">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${comment.commentedBy}`}
            />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {comment.commentedBy}{" "}
                  <span className="post__headerSpecial">
                    @ {comment.userName}
                  </span>
                </h3>
              </div>
              <div className="post__headerDescription">
                <p style={{ maxWidth: 500 }}>{comment.comment}</p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Main render to return UI for a tweet
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={`https://ui-avatars.com/api/?name=${displayName}`} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">@ {username}</span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p style={{ maxWidth: 500 }}>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <CommentIcon
              fontSize="small"
              style={{
                paddingRight: 4,
                color: comments && comments.length > 0 ? "#50B7F5" : "#5B7083",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            />
            <label
              style={{ fontSize: "medium", paddingRight: 20, color: "#5B7083" }}
            >
              {comments.length}
            </label>
            {likes && likes.indexOf(loggedInUserId) > -1 ? (
              <FavoriteIcon
                fontSize="small"
                className="favorite_icon_selected"
                onClick={handleUnFavoriteClick}
              ></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon
                fontSize="small"
                className="favorite_icon"
                onClick={handleFavoriteClick}
              />
            )}
            <label
              style={{ fontSize: "medium", paddingLeft: 4, color: "#5B7083" }}
            >
              {likes.length}
            </label>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{ display: "flex", scrollbarWidth: 0 }}>
                <div className="post__avatar">
                  <Avatar
                    src={`https://ui-avatars.com/api/?name=${displayName}`}
                  />
                </div>
                <div className="post__body">
                  <div className="post__header">
                    <div className="post__headerText">
                      <h3>
                        {displayName}{" "}
                        <span className="post__headerSpecial">
                          @ {username}
                        </span>
                      </h3>
                    </div>
                    <div className="post__headerDescription">
                      <p style={{ maxWidth: 500 }}>{text}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="commentBox">
                <form>
                  <div className="commentBox__input">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${loggedInUserDisplayName}`}
                    />
                    <input
                      style={{ border: "1px solid gray", padding: 20 }}
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      placeholder="Tweet your reply"
                      type="text"
                    />
                  </div>
                  <Button
                    onClick={sendComment}
                    type="submit"
                    className="commentBox__commentButton"
                  >
                    Reply
                  </Button>
                </form>
              </div>
              {comments.length > 0 ? (
                <div className="allComments">
                  {comments.map((comment) => renderComment(comment))}
                </div>
              ) : null}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
);

export default Tweet;
