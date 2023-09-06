import React from "react";
import { useAuth } from "../../hooks/auth";
import { useToggleFollowUser } from "../../hooks/users";
import Avatar from "../Avatar/Avatar";
import Card from "../UI/Card";
import FollowBtn from "../UI/FollowBtn";
import "./UserCard.scss";
const UserCard = ({ user }) => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { displayImg, name, following, followers, bio, id, coverImg } = user;
  const isFollowing = followers.includes(authUser?.id);
  const { toggleFollow, loading: followLoading } = useToggleFollowUser(
    id,
    isFollowing,
    authUser?.id
  );

  const coverImgSmall = `${coverImg}?w=300`;
  const coverImgMedium = `${coverImg}?w=600`;
  const coverImgLarge = coverImg;

  return (
    <Card className="user-card-container">
      <div className="first">
        <div className="profile-info">
          <Avatar uid={id} image={displayImg} className="bg-img" />
          <div className="info">
            <p>{name}</p>
            <span>{`${followers.length} followers`}</span>
          </div>
        </div>
        {!authLoading && authUser.id !== id && (
          <FollowBtn onClick={toggleFollow} isFollowing={isFollowing} />
        )}
      </div>
      <div className="second">
        <span>{bio}</span>
      </div>
      <div className="third">
        <img
          src={coverImgSmall}
          srcSet={`${coverImgSmall} 300w, ${coverImgMedium} 600w, ${coverImgLarge} 1200w`}
          sizes="(max-width: 600px) 100vw, 50vw"
          alt={`${name}-cover-pic`}
          loading="lazy"
        />
      </div>
    </Card>
  );
};

export default UserCard;
