import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./SettingsForm.scss";
import Button from "../UI/Button";
import { useUpdateUser } from "../../hooks/users";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SettingsForm = ({ setIsFormPage, user }) => {
  const [selectedDisplayImage, setSelectedDisplayImage] = useState(
    user.displayImg
  );
  const [selectedCover, setSelectedCover] = useState(user.coverImg);
  const [bioValue, setBioValue] = useState(user.bio);
  const [nameValue, setNameValue] = useState(user.name);
  const [isDpChosen, setIsDpChosen] = useState(false);
  const [isCoverChosen, setIsCoverChosen] = useState(false);
  const { updateUser, loading: updateLoading } = useUpdateUser(user.id);
  const navigate = useNavigate();
  const goBackHandler = () => {
    setIsFormPage(false);
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (
      nameValue === user.name &&
      bioValue === user.bio &&
      !isDpChosen &&
      !isCoverChosen
    ) {
      setIsFormPage(false);
      return;
    }
    const res = await updateUser({
      nameValue,
      bioValue,
      selectedCover,
      selectedDisplayImage,
      isDpChosen,
      isCoverChosen,
    });
    if (res) {
      toast.success("Profile Updated");
      navigate(0);
    }
  };
  return (
    <div className="settings-form">
      <button className="back-btn" type="button" onClick={goBackHandler}>
        <ArrowBackIosIcon className="icon" />
        <span>Back</span>
      </button>
      <form onSubmit={updateProfileHandler}>
        <div className="item form-header">
          <h3>Change Info</h3>
          <p>Changes will be reflected to every services</p>
        </div>
        <div className="item">
          <label htmlFor="yourName">Name</label>
          <input
            type="text"
            name="name"
            id="yourName"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>

        <div className="item img-container">
          <div className="dp-container">
            <CameraAltIcon className="form-camera-icon" />
            {isDpChosen ? (
              <img
                src={URL.createObjectURL(selectedDisplayImage)}
                alt="display-picture"
              />
            ) : (
              <img src={selectedDisplayImage} alt="display-picture" />
            )}
          </div>
          <label htmlFor="displayImg" className="change-btn">
            Change profile picture
          </label>
          <input
            type="file"
            id="displayImg"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(event) => {
              setIsDpChosen(true);
              setSelectedDisplayImage(event.target.files[0]);
            }}
          />
        </div>

        <div className="item img-container">
          <div className="cover-container">
            <CameraAltIcon className="form-camera-icon" />
            {isCoverChosen ? (
              <img src={URL.createObjectURL(selectedCover)} alt="cover" />
            ) : (
              <img src={selectedCover} alt="cover" />
            )}
          </div>
          <label htmlFor="cover" className="change-btn">
            Change cover
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(event) => {
              setIsCoverChosen(true);
              setSelectedCover(event.target.files[0]);
            }}
          />
        </div>
        <div className="item">
          <label htmlFor="settings-bio">Bio</label>
          <textarea
            name="bio"
            id="settings-bio"
            rows="4"
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
          ></textarea>
        </div>
        <div className="item">
          <label htmlFor="email">Email </label>
          <input type="text" name="email" readOnly defaultValue={user.email} />
        </div>
        <Button className="save-btn" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default SettingsForm;
