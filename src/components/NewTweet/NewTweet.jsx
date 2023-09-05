import Card from "../UI/Card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import ImageIcon from "@mui/icons-material/Image";
import { useAuth } from "../../hooks/auth";
import { useCreatePost } from "../../hooks/posts";
import { toast } from "react-toastify";
import Avatar from "../Avatar/Avatar";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./NewTweet.scss";

const NewTweet = ({ className }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, loading } = useAuth();
  const { createPost, loading: postLoading } = useCreatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(newPostHandler)();
    }
  };
  const newPostHandler = async (data) => {
    if (data.text.trim().length === 0 && !selectedImage) {
      toast.info("Please enter something to post!");
      return;
    }
    const res = await createPost(data, user.id, selectedImage);
    if (res) {
      setSelectedImage(null);
      reset();
    }
  };

  return (
    <Card className={`new-tweet ${className ? className : ""}`}>
      <div className="title">
        <span>Tweet something</span>
      </div>
      <div className="line" />
      <form onSubmit={handleSubmit(newPostHandler)}>
        <div className="middle">
          {!loading && (
            <Avatar uid={user.id} image={user.displayImg} className="bg-img" />
          )}
          <textarea
            id="story"
            name="story"
            placeholder="What's happening?"
            onKeyDown={handleUserKeyPress}
            {...register("text")}
          />
        </div>
        <div>
          {selectedImage && (
            <div>
              <img
                alt="selected image"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="last">
          <div>
            <label htmlFor="file">
              <ImageIcon style={{ cursor: "pointer", width: "20px" }} />
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="image"
                accept="image/*"
                {...register("image")}
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </label>
          </div>
          <Button
            className="story-btn"
            type="submit"
            disabled={postLoading || loading}
          >
            {postLoading ? <LoadingSpinner w="43px" h="14px" /> : "Tweet"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default NewTweet;
