import mongoose from "mongoose";

const connectDb = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("Missing MONGODB_URL environment variable");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("db connected");
  } catch (error) {
    console.error("db Error", error);
    throw error;
  }
};

export default connectDb;
