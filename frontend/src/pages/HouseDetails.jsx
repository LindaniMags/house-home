import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { IoClose, IoMenu } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Footer from "../components/Footer";

//Get single house details
const HouseDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === house?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? house?.images?.length - 1 : prevIndex - 1
    );
  };
  // fetch house details
  useEffect(() => {
    axios
      .get(`https://house-home.onrender.com/houses/${id}`)
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
        <div className="flex justify-between items-center p-4 m-1">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>
          <div className="hidden md:flex gap-3">
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
          <div className="md:hidden">
            <button onClick={() => setShowMobileNav(!showMobileNav)}>
              {showMobileNav ? (
                <IoClose size={24} className="text-green-600" />
              ) : (
                <IoMenu size={24} className="text-green-600" />
              )}
            </button>
          </div>
        </div>
        {showMobileNav && (
          <div className="md:hidden bg-white shadow-md p-4">
            {isSignedIn ? (
              <>
                <Link
                  to={`/houses/dashboard/${user?.id}`}
                  className="block py-2 text-green-600 font-medium"
                  onClick={() => setShowMobileNav(false)}
                >
                  Dashboard
                </Link>
                <div className="py-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <div className="py-2">
                <SignInButton />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 p-4 w-full">
        {loading ? (
          <div>Loading...</div>
        ) : house ? (
          <div className="w-11/12 md:w-5/6 max-w-6xl">
            <div className="images-con w-full flex flex-col md:flex-row justify-center items-center max-h-[unset] md:max-h-80 overflow-hidden mb-11 gap-1">
              <div className="w-full md:w-2/3 big-img flex justify-center items-center max-h-[60vh] md:max-h-80 overflow-hidden relative group">
                <img
                  src={
                    house.images && house.images.length > 0
                      ? `https://house-home.onrender.com/public/images/${house.images[0]}`
                      : "/images/splash.jpg"
                  }
                  alt={house.title || "House"}
                  className="cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  See all photos
                </button>
              </div>
              <div className="w-full md:w-1/3 smaller-imgs flex flex-row md:flex-col gap-1 mt-1 md:mt-0">
                <div className="flex justify-center items-center max-h-80 overflow-hidden">
                  <img
                    src={
                      house.images && house.images.length > 0
                        ? `https://house-home.onrender.com/public/images/${house.images[1]}`
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
                        ? `https://house-home.onrender.com/public/images/${house.images[2]}`
                        : "/images/splash.jpg"
                    }
                    alt={house.title || "House"}
                    className=""
                  />
                </div>
              </div>
            </div>

            <div className="text-con gap-6 flex flex-col md:flex-row justify-between">
              <div className="describe-con w-full md:max-w-xl">
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
              <div className="contacts w-full md:max-w-sm h-fit p-6 border rounded-xl flex flex-col justify-center shadow-2xl mt-6 md:mt-0">
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-11/12 md:w-full max-w-6xl mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-5 right-0 text-white text-xl hover:text-gray-300 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
            >
              <IoClose />
            </button>
            <div className="relative">
              <img
                src={`https://house-home.onrender.com/public/images/${house.images[currentImageIndex]}`}
                alt={`Photo ${currentImageIndex + 1}`}
                className="w-full object-contain max-h-[70vh] md:max-h-[80vh]"
              />
              <button
                onClick={previousImage}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                <IoChevronBackOutline size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                <IoChevronForwardOutline size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                {currentImageIndex + 1} / {house.images.length}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4 overflow-x-auto">
              {house.images &&
                house.images.map((img, index) => (
                  <img
                    key={index}
                    src={`https://house-home.onrender.com/public/images/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className={`h-16 cursor-pointer ${
                      index === currentImageIndex
                        ? "border-2 border-green-600"
                        : "opacity-75"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HouseDetails;
