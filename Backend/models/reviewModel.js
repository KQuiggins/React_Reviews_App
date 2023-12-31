import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  text: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
