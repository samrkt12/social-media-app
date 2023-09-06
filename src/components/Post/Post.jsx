import React from "react";
import Card from "../UI/Card";
import "./Post.scss";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import NewComment from "../Comment/NewComment";
import CommentsList from "../Comment/CommentsList";
import { useGetComments } from "../../hooks/comments";

const Post = ({ post }) => {
  const { userID, createdAt, postText, postImg, likes, saves, postID } = post;
  const { comments, loading } = useGetComments(postID);
  const smallImage = `${postImg}?w=300`;
  const mediumImage = `${postImg}?w=600`;
  const largeImage = postImg;

  return (
    <Card className="post">
      <PostHeader uid={userID} date={createdAt} postID={postID} />
      <div className="content">
        <p>{postText}</p>
      </div>
      {postImg && (
        <div className="image">
          <img
            src={smallImage}
            alt="post-image"
            srcSet={`${smallImage} 300w, ${mediumImage} 600w, ${largeImage} 1200w`}
            sizes="(max-width: 600px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      )}
      <div className="status">
        {!loading && <span>{`${comments.length} comments`}</span>}
        <span>{`${likes.length} Likes`}</span>
        <span>{`${saves.length} Saved`}</span>
      </div>
      <PostActions post={post} />
      <NewComment post={post} />
      <CommentsList post={post} />
    </Card>
  );
};

export default Post;
