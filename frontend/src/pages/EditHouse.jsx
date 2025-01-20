import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const EditHouse = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [carPort, setCarPort] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/houses/${id}`)
      .then((response) => {
        const house = response.data;
        setUserId(house.userId);
        setTitle(house.title);
        setPrice(house.price);
        setLocation(house.location);
        setCarPort(house.carPort);
        setBedrooms(house.bedrooms);
        setBathrooms(house.bathrooms);
        setDescription(house.description);
        setOffer(house.offer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHouse = {
      title,
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
      await axios.put(`http://localhost:3000/houses/${id}`, newHouse);
      navigate("/");
    } catch (error) {
      alert("Error creating house");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="houses/create" method="post">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Car Port:
          <input
            type="text"
            value={carPort}
            onChange={(e) => setCarPort(e.target.value)}
          />
        </label>
        <label>
          Bedrooms:
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Offer:
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
        </label>
        <button type="submit">Create House</button>
      </form>
    </div>
  );
};

export default EditHouse;
