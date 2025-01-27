import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

/**
 * This component is used to delete a house. It renders a confirmation dialog
 * that asks the user if they are sure they want to delete the house
 */
const DeleteHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  /**
   * Deletes a house using the house ID from the URL parameters.
   */

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/houses/${id}`);
      navigate(`/houses/dashboard/${user?.id}`);
      alert("House deleted");
    } catch (error) {
      alert("Error deleting house");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-400 backdrop-blur-xs backdrop-grayscale">
      <div className="flex flex-col gap-5 items-center p-14 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold text-center">
          Are you sure you want to delete this house?
        </h1>
        <div className="flex gap-5">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded h-10 p-1 px-5 hover:bg-red-800 hover:font-semibold"
          >
            Delete House
          </button>
          <Link to={`/houses/dashboard/${user?.id}`}>
            <button className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteHouse;
