import Card from "../UI/Card";
import React, { useState } from "react";
import "./NewTweet.scss";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import ImageIcon from "@mui/icons-material/Image";
import PublicIcon from "@mui/icons-material/Public";
import { useAuth } from "../../hooks/auth";
import { useCreatePost } from "../../hooks/posts";
import { toast } from "react-toastify";
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

  const newPostHandler = async (data) => {
    console.log(data);
    if (data.text.trim().length === 0 && !selectedImage) {
      toast.info("Please enter something to post!");
      return;
    }
    console.log(selectedImage);
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
            <img
              src={
                !loading
                  ? user.displayImg
                    ? user.displayImg
                    : "https://static.vecteezy.com/system/resources/previews/007/407/996/original/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
                  : ""
              }
              alt=""
              className="bg-img"
            />
          )}
          <textarea
            id="story"
            name="story"
            placeholder="What's happening?"
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
            <div className="privacy">
              <select {...register("privacy")}>
                <option value="public">Public</option>
                <option value="private">Private to followers</option>
              </select>
            </div>
          </div>
          <Button
            className="story-btn"
            type="submit"
            disabled={postLoading || loading}
          >
            Tweet
          </Button>
        </div>
      </form>
      {/* <div>
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button
              onClick={() => {
                console.log(URL.createObjectURL(selectedImage));
                setSelectedImage(null);
              }}
            >
              Remove
            </button>
          </div>
        )}
        <br />

        <br />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div> */}
    </Card>
  );
};

export default NewTweet;
