import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { User } from "./models/userModel.js";
import router from "./routes/usersRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongodb = process.env.mongoDBURL || mongoDBURL;
const app = express();
const port = process.env.PORT || PORT;

app.use(express.json());

// app.use(cors({ origin: "https://www.househome.me" }));

const allowedOrigins = [
  "https://www.househome.me",
  "https://househome.onrender.com", // render's default dev server port
  "http://localhost:5173", // In case you use React's default port
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Serve static files from the "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/houses", router);

mongoose
  .connect(mongodb)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
