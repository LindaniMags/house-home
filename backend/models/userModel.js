import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  carPort: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("Users", userSchema);
