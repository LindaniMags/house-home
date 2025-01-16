import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  useUser,
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const ProtectedPage = () => {
  const [houses, setHouses] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();

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

  if (!isLoaded || !isSignedIn) {
    return (
      <div>
        <h1>Protected Houses loading...</h1>
      </div>
    );
  }
  return (
    <SignedIn>
      <div>
        <h1>Protected Houses {user?.firstName}</h1>
        <UserButton />
        <Link to="/houses/create">
          <button>Add House</button>
        </Link>
        {Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house.id || house.title}
              style={{
                border: "1px solid aqua",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>
                <strong>Title: </strong>
                {house.title}
              </p>
              <p>
                <strong>id: </strong>
                {house._id}
              </p>
              <p>
                <strong>Price: </strong>
                {house.price}
              </p>
              <p>
                <strong>Location: </strong>
                {house.location}
              </p>
              <Link to={`/houses/details/${house._id}`}>
                <button>Info</button>
              </Link>
              <Link to={`/houses/edit/${house._id}`}>
                <button>Edit</button>
              </Link>
              <Link to={`/houses/delete/${house._id}`}>
                <button>Delete</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading houses...</p>
        )}
      </div>
    </SignedIn>
  );
};

export default ProtectedPage;
