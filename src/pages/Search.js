import React from "react";
import { useSearchParams } from "react-router-dom";
import Phones from "./Phones";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  return <Phones searchQuery={searchQuery} />;
};

export default Search;
