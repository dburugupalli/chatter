import React, { forwardRef } from "react";
import "./Tweet.css";
import { Avatar } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


const Tweet = forwardRef(
  ({ displayName, username, text, image, likes }, ref) => {
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
                <span className="post__headerSpecial">
                  @ {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <CommentIcon fontSize="small" style={{paddingRight: 20, color: '#5B7083'}} />
            <FavoriteBorderIcon fontSize="small" style={{color: '#5B7083'}} />
            <label style={{fontSize: 'medium',paddingLeft: 4,color: '#5B7083'}}>{likes.length}</label>
          </div>
        </div>
      </div>
    );
  }
);

export default Tweet;