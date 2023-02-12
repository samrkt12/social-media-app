import Card from "../UI/Card";
import React, { useState } from "react";
import "./NewTweet.scss";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import PublicIcon from "@mui/icons-material/Public";
import ImageIcon from "@mui/icons-material/Image";
import { useAuth } from "../../hooks/auth";
import { useCreatePost } from "../../hooks/posts";
const NewTweet = ({ className }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, loading } = useAuth();
  const { createPost, loading: posting } = useCreatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const newPostHandler = async (data) => {
    const res = await createPost(data, user.id);
    if (res) reset();
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
              src={`https://ui-avatars.com/api/?name=${user.name}&length=1&background=random`}
              alt=""
              className="bg-img"
            />
          )}
          <textarea
            id="story"
            name="story"
            placeholder="What's happening?"
            {...register("story")}
          />
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
              />
            </label>
            {/* <div className="privacy">
              <PublicIcon style={{ cursor: "pointer", width: "20px" }} />
              <span>Everyone can reply</span>
            </div> */}
          </div>
          <Button className="story-btn" type="submit">
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
