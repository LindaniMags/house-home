import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/react-router";

const CreateHouse = () => {
  const user = useUser();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    carPort: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    offer: "",
    userId: "1",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", formData.file);
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("carPort", formData.carPort);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("description", formData.description);
    data.append("offer", formData.offer);
    data.append("userId", user.id);
    try {
      await axios.post("http://localhost:3000/houses", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleSub = async (e) => {
    e.preventDefault();
    const newHouse = {
      title,
      userId,
      file,
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
    const formData = new FormData();
    formData.append("file", file);
    axios.post("http://localhost:3000/houses/upload", formData);
    console.log(file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <label>Upload Image:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Car Port:</label>
          <input
            type="text"
            name="carPort"
            value={formData.carPort}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Offer:</label>
          <input
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create House</button>
      </form>
    </div>
  );
};

export default CreateHouse;
