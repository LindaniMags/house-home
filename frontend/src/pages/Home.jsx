import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import splash from "/images/splash.jpg";
import splash1 from "/images/splash1.jpg";
import splash2 from "/images/splash2.jpeg";
import { IoIosSearch } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Search from "./Search";

const Home = () => {
  const [houses, setHouses] = useState("");
  const { user, isSignedIn } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/houses")
      .then((response) => {
        setHouses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(houses);
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
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
          className="flex justify-self-center  bg-white h-12 p-1 rounded items-center gap-1"
        >
          <div className="flex items-center border-solid border border-slate-200 w-52 md:w-96 gap-2 p-1 rounded h-10">
            <IoIosSearch className="text-slate-400" />
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Enter a location"
              className=""
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5"
          >
            Search
          </button>
        </form>
      </div>
      <h1>Houses</h1>
      <div className="flex flex-wrap">
        {Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house.id || house.title}
              style={{
                border: "1px solid aqua",
                margin: "10px",
                padding: "10px",
                width: "fit-content",
              }}
              className="shadow-xl"
            >
              <h3>{house.offer}</h3>
              <div className="max-w-xs rounded overflow-hidden shadow-lg h-56 flex items-center justify-center">
                <img
                  src={`http://localhost:3000/public/images/${house.images[0]}`}
                  alt={house.title}
                  className="w-full, h-auto"
                />
              </div>
              <p>
                <strong>Price: </strong>
                {house.price}
              </p>
              <p>
                <strong>Title: </strong>
                {house.title}
              </p>
              <p>
                <strong>Location: </strong>
                {house.location}
              </p>
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
                    {house.garage} 2
                  </div>
                </div>
                <Link to={`/houses/details/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
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
    </div>
  );
};

export default Home;
