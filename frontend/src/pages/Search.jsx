import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Link, useNavigate } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import Navbar from "./Navbar";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

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
      <div className="shadow-xl">
        <div className="flex  justify-between items-center p-4 m-1">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>
          <div className="flex gap-3 ">
            {isSignedIn ? (
              <>
                <Link to={`/houses/dashboard/${user?.id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
                    Dashboard
                  </button>
                </Link>
                <UserButton />
              </>
            ) : (
              <SignInButton className="bg-green-600 text-white rounded h-10 p-1 px-5" />
            )}
          </div>
        </div>
      </div>
      <h1 className="ml-2 text-lg font-medium my-3">Search Results</h1>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap">
            {listings.map((listing) => (
              <div
                key={listing.id || listing.title}
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
