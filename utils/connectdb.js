import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connect");
  } catch (error) {
    console.error("db Error", error);
  }
};

export default connectDb;
