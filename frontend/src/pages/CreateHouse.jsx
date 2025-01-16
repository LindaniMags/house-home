import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

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
    userId: "",
    files: [],
  });

  if (!user) {
    console.log("User not found");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("carPort", formData.carPort);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("description", formData.description);
    data.append("offer", formData.offer);
    data.append("userId", formData.user.id);

    for (let i = 0; i < formData.files.length; i++) {
      data.append("files", formData.files[i]);
    }

    try {
      await axios.post("http://localhost:3000/houses", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
          />
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
