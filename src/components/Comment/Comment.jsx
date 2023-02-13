import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { formatDistanceToNow } from "date-fns";
import { useGetUser } from "../../hooks/users";

const Comment = ({ comment }) => {
  const { userID, commentText, createdAt, commentID } = comment;
  const { user, loading: userLoading } = useGetUser(userID);
  if (userLoading) return <p>Loading ...</p>;
  return (
    <div className="comment">
      <img src={user.displayImg} alt="dp" className="sm-img" />
      <div className="details">
        <div className="wrapper">
          <div className="comment-profile">
            <p>{user.name}</p>
            <span>{`${formatDistanceToNow(createdAt)} ago`}</span>
          </div>
          <div className="comment-para">
            <p>{commentText}</p>
          </div>
        </div>
        <div className="data">
          <div className="data-item like">
            <FavoriteBorderOutlinedIcon style={{ fontSize: "13px" }} />
            <p>Like</p>
          </div>
          <span>{`${0} Likes`}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
