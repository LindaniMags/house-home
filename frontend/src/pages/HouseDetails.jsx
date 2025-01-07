import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const HouseDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/houses/${id}`)
      .then((response) => {
        setHouse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1>Houses</h1>
      <Link to="/houses/create">
        <button>Add House</button>
      </Link>
      {house ? (
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
      ) : (
        <p>Loading houses...</p>
      )}
    </div>
  );
};

export default HouseDetails;
