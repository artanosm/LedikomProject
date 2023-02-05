import React from "react";
import { useSearchParams } from "react-router-dom";
import PhonesList from "../components/PhonesList";
// import Phones from "./Phones";
const Search = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search").toLocaleLowerCase();
  return (
    <div style={{ display:'flex',flexDirection:'column' ,justifyContent:'center', alignItems: 'center'}}>
      <h4 style={{color: 'gray'}}>Search results for: {searchQuery}</h4>
      <PhonesList searchQuery={searchQuery} />
    </div>
  );

  // return <Phones searchQuery={searchQuery} />;
};

export default React.memo(Search);
