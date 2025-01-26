import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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

const Dashboard = () => {
  const [houses, setHouses] = useState("");
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    axios
      .get("http://localhost:3000/houses/dashboard/" + user?.id)
      .then((response) => {
        setHouses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(houses);
  }, []);

  return (
    <div>
      <div className="shadow-xl">
        <div className="flex  justify-between items-center p-4">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>
          <div className="flex gap-3">
            <Link to={`/houses/create`}>
              <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
                Create Listing
              </button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
      <h1 className="ml-2 text-lg font-medium my-3">My Dashboard</h1>
      <div className="flex flex-wrap">
        {Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house._id || house.title}
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
              <div className="max-w-xs overflow-hidden shadow-lg h-56 flex items-center justify-center">
                <img
                  src={`http://localhost:3000/public/images/${house.images[0]}`}
                  alt={house.title}
                  className="w-full h-full object-cover"
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
                    {house.carPort}
                  </div>
                </div>
                <Link to={`/houses/details/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-3">
                    Info
                  </button>
                </Link>
                <Link to={`/houses/edit/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-3">
                    Edit
                  </button>
                </Link>
                <Link to={`/houses/delete/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-3">
                    Delete
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

export default Dashboard;
