import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import Review from "./models/reviewModel.js";


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON request bodies



// app.get("/", (req, res) => {
//     res.send("Server is ready");
// });




app.get("/api/feedback", async (req, res) => {
try {
  const allFeedback = await Review.find({}); // Fetch all feedback from the database
  res.json(allFeedback);

} catch (error) {
  console.error("Error fetching feedback:", error);
  res.status(500).json({ message: "Server error" });
}

});

app.post("/api/addFeedback", async (req, res) => {
  try {
    const newFeedback = new Review(req.body);

    const savedFeedback = await newFeedback.save();
    res.json(savedFeedback);

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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Any route that is not api route, we want to load index.html
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));

} else {

  app.get("/", (req, res) => {
    res.send("Server is ready");
  });

}



app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});