import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { UserButton, useUser } from "@clerk/clerk-react";

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
  const user = useUser();

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

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

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
      <div className="shadow-xl">
        <div className="flex  justify-between items-center p-4">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>
          <div className="flex gap-3">
            <Link to={`/houses/dashboard/${user.user?.id}`}>
              <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center my-14">
        <form
          onSubmit={handleSubmit}
          action="houses/create"
          method="post"
          className="  rounded p-4 shadow-2xl"
        >
          <div className="flex gap-4">
            <div className="flex flex-col  flex-grow">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
            </div>

            <div className="flex flex-col  flex-grow">
              <label>Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col  flex-grow">
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
            </div>

            <div className="flex flex-col  flex-grow">
              <label>Offer:</label>
              <input
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                className="border border-slate-400 max-w-md rounded p-2"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center ">
            <div className="flex justify-between border-b border-slate-400 py-2 mt-6">
              <label>Car Port:</label>
              <input
                type="text"
                value={carPort}
                onChange={(e) => setCarPort(e.target.value)}
                className="w-10 border-b	border-slate-400 rounded p-0.5"
              />
            </div>

            <div className=" flex justify-between border-b border-slate-400 py-2">
              <label>Bedrooms:</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-10 border-b	border-slate-400 rounded p-0.5"
              />
            </div>
            <div className=" flex justify-between border-b border-slate-400 py-2">
              <label>Bathrooms:</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-10 border-b	border-slate-400 rounded p-0.5"
              />
            </div>
          </div>

          <div className="flex flex-col my-10">
            <label>Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-slate-400 rounded p-2"
            />
          </div>
          <div className="border-b border-slate-400 py-2 mb-4 flex flex-col">
            <label>Upload Images:</label>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHouse;
