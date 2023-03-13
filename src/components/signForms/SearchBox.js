import  { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./SearchBox.module.scss";

const SearchBox = ({ closeMobileMenu=null }) => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchRef.current.value;
    searchRef.current.value = "";
    closeMobileMenu && closeMobileMenu();
    navigate(`/search/${searchQuery}`);
  };
  return (
    <>
      <form onSubmit={submitHandler} className={classes.inputContainer}>
        <input ref={searchRef} placeholder="Search..." />
        <button type="submit" className={classes.searchButton}>
          <SearchIcon
            fontSize="small"
            sx={{ color: { xs: "black", sm:"white" } }}
          />
        </button>
      </form>
    </>
  );
};

export default SearchBox;
