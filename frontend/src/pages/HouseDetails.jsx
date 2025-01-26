import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

import { IoIosSearch } from "react-icons/io";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import splash from "/images/splash.jpg";
import Footer from "../components/Footer";

const HouseDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/houses/${id}`)
      .then((response) => {
        setHouse(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log(house);

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
      <div className="flex flex-col items-center gap-4 p-4 ">
        {loading ? (
          <div>Loading...</div>
        ) : house ? (
          <div className="w-5/6 max-w-6xl">
            <div className="images-con w-full flex justify-center items-center max-h-80 overflow-hidden mb-11 gap-1">
              <div className=" w-2/3 big-img flex justify-center items-center max-h-80 overflow-hidden">
                <img
                  src={
                    house.images && house.images.length > 0
                      ? `http://localhost:3000/public/images/${house.images[0]}`
                      : "/images/splash.jpg"
                  }
                  alt={house.title || "House"}
                  className=""
                />
              </div>
              <div className="w-1/3 smaller-imgs flex flex-col gap-1">
                <div className="flex justify-center items-center max-h-80 overflow-hidden">
                  <img
                    src={
                      house.images && house.images.length > 0
                        ? `http://localhost:3000/public/images/${house.images[1]}`
                        : "/images/splash.jpg"
                    }
                    alt={house.title || "House"}
                    className=""
                  />
                </div>
                <div className="flex justify-center items-center max-h-80 overflow-hidden">
                  <img
                    src={
                      house.images && house.images.length > 0
                        ? `http://localhost:3000/public/images/${house.images[2]}`
                        : "/images/splash.jpg"
                    }
                    alt={house.title || "House"}
                    className=""
                  />
                </div>
              </div>
            </div>

            <div className="text-con gap-6 flex justify-between">
              <div className="describe-con w-full max-w-xl">
                <div className="flex  justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold">{house.title}</h1>
                    <p className="text-lg text-gray-500 font-normal">
                      {house.location}
                    </p>
                  </div>

                  <p className="text-xl font-medium">E{house.price}</p>
                </div>
                <div className="flex justify-between text-2xl font-medium my-2">
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
                </div>

                <p className="text-zinc-900">{house.description}</p>
              </div>
              <div className="contacts w-full  max-w-sm h-fit p-6 border  rounded-xl flex flex-col justify-center shadow-2xl">
                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">{house.name}</p>
                  <p className="text-gray-500 px-2 border-b border-gray-300 ">
                    {house.company}
                  </p>
                </div>
                <div className="email flex justify-between gap-2 py-2 pb-4">
                  <p className="text-gray-500">Email</p>
                  <p>{house.email}</p>
                </div>
                <div className="email flex justify-between gap-2 py-4 border-y">
                  <p className="text-gray-500">Whatsapp</p>
                  <p>{house.whatsapp}</p>
                </div>
                <div className="email flex justify-between gap-2 py-4">
                  <p className="text-gray-500">Cell</p>
                  <p>{house.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>House not found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HouseDetails;
