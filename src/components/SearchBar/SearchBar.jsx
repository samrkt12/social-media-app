import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Card from "../UI/Card";
import "./SearchBar.scss";
import Button from "../UI/Button";

const SearchBar = () => {
  return (
    <Card className="search-bar">
      <div className="search-icon">
        <SearchOutlinedIcon />
      </div>
      <div className="input-field">
        <input type="text" placeholder="Search" />
      </div>
      <Button className="search-btn">Search</Button>
    </Card>
  );
};

export default SearchBar;
