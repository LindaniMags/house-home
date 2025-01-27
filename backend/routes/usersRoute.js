import express from "express";
import { User } from "../models/userModel.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  // This function is is used to specify the
  // folder where Multer will store the uploaded file.
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },

  /**
   * This function is used to specify the
   * filename of the uploaded file. The filename is a combination of the fieldname
   */
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

router.post("/upload", upload.array("files", 3), (req, res) => {
  console.log(req.file);
});

// Create a new house
router.post("/", upload.array("files", 3), async (req, res) => {
  try {
    if (
      !req.body.userId ||
      !req.body.title ||
      !req.body.price ||
      !req.body.location ||
      !req.body.carPort ||
      !req.body.bedrooms ||
      !req.body.bathrooms ||
      !req.body.description ||
      !req.body.offer
    ) {
      res.status(400).send({ message: "All fields are required" });
      return;
    }
    const newHouse = {
      userId: req.body.userId,
      title: req.body.title,
      images: req.files.map((file) => file.filename),
      price: req.body.price,
      location: req.body.location,
      carPort: req.body.carPort,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      description: req.body.description,
      offer: req.body.offer,
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      whatsapp: req.body.whatsapp,
    };
    const house = await User.create(newHouse);
    console.log(req.files);
    return res.status(201).send(house);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all houses
router.get("/", async (req, res) => {
  try {
    const houses = await User.find({});
    return res.status(200).send({ count: houses.length, data: houses });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Search for houses
router.get("/get", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";

    const listings = await User.find({
      location: { $regex: searchTerm, $options: "i" },
    });
    console.log(listings);

    return res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get a house by ID
router.get("/:id", async (req, res) => {
  try {
    const house = await User.findById(req.params.id);
    if (house) {
      return res.status(200).send(house);
    }
    return res.status(404).send({ message: "House not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all houses for a specific user
router.get("/dashboard/:id", async (req, res) => {
  try {
    const houses = await User.find({ userId: req.params.id });
    if (houses) {
      return res.status(200).send({ count: houses.length, data: houses });
    }
    return res.status(404).send({ message: "House not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Update a house by ID
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.userId ||
      !req.body.title ||
      !req.body.price ||
      !req.body.location ||
      !req.body.carPort ||
      !req.body.bedrooms ||
      !req.body.bathrooms ||
      !req.body.description ||
      !req.body.offer
    ) {
      res.status(400).send({ message: "All fields are required" });
      return;
    }
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "House not found" });
    }
    return res.status(200).send({ message: "House updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Delete a house by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "House not found" });
    }
    return res.status(200).send({ message: "House deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
