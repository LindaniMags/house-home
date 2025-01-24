import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  console.log(searchTerm);

  return (
    <div>
      Search
      <h1>{searchTerm}</h1>
    </div>
  );
};

export default Search;
