import { connect } from 'mongoose';

// Connect to the local MongoDB database
const connectDB = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/ReactReviews', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the local MongoDB database!');
  } catch (err) {
    console.error(err);
  }
}

export default connectDB;