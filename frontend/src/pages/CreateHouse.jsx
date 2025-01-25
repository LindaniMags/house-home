import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { UserButton, useUser } from "@clerk/clerk-react";

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

    name: "",
    company: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  if (!user) {
    console.log("User not found");
  }
  console.log("User object:", user.user?.id);
  console.log("User object:", user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        userId: user.user?.id,
      });
    }
  }, []);

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
    data.append("userId", formData.userId);

    data.append("name", formData.name);
    data.append("company", formData.company);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("whatsapp", formData.whatsapp);

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
      <div className="shadow-xl">
        <div className="flex  justify-between items-center p-4">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>
          <div className="flex gap-3">
            <Link to={`/houses/dashboard/${user?.id}`}>
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
          encType="multipart/form-data"
          method="post"
          className="  rounded p-4 shadow-2xl"
        >
          <div className="forms-con flex gap-6">
            <div className="house-form-con border-r border-slate-100 pr-6">
              <h1>Listing</h1>
              <div className="flex gap-4">
                <div className="flex flex-col  flex-grow">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>

                <div className="flex flex-col  flex-grow">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col  flex-grow">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>

                <div className="flex flex-col  flex-grow">
                  <label>Offer:</label>
                  <input
                    type="text"
                    name="offer"
                    value={formData.offer}
                    onChange={handleChange}
                    className="border border-slate-400 max-w-md rounded p-2"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <div className="flex justify-between border-b border-slate-400 py-2 mt-6">
                  <label>Car Port:</label>
                  <input
                    type="text"
                    name="carPort"
                    value={formData.carPort}
                    onChange={handleChange}
                    className="w-10 border-b	border-slate-400 rounded p-0.5"
                  />
                </div>
                <div className=" flex justify-between border-b border-slate-400 py-2">
                  <label>Bedrooms:</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-10 border-b	border-slate-400 rounded p-0.5"
                  />
                </div>
                <div className=" flex justify-between border-b border-slate-400 py-2">
                  <label>Bathrooms:</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-10 border-b	border-slate-400 rounded p-0.5"
                  />
                </div>
              </div>
              <div className="flex flex-col my-10">
                <label>Description:</label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
            </div>
            <div className="agent-form-con flex flex-col gap-6">
              <h1>Agent</h1>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                placeholder="Company Name"
                onChange={handleChange}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                onChange={handleChange}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone Number"
                onChange={handleChange}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                placeholder="WhatsApp Number"
                onChange={handleChange}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHouse;
