import mongoose from "mongoose";

// Connect to MongoDB
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_LINK);
    console.log("Mongoose Connected to MongoDB", connection.connection.host);
  } catch (error) {
    console.log("Error ocurred while Connecting Db", error.message);
    process.exit(1); //here 1 represents error and 0 represents success
  }
};
