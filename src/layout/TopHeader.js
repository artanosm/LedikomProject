import React, { useRef } from "react";
import { useNavigate} from "react-router-dom";
import classes from "./TopHeader.module.scss";
import { Facebook, Instagram, YouTube, Search } from "@mui/icons-material";

const TopHeader = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchRef.current.value;
    navigate(`/search?query=${searchQuery}`)
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.socialNetworkContainer}>
        <a href="https://facebook.com/">
          <Facebook />
        </a>
        <a href="https://instagram.com/">
          <Instagram />
        </a>
        <a href="https://youtube.com/">
          <YouTube />
        </a>
      </div>
      <form onSubmit={submitHandler} className={classes.inputContainer}>
        <input ref={searchRef} />
        <button type="submit" className={classes.searchButton}>
          <Search fontSize="small" />
        </button>
      </form>
    </div>
  );
};

export default TopHeader;