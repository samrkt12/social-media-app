import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import Card from "../UI/Card";
import "./SearchBar.scss";

const SearchBar = ({ searchKeyword, setSearchKeyword, placeholder }) => {
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const clearSearch = () => {
    setSearchKeyword("");
  };

  return (
    <Card className="search-bar component2">
      <div className="search-icon">
        <SearchOutlinedIcon />
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder={placeholder}
          value={searchKeyword}
          onChange={handleSearch}
        />
        {searchKeyword && (
          <div className="clear-icon" onClick={clearSearch}>
            <ClearIcon className="clear" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SearchBar;
