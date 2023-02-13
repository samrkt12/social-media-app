import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useGetUser } from "../../hooks/users";
const PostHeader = ({ id, date }) => {
  const { user, loading } = useGetUser(id);
  if (loading) return <p>Loading user...</p>;
  return (
    <div className="owner">
      <img src={user.displayImg} alt="dp" className="bg-img" />
      <div className="title">
        <p>{user.name}</p>
        <span>{`${formatDistanceToNow(date)} ago`}</span>
      </div>
    </div>
  );
};

export default PostHeader;
