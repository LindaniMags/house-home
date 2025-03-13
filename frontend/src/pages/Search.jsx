import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";
import Footer from "../components/Footer";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  const fetchListings = async () => {
    setLoading(true);
    try {
      console.log("Fetching with params:", {
        searchTerm: localSearchTerm,
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
      });
      const response = await axios.get(
        `http://localhost:3000/houses/get?searchTerm=${localSearchTerm}&minPrice=${localMinPrice}&maxPrice=${localMaxPrice}`
      );
      console.log("Response:", response.data);
      setListings(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    if (localSearchTerm) newSearchParams.set("searchTerm", localSearchTerm);
    if (localMinPrice) newSearchParams.set("minPrice", localMinPrice);
    if (localMaxPrice) newSearchParams.set("maxPrice", localMaxPrice);
    setSearchParams(newSearchParams);
    fetchListings();
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <div className="mx-2 my-3">
        <h1 className="text-lg font-medium mb-3">Search Results:</h1>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 items-center flex-wrap"
        >
          <div className="flex items-center border border-slate-200 rounded h-10 p-2">
            <IoIosSearch className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Enter location"
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
              }}
              className="outline-none w-48"
            />
          </div>
          <input
            type="number"
            placeholder="Min Price"
            value={localMinPrice}
            onChange={(e) => {
              setLocalMinPrice(e.target.value);
            }}
            className="border p-2 rounded w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localMaxPrice}
            onChange={(e) => {
              setLocalMaxPrice(e.target.value);
            }}
            className="border p-2 rounded w-32"
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800"
          >
            Update Results
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : !searchTerm && !minPrice && !maxPrice ? (
          <div className="text-center w-full p-4">
            <p className="text-xl text-gray-600">Enter search criteria</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center w-full p-4">
            <p className="text-xl text-gray-600">No Items Found</p>
          </div>
        ) : (
          <div className="flex flex-wrap mb-28 justify-center">
            {listings.map((listing) => (
              <div
                key={listing._id || listing.title}
                style={{
                  margin: "7px",
                  padding: "10px",
                  width: "320px",
                }}
                className="shadow-xl border border-neutral-200"
              >
                <h3 className="text-sm font-semibold bg-neutral-400 text-white px-1 rounded w-fit mb-1">
                  {listing.offer}
                </h3>
                <div className="max-w-xs overflow-hidden shadow-lg h-56 flex items-center justify-center">
                  <img
                    src={`http://localhost:3000/public/images/${listing.images[0]}`}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className=" font-medium text-right">E{listing.price}</p>
                <p className="text-lg font-medium ">{listing.title}</p>
                <p className=" text-gray-600 font-medium">{listing.location}</p>
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

      <div className="w-full bottom-0 fixed">
        <Footer />
      </div>
    </div>
  );
};

export default Search;
