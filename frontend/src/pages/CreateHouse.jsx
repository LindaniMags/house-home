import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/react-router";

const CreateHouse = () => {
  const user = useUser();
  const [userId, setUserId] = useState("1");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [carPort, setCarPort] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHouse = {
      title,
      file,
      userId,
      price,
      location,
      carPort,
      bedrooms,
      bathrooms,
      description,
      offer,
    };
    try {
      await axios.post("http://localhost:3000/houses", newHouse);
      navigate("/");
    } catch (error) {
      alert("Error creating house");
      console.log(error);
    }
  };
  const handleUpload = () => {
    console.log(file);
  };

  return (
    <div>
      <div>
        <label>Upload Image:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Car Port:</label>
          <input
            type="text"
            value={carPort}
            onChange={(e) => setCarPort(e.target.value)}
          />
        </div>
        <div>
          <label>Bedrooms:</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>
        <div>
          <label>Bathrooms:</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Offer:</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
        </div>
        <button type="submit">Create House</button>
      </form>
    </div>
  );
};

export default CreateHouse;
