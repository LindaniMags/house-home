import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

/**
 * CreateHouse component renders a form for creating a new house listing.
 */
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

  /**
   * Handles changes to the file input field by updating the form data state
   * with the newly selected files.
   */
  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  /**
   * Handles the submission of the house creation form.
   * Prevents the default form submission behavior, constructs a FormData object
   * with all form fields
   */

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
      navigate(`/houses/dashboard/${user?.user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <AuthenticatedNavbar />
      <div className="flex justify-center items-center my-14">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          className="rounded p-4 shadow-2xl"
        >
          <div className="forms-con flex flex-col md:flex-row gap-6">
            <div className="house-form-con md:border-r border-slate-100 md:pr-6">
              <h1 className=" font-semibold border-b border-neutral-200 w-fit mb-2">
                Listing Details
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-grow">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-grow">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <label>Offer Type:</label>
                  <select
                    name="offer"
                    value={formData.offer}
                    onChange={handleChange}
                    className="border border-slate-400 max-w-md rounded p-2"
                  >
                    <option value="">Select offer type</option>
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-6">
                <div className="flex justify-between border-b border-slate-400 py-2">
                  <label>Car Port:</label>
                  <input
                    type="number"
                    name="carPort"
                    value={formData.carPort}
                    onChange={handleChange}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>
                <div className=" flex justify-between border-b border-slate-400 py-2">
                  <label>Bedrooms:</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>
                <div className=" flex justify-between border-b border-slate-400 py-2">
                  <label>Bathrooms:</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>
              </div>
              <div className="flex flex-col my-6 md:my-10">
                <label>Description:</label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-slate-400 rounded p-2 min-h-[100px]"
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
              <h1 className=" font-semibold border-b border-neutral-200 w-fit mb-2">
                Agent Details
              </h1>
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
            className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold w-full md:w-auto mt-4"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHouse;
