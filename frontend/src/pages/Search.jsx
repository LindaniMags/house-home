import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  //  console.log(searchTerm);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/houses/get?searchTerm=${searchTerm}`
        );
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  console.log(listings);
  //  useEffect(() => {
  //    axios
  //      .get(`http://localhost:3000/houses/get?${searchTerm}`)
  //      .then((response) => {
  //        setHouses(response.data.data);
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });
  //    console.log(houses);
  //  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {listings.map((listing) => (
            <div key={listing._id}>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
