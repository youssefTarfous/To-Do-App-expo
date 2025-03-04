import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  console.error("Error: MONGODB_CONNECTION_STRING is not defined in the .env file.");
  process.exit(1);
}

console.log("Connecting to MongoDB...");

mongoose.set("debug", true);

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database :", connectionString);
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });

// Keep the script running
setInterval(() => {}, 1000);

// Handle uncaught errors
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
