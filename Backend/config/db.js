import { connect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const MongoDB_URI = process.env.VITE_MONGODB_URI;



// Connect to the local MongoDB database
const connectDB = async () => {
  try {
    await connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB database!');
  } catch (err) {
    console.error(err);
  }
}

export default connectDB;