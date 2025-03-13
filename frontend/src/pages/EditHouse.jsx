import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

// Edit a house
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

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();

  // Fetch house details
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

        setName(house.name);
        setCompany(house.company);
        setEmail(house.email);
        setPhone(house.phone);
        setWhatsapp(house.whatsapp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Update house details
  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  // Handle form submission
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
      name,
      company,
      email,
      phone,
      whatsapp,
    };
    try {
      await axios.put(`http://localhost:3000/houses/${id}`, newHouse);
      navigate(`/houses/dashboard/${user?.user.id}`);
    } catch (error) {
      alert("Error creating house");
      console.log(error);
    }
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <div className="flex justify-center items-center my-14">
        <form
          onSubmit={handleSubmit}
          action="houses/create"
          method="post"
          className="rounded p-4 shadow-2xl"
        >
          <div className="forms-con flex flex-col md:flex-row gap-6">
            <div className="house-form-con md:border-r border-slate-100 md:pr-6">
              <h1 className="font-semibold border-b border-neutral-200 w-fit mb-2">
                Listing Details
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-grow">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-grow">
                  <label>Price:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded p-2 border-slate-400 max-w-md"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <label>Offer Type:</label>
                  <select
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
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
                    value={carPort}
                    onChange={(e) => setCarPort(e.target.value)}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>

                <div className="flex justify-between border-b border-slate-400 py-2">
                  <label>Bedrooms:</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>
                <div className="flex justify-between border-b border-slate-400 py-2">
                  <label>Bathrooms:</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-16 md:w-10 border border-slate-400 rounded p-0.5 text-center"
                  />
                </div>
              </div>

              <div className="flex flex-col my-6 md:my-10">
                <label>Description:</label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              <h1 className="font-semibold border-b border-neutral-200 w-fit mb-2">
                Agent Details
              </h1>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="company"
                value={company}
                placeholder="Company Name"
                onChange={(e) => setCompany(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
              <input
                type="text"
                name="whatsapp"
                value={whatsapp}
                placeholder="WhatsApp Number"
                onChange={(e) => setWhatsapp(e.target.value)}
                className="border rounded p-2 border-slate-400 max-w-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold w-full md:w-auto mt-4"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHouse;
