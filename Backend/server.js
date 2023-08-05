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

app.post("/api/addFeedback", async (req, res) => {
  try {
    const newFeedback = new Review(req.body);
    console.log("newFeedback", newFeedback);
    const savedFeedback = await newFeedback.save();
    res.json(savedFeedback);
    console.log("savedFeedback", savedFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/deleteFeedback/:id", async (req, res) => {
  try {
    const feedback = await Review.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback removed" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/updateFeedback/:id", async (req, res) => {
  try {
    const { rating, text } = req.body;
    const feedback = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, text },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});






app.listen(5000, () => {
  console.log(`Server running`);
});