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
  images: {
    type: [String],
    required: false,
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
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    set: (v) => Number(v), // Ensure the value is always converted to a number when set
    get: (v) => Number(v), // Ensure the value is always returned as a number
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
  name: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  whatsapp: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("Users", userSchema);
