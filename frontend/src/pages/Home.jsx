import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import splash from "/images/splash.jpg";
import { IoIosSearch } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [houses, setHouses] = useState("");
  const { user, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  // Fetch all houses
  useEffect(() => {
    axios
      .get("https://house-home.onrender.com/houses")
      .then((response) => {
        setHouses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(houses);
  }, []);

  /**
   * Handles search form submission by creating a URL query string
   * for the search term and navigating to the /search route.
   */
  const searchHandler = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    if (minPrice) urlParams.set("minPrice", minPrice);
    if (maxPrice) urlParams.set("maxPrice", maxPrice);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

    console.log(searchTerm);
  };

  return (
    <div>
      <div
        style={{
          height: "37rem",
          overflow: "hidden",
          backgroundImage: `url(${splash})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          repeat: "no-repeat",
          zIndex: "-1",
        }}
      >
        <Navbar />
        <div className="text-white flex flex-col justify-center items-center mt-32 mb-6 gap-4">
          <h1 className="text-4xl font-bold">House & Home</h1>
          <p className="text-xl font-medium">Welcome To Your Peace of Mind</p>
        </div>

        <form
          onSubmit={searchHandler}
          className="flex justify-self-center bg-white p-3 rounded items-center gap-3 flex-wrap mx-4 md:mx-auto md:max-w-fit"
        >
          <div className="flex items-center border-solid border border-slate-200 w-full md:w-80 gap-2 p-1 rounded h-10">
            <IoIosSearch className="text-slate-400" />
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Enter a location"
              className=" w-full outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              className="border border-slate-200 rounded h-10 p-2 w-full sm:w-28"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="border border-slate-200 rounded h-10 p-2 w-full sm:w-28"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold w-full sm:w-auto"
          >
            Search
          </button>
        </form>
      </div>
      <h1 className="ml-2 text-lg font-medium my-3">Houses</h1>
      <div className="flex flex-wrap justify-center">
        {Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house._id}
              style={{
                margin: "7px",
                padding: "10px",
                width: "320px",
              }}
              className="shadow-xl border border-neutral-200"
            >
              <h3 className="text-sm font-semibold bg-neutral-400 text-white px-1 rounded w-fit mb-1">
                {house.offer}
              </h3>
              <div className="max-w-xs overflow-hidden h-52 flex items-center justify-center">
                <img
                  src={`https://house-home.onrender.com/public/images/${house.images[0]}`}
                  alt={house.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className=" font-medium text-right">E{house.price}</p>
              <p className="text-lg font-medium ">{house.title}</p>
              <p className=" text-gray-600 font-medium">{house.location}</p>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <IoBedOutline />
                    {house.bedrooms}
                  </div>
                  <div className="flex gap-1 items-center">
                    <LiaBathSolid />
                    {house.bathrooms}
                  </div>
                  <div className="flex gap-1 items-center">
                    <IoCarSportOutline />
                    {house.carPort}
                  </div>
                </div>
                <Link to={`/houses/details/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold">
                    Info
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading houses...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
