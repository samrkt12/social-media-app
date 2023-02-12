import React, { useState } from "react";
import Card from "../UI/Card";
import "./Post.scss";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Button from "../UI/Button";

const Post = ({ post }) => {
  const [isActive, setIsActive] = useState(post.active);
  const activeHandler = () => {
    console.log("Clicked");
    setIsActive((prev) => !prev);
  };
  return (
    <Card className="post">
      <div className="owner">
        <img src={post.creatorDp} alt="dp" className="bg-img" />
        <div className="title">
          <p>{post.creatorName}</p>
          <span>{post.createdDate}</span>
        </div>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <div className="image">
        <img src={post.postImage} alt="post-image" />
      </div>
      <div className="status">
        <span>{`${post.status.comments} comments`}</span>
        <span>{`${post.status.retweets} Retweets`}</span>
        <span>{`${post.status.saved} Saved`}</span>
      </div>
      <div className="actions">
        <div className="item">
          <ModeCommentOutlinedIcon className="action-icon" />
          <p>Comment</p>
        </div>
        <div
          className={`item ${isActive ? "retweet" : ""}`}
          onClick={activeHandler}
        >
          <LoopOutlinedIcon className="action-icon" />
          <p>{isActive ? "Retweeted" : "Retweet"}</p>
        </div>
        <div className={`item ${isActive ? "like" : ""}`}>
          <FavoriteBorderOutlinedIcon className="action-icon" />
          <p>{isActive ? "Liked" : "Like"}</p>
        </div>
        <div className={`item ${isActive ? "save" : ""}`}>
          <BookmarkBorderOutlinedIcon className="action-icon" />
          <p>{isActive ? "Saved" : "Save"}</p>
        </div>
      </div>
      <div className="reply">
        <img
          src="https://s3-alpha-sig.figma.com/img/1035/123a/bbcc8da69647a2c109cee000d9cda98f?Expires=1676246400&Signature=JSrsHT827EFctcZRakrN4QE83HnqTK3q6IBVHc6V0yp04u1HyVhdTAf571rGFYtOinVgRgYQmFVj-CPATLEnCvRPUbUut~4FBa9YlS5sdO4wjkufom7oPFk2LqlRv5KHwzav2W001Oh1a4eyYP0VKJHEvY2RpbmpOyIp1fkhcAUplptrPMGEupNfwGHDCep5g93jCRzdx39h~Z5ezOPOe8X0i2KQy-GptOHDe3cRq26D5FeAWKg2eS-MAi6hcTw2lh4AvjyjRQUSoftCHyAGzmlgnCFDV-OkeHtudM2x5om8E721rtFIYpydiNbWIgslaPrcPjrjWSrH3IPn7KorCg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="dp"
          className="bg-img"
        />
        <div className="field">
          <input
            type="text"
            className="reply-input"
            placeholder="Tweet your reply"
          />
          <label htmlFor="post-media">
            <ImageOutlinedIcon
              style={{
                cursor: "pointer",
                width: "20px",
                height: "100%",
                color: "#BDBDBD",
              }}
            />
            <input
              type="file"
              id="post-media"
              style={{ display: "none" }}
              name="image"
              accept="image/*"
            />
          </label>
          <Button className="reply-btn">
            <SendRoundedIcon />
          </Button>
        </div>
      </div>
      {post.comments.length ? (
        <div className="comments">
          {post.comments.map((com) => (
            <div key={com.id} className="comment">
              <img src={com.commentorDp} alt="dp" className="sm-img" />
              <div className="details">
                <div className="wrapper">
                  <div className="comment-profile">
                    <p>{com.commentorName}</p>
                    <span>{com.commentTime}</span>
                  </div>
                  <div className="comment-para">
                    <p>{com.commentText}</p>
                  </div>
                </div>
                <div className="data">
                  <div className="data-item like">
                    <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
                    <p>Like</p>
                  </div>
                  <span>{`${com.commentLikes} Likes`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // <div className="comments">
        //   <div className="comment">
        //     <img
        //       src="https://s3-alpha-sig.figma.com/img/d837/517f/dc565bcb672f0b707f286b99e6a36e4f?Expires=1676246400&Signature=ceuMqzLgzbfA3U74gKVkMhvwujfMQdo63fM7Qs9LsTwaUSOWCCfwQ23Kblw96myz2cS-lQHFevdcb3q3GVNXSqxfxz5SmUBWV7juUUB-E4ViOMy5zp0031HOpFaXRyhoAM-1F0RG4i1Q3OoU1yCnxwLLO-XBvneLlnDEKnptjcxCAsYNQuO0EVeMYuI6xjap~XXQufcDqGj8Me-RsLcO7xeewWBPN8cy2pzot0-y518QprfZt95~gbTR5V8-CSJejqa1FOJlGEoWkZaZNCFmh19cYeus3LyEjB~Vpkq~o6cu0Feu~EEYIkSOUJaQ27kl5k1Aaijzi3rWXIOtQwwfcA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        //       alt="dp"
        //       className="sm-img"
        //     />
        //     <div className="details">
        //       <div className="wrapper">
        //         <div className="comment-profile">
        //           <p>Waqar Bloom</p>
        //           <span>24 August at 20:43</span>
        //         </div>
        //         <div className="comment-para">
        //           <p>
        //             I've seen awe-inspiring things that I thought I'd never be
        //             able to explain to another person.
        //           </p>
        //         </div>
        //       </div>
        //       <div className="data">
        //         <div className="data-item like">
        //           <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
        //           <p>Like</p>
        //         </div>
        //         <span>12k Likes</span>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="comment">
        //     <img
        //       src="https://s3-alpha-sig.figma.com/img/d837/517f/dc565bcb672f0b707f286b99e6a36e4f?Expires=1676246400&Signature=ceuMqzLgzbfA3U74gKVkMhvwujfMQdo63fM7Qs9LsTwaUSOWCCfwQ23Kblw96myz2cS-lQHFevdcb3q3GVNXSqxfxz5SmUBWV7juUUB-E4ViOMy5zp0031HOpFaXRyhoAM-1F0RG4i1Q3OoU1yCnxwLLO-XBvneLlnDEKnptjcxCAsYNQuO0EVeMYuI6xjap~XXQufcDqGj8Me-RsLcO7xeewWBPN8cy2pzot0-y518QprfZt95~gbTR5V8-CSJejqa1FOJlGEoWkZaZNCFmh19cYeus3LyEjB~Vpkq~o6cu0Feu~EEYIkSOUJaQ27kl5k1Aaijzi3rWXIOtQwwfcA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        //       alt="dp"
        //       className="sm-img"
        //     />
        //     <div className="details">
        //       <div className="wrapper">
        //         <div className="comment-profile">
        //           <p>Waqar Bloom</p>
        //           <span>24 August at 20:43</span>
        //         </div>
        //         <div className="comment-para">
        //           <p>
        //             I've seen awe-inspiring things that I thought I'd never be
        //             able to explain to another person.
        //           </p>
        //         </div>
        //       </div>
        //       <div className="data">
        //         <div className="data-item like">
        //           <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
        //           <p>Like</p>
        //         </div>
        //         <span>12k Likes</span>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        ""
      )}
    </Card>
  );
};

export default Post;
