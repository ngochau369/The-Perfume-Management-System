import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.MONGODB_URL;

export const databaseConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("dburl:", dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
