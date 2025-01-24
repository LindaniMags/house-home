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
            <div className="flex justify-center items-center max-h-80 overflow-hidden mb-11">
              <img
                src={
                  house.images && house.images.length > 0
                    ? `http://localhost:3000/public/images/${house.images[0]}`
                    : "/images/splash.jpg"
                }
                alt={house.title || "House"}
                className="scale-75"
              />
            </div>

            <div className="text-con gap-6 flex justify-between">
              <div className="describe-con w-full max-w-xl">
                <div className="flex  justify-between">
                  <div>
                    <h1>{house.title}</h1>
                    <p>
                      <strong>Location: </strong>
                      {house.location}
                    </p>
                  </div>

                  <p>
                    <strong>Price: </strong>
                    {house.price}
                  </p>
                </div>
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
                </div>

                <p>{house.description}</p>
              </div>
              <div className="contacts w-full  max-w-sm h-fit p-6 border border-green-200 rounded-xl flex flex-col justify-center shadow-2xl">
                <div className="flex flex-col items-center">
                  <p>Bee</p>
                  <p>Nyosi</p>
                </div>
                <div className="email flex justify-between gap-2 py-2">
                  <p>Email</p>
                  <p>bee@email.com</p>
                </div>
                <div className="email flex justify-between gap-2 py-2 border-y border-green-200">
                  <p>Whatsapp</p>
                  <p>76123 4567</p>
                </div>
                <div className="email flex justify-between gap-2 py-2">
                  <p>Cell</p>
                  <p>76123 4567</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>House not found</div>
        )}
      </div>
    </div>
  );
};

export default HouseDetails;
