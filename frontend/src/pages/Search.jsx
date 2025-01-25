import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Link, useNavigate } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";

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
        <div className="flex flex-wrap">
          {listings.map((listing) => (
            <div
              key={listing.id || listing.title}
              style={{
                border: "1px solid aqua",
                margin: "10px",
                padding: "10px",
                width: "fit-content",
              }}
              className="shadow-xl"
            >
              <h3>{listing.offer}</h3>
              <div className="max-w-xs rounded overflow-hidden shadow-lg h-56 flex items-center justify-center">
                <img
                  src={`http://localhost:3000/public/images/${listing.images[0]}`}
                  alt={listing.title}
                  className="w-full, h-auto"
                />
              </div>
              <p>
                <strong>Price: </strong>
                {listing.price}
              </p>
              <p>
                <strong>Title: </strong>
                {listing.title}
              </p>
              <p>
                <strong>Location: </strong>
                {listing.location}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <IoBedOutline />
                    {listing.bedrooms}
                  </div>
                  <div className="flex gap-1 items-center">
                    <LiaBathSolid />
                    {listing.bathrooms}
                  </div>
                  <div className="flex gap-1 items-center">
                    <IoCarSportOutline />
                    {listing.garage} 2
                  </div>
                </div>
                <Link to={`/houses/details/${listing._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
                    Info
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
