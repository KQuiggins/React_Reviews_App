import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import Review from "./models/reviewModel.js";


dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies



app.get("/", (req, res) => {
    res.send("Server is ready");
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const allFeedback = await Review.find({}); // Fetch all feedback from the database
      res.json(allFeedback);
      console.log("allFeedback", allFeedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Server error" });
    }
  });



app.listen(5000, () => {
  console.log(`Server running`);
});