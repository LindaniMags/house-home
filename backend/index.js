import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { User } from "./models/userModel.js";
import router from "./routes/usersRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/houses", router);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
