import mongoose from "mongoose";

async function connectDB() {
  // connect to database
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/chat-app");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;