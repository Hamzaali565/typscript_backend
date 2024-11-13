import mongoose from "mongoose";
import { envVar } from "../Constants/getEnvVar";
// import * as dotenv from "dotenv";
// dotenv.config();

const connectDb = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(envVar("MONGODB_URI") as string);
    console.log(`database connected at ${connect.connection.host}`);
  } catch (error) {
    console.log("Failed to connect with database", error);
    process.exit(1);
  }
};

export { connectDb };
