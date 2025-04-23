import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";
import Footer from "../components/Footer";

const Search = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bedrooms = searchParams.get("bedrooms") || "";

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localBedrooms, setLocalBedrooms] = useState(bedrooms);

  const [error, setError] = useState(null);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching with params:", {
        searchTerm: localSearchTerm,
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
        bedrooms: localBedrooms,
      });

      // Build URL with query parameters
      // Use the appropriate base URL
      const baseUrl = "https://house-home.onrender.com";
      // const baseUrl = "http://localhost:5555"; // Uncomment for local testing

      let url = `${baseUrl}/houses/get?searchTerm=${encodeURIComponent(
        localSearchTerm || ""
      )}`;

      // Add price filters if provided
      if (localMinPrice)
        url += `&minPrice=${encodeURIComponent(localMinPrice)}`;
      if (localMaxPrice)
        url += `&maxPrice=${encodeURIComponent(localMaxPrice)}`;

      // Add bedrooms filter if provided
      if (localBedrooms)
        url += `&bedrooms=${encodeURIComponent(localBedrooms)}`;

      console.log("Request URL:", url);

      try {
        const response = await axios.get(url);
        console.log("Response:", response.data);

        if (Array.isArray(response.data)) {
          setListings(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Received invalid data format from server");
          setListings([]);
        }
      } catch (axiosError) {
        console.error(
          "Axios error:",
          axiosError.response?.data || axiosError.message
        );
        throw axiosError; // Re-throw to be caught by the outer catch block
      }
    } catch (error) {
      console.log("Error fetching listings:", error);
      setError(error.message || "Failed to fetch listings");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch listings when the component mounts or when URL parameters change
    fetchListings();
  }, [searchTerm, minPrice, maxPrice, bedrooms]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search form submitted with bedrooms:", localBedrooms);

    // Create new search parameters
    const newSearchParams = new URLSearchParams();

    // Only add parameters that have values
    if (localSearchTerm) newSearchParams.set("searchTerm", localSearchTerm);
    if (localMinPrice) newSearchParams.set("minPrice", localMinPrice);
    if (localMaxPrice) newSearchParams.set("maxPrice", localMaxPrice);
    if (localBedrooms) newSearchParams.set("bedrooms", localBedrooms);

    // Update URL with new search parameters
    setSearchParams(newSearchParams);

    // Fetch listings with the new parameters
    fetchListings();
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <div className="mx-2 my-3">
        <h1 className="text-lg font-medium mb-3">Search Results:</h1>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 items-center flex-wrap"
        >
          <div className="flex items-center border border-slate-200 rounded h-10 p-2">
            <IoIosSearch className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Enter location"
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
              }}
              className="outline-none w-48"
            />
          </div>
          <input
            type="number"
            placeholder="Min Price"
            value={localMinPrice}
            onChange={(e) => {
              setLocalMinPrice(e.target.value);
            }}
            className="border p-2 rounded w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localMaxPrice}
            onChange={(e) => {
              setLocalMaxPrice(e.target.value);
            }}
            className="border p-2 rounded w-32"
          />
          <select
            value={localBedrooms}
            onChange={(e) => {
              console.log("Bedroom selection changed to:", e.target.value);
              setLocalBedrooms(e.target.value);
            }}
            className="border p-2 rounded w-40 bg-white cursor-pointer h-10"
          >
            <option value="">Any Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800"
          >
            Update Results
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {error && (
          <div className="text-center w-full p-4 bg-red-100 border border-red-300 rounded mb-4">
            <p className="text-red-700">Error: {error}</p>
            <p className="text-red-600 mt-2">
              Please try again or contact support if the problem persists.
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-center w-full p-4">Loading...</p>
        ) : !searchTerm && !minPrice && !maxPrice && !bedrooms ? (
          <div className="text-center w-full p-4">
            <p className="text-xl text-gray-600">Enter search criteria</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center w-full p-4">
            <p className="text-xl text-gray-600">No Items Found</p>
            <p className="text-gray-500 mt-2">
              Search criteria:
              {searchTerm ? `Location: "${searchTerm}"` : ""}
              {minPrice ? `, Min Price: ${minPrice}` : ""}
              {maxPrice ? `, Max Price: ${maxPrice}` : ""}
              {bedrooms
                ? `, Bedrooms: ${bedrooms === "5" ? "5+" : bedrooms}`
                : ""}
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your search criteria.
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded text-left">
              <p className="font-medium">Debug Information:</p>
              <p className="text-sm">
                URL Parameters: {window.location.search}
              </p>
              <p className="text-sm">Local Bedrooms Value: {localBedrooms}</p>
              <p className="text-sm">Bedrooms Parameter: {bedrooms}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap mb-28 justify-center">
            {listings.map((listing) => (
              <div
                key={listing._id || listing.title}
                style={{
                  margin: "7px",
                  padding: "10px",
                  width: "320px",
                }}
                className="shadow-xl border border-neutral-200"
              >
                <h3 className="text-sm font-semibold bg-neutral-400 text-white px-1 rounded w-fit mb-1">
                  {listing.offer}
                </h3>
                <div className="max-w-xs overflow-hidden shadow-lg h-56 flex items-center justify-center">
                  <img
                    src={
                      listing.images && listing.images.length > 0
                        ? listing.images[0]
                        : "/images/splash.jpg"
                    }
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className=" font-medium text-right">E{listing.price}</p>
                <p className="text-lg font-medium ">{listing.title}</p>
                <p className=" text-gray-600 font-medium">{listing.location}</p>
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="flex gap-1 items-center">
                      <IoBedOutline />
                      {listing.bedrooms}
                    </div>
                    <div className="flex gap-1 items-center">
                      <LiaBathSolid />
                      {listing.bathrooms}
                    </div>
                    <div className="flex gap-1 items-center">
                      <IoCarSportOutline />
                      {listing.garage} 2
                    </div>
                  </div>
                  <Link to={`/houses/details/${listing._id}`}>
                    <button className="bg-green-600 text-white rounded h-10 p-1 px-5">
                      Info
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
