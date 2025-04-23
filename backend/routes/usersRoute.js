import express from "express";
import { User } from "../models/userModel.js";
import multer from "multer";
import path from "path";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

// Configure multer to store files in memory instead of disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

router.post("/upload", upload.array("files", 3), (req, res) => {
  console.log(req.file);
});

// Create a new house
router.post("/", upload.array("files", 10), async (req, res) => {
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

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file);
          imageUrls.push(result.url);
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          // Continue with other images even if one fails
        }
      }
    }

    const newHouse = {
      userId: req.body.userId,
      title: req.body.title,
      images: imageUrls, // Store Cloudinary URLs instead of filenames
      price: Number(req.body.price),
      location: req.body.location,
      carPort: Number(req.body.carPort),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      description: req.body.description,
      offer: req.body.offer,
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      whatsapp: req.body.whatsapp,
    };
    const house = await User.create(newHouse);
    console.log("Uploaded images:", imageUrls);
    return res.status(201).send(house);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all houses
router.get("/", async (req, res) => {
  try {
    const houses = await User.find({}).sort({
      createdAt: -1,
    });
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

    // Handle price parameters safely to avoid NaN
    let minPrice = 0;
    let maxPrice = Number.MAX_SAFE_INTEGER;

    try {
      if (req.query.minPrice && req.query.minPrice !== "") {
        const parsedMinPrice = Number(req.query.minPrice);
        if (!isNaN(parsedMinPrice)) {
          minPrice = parsedMinPrice;
        }
      }

      if (req.query.maxPrice && req.query.maxPrice !== "") {
        const parsedMaxPrice = Number(req.query.maxPrice);
        if (!isNaN(parsedMaxPrice)) {
          maxPrice = parsedMaxPrice;
        }
      }
    } catch (err) {
      console.log("Error parsing price parameters:", err.message);
    }
    // Parse bedrooms value, ensuring it's a number or null
    let bedrooms = null;
    try {
      if (req.query.bedrooms && req.query.bedrooms !== "") {
        const parsedBedrooms = parseInt(req.query.bedrooms, 10);
        if (!isNaN(parsedBedrooms)) {
          bedrooms = parsedBedrooms;
          console.log(
            "Parsed bedrooms from query:",
            req.query.bedrooms,
            "to number:",
            bedrooms
          );
        } else {
          console.log("Invalid bedroom value (NaN):", req.query.bedrooms);
        }
      }
    } catch (err) {
      console.log("Error parsing bedroom parameter:", err.message);
    }

    console.log("Search params:", {
      searchTerm,
      minPrice,
      maxPrice,
      bedrooms,
      rawMinPrice: req.query.minPrice,
      rawMaxPrice: req.query.maxPrice,
      rawBedrooms: req.query.bedrooms,
      bedroomsType: bedrooms !== null ? typeof bedrooms : "null",
    });

    // Start with base query
    const query = {
      location: { $regex: searchTerm, $options: "i" },
    };

    // Add price filter if valid
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      query.price = {};

      if (!isNaN(minPrice)) {
        query.price.$gte = minPrice;
      }

      if (!isNaN(maxPrice)) {
        query.price.$lte = maxPrice;
      }
    }

    // Add bedrooms filter if specified - using a simpler approach
    if (bedrooms !== null) {
      console.log("Bedrooms value type:", typeof bedrooms, "Value:", bedrooms);

      try {
        // Simpler approach: just use the numeric value for filtering
        if (bedrooms === 5) {
          // For 5+ bedrooms, use $gte operator
          query.bedrooms = { $gte: 5 };
          console.log("Using $gte query for 5+ bedrooms");
        } else {
          // For other bedroom counts, use exact match
          query.bedrooms = Number(bedrooms);
          console.log("Using exact match for bedrooms:", Number(bedrooms));
        }
      } catch (err) {
        // If there's an error with the bedroom filter, log it but don't apply the filter
        console.log("Error applying bedroom filter:", err.message);
        // Remove any partial bedroom filter that might have been applied
        delete query.bedrooms;
      }

      // Log all unique bedroom values in the database
      const uniqueBedrooms = await User.distinct("bedrooms");
      console.log("All unique bedroom values in DB:", uniqueBedrooms);

      // Log a sample query to verify
      const testQuery =
        bedrooms === 5
          ? { bedrooms: { $gte: 5 } }
          : { bedrooms: Number(bedrooms) };
      console.log("Test query:", JSON.stringify(testQuery));
      const sampleCount = await User.countDocuments(testQuery);
      console.log("Sample count for bedrooms query:", sampleCount);
    }

    console.log("MongoDB query:", JSON.stringify(query, null, 2));

    // Check if there are any houses in the database at all
    const totalCount = await User.countDocuments({});
    console.log("Total houses in database:", totalCount);

    // Check if there are any houses with bedrooms
    if (bedrooms !== null) {
      const anyBedroomsCount = await User.countDocuments({
        bedrooms: { $exists: true },
      });
      console.log("Houses with bedrooms field:", anyBedroomsCount);
    }

    // Execute the query
    const listings = await User.find(query);

    console.log("Found listings:", listings.length);

    // If no results, log a sample of houses to understand the data
    if (listings.length === 0 && bedrooms !== null) {
      const sampleHouses = await User.find({}).limit(3).select("bedrooms");
      console.log(
        "Sample houses bedrooms values:",
        sampleHouses.map((h) => h.bedrooms)
      );
    }
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
    console.log("Error in /houses/get route:", error);
    // Send more detailed error information
    res.status(500).send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
      query: req.query,
    });
  }
});

// Get all houses for a specific user
router.get("/dashboard/:id", async (req, res) => {
  try {
    const houses = await User.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    if (houses) {
      return res.status(200).send({ count: houses.length, data: houses });
    }
    return res.status(404).send({ message: "House not found" });
  } catch (error) {
    console.log("Error in /dashboard/:id route:", error);
    // Send more detailed error information
    res.status(500).send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
      id: req.params.id,
    });
  }
});

// Update a house by ID (without images)
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
    const updateData = {
      ...req.body,
      price: Number(req.body.price),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      carPort: Number(req.body.carPort),
    };
    const result = await User.findByIdAndUpdate(id, updateData);
    if (!result) {
      return res.status(404).send({ message: "House not found" });
    }
    return res.status(200).send({ message: "House updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Update a house with new images
router.put(
  "/update-with-images/:id",
  upload.array("files", 10),
  async (req, res) => {
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

      // Upload new images to Cloudinary
      const imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          try {
            const result = await uploadToCloudinary(file);
            imageUrls.push(result.url);
          } catch (uploadError) {
            console.error("Error uploading to Cloudinary:", uploadError);
            // Continue with other images even if one fails
          }
        }
      }

      // Prepare update data
      const updateData = {
        ...req.body,
        price: Number(req.body.price),
        bedrooms: Number(req.body.bedrooms),
        bathrooms: Number(req.body.bathrooms),
        carPort: Number(req.body.carPort),
      };

      // Only update images if new ones were uploaded
      if (imageUrls.length > 0) {
        updateData.images = imageUrls;
      }

      const result = await User.findByIdAndUpdate(id, updateData);
      if (!result) {
        return res.status(404).send({ message: "House not found" });
      }

      return res.status(200).send({
        message: "House updated successfully",
        imageUrls: imageUrls.length > 0 ? imageUrls : null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }
);

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
