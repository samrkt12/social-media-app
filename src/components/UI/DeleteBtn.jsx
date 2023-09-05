import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./DeleteBtn.scss";
const DeleteBtn = ({ onClick, isLong, className }) => {
  return (
    <button
      type="button"
      className={`del-container ${className ? className : ""}`}
      onClick={onClick}
    >
      <DeleteIcon className="del-icon" />
      {isLong && <span>Delete</span>}
    </button>
  );
};

export default DeleteBtn;
