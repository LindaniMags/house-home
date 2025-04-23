import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { useUser } from "@clerk/clerk-react";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

const Dashboard = () => {
  const [houses, setHouses] = useState("");
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    axios
      .get("https://house-home.onrender.com/houses/dashboard/" + user?.id)
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
      <AuthenticatedNavbar showCreateListing={true} />
      <h1 className="ml-2 text-lg font-medium my-3">My Dashboard</h1>
      <Link to="/houses/create" className="block md:hidden">
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 z-50">
          +
        </button>
      </Link>
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
                  src={
                    house.images && house.images.length > 0
                      ? house.images[0]
                      : "/images/splash.jpg"
                  }
                  alt={house.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-right">E{house.price}</p>
              <p className="text-lg font-medium">{house.title}</p>
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
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-3 hover:bg-green-800 hover:font-semibold">
                    Info
                  </button>
                </Link>
                <Link to={`/houses/edit/${house._id}`}>
                  <button className="bg-green-600 text-white rounded h-10 p-1 px-3 hover:bg-green-800 hover:font-semibold">
                    Edit
                  </button>
                </Link>
                <Link to={`/houses/delete/${house._id}`}>
                  <button className="bg-red-500 text-white rounded h-10 p-1 px-3 hover:bg-red-800 hover:font-semibold">
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
