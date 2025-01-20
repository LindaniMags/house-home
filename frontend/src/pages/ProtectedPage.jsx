import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";

const ProtectedPage = () => {
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
      <h1>Houses</h1>
      <Link to="/houses/create">
        <button>Add House</button>
      </Link>
      <SignInButton />
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
            <div>
              {house.images.map((image) => (
                <img
                  src={`http://localhost:3000/public/images/${image}`}
                  alt={house.title}
                />
              ))}
            </div>
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
  );
};

export default ProtectedPage;
