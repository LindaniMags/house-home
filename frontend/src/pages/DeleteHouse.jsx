import React from "react";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const DeleteHouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/houses/${id}`);
      navigate("/");
      alert("House deleted");
    } catch (error) {
      alert("Error deleting house");
      console.log(error);
    }
  };

  return <button onClick={handleDelete}>DeleteHouse</button>;
};

export default DeleteHouse;
