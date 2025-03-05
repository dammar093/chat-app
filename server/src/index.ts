import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, io, server } from "./lib/socket";

//import all router
import authRouter from "./routes/auth.route";
import connectDB from "./lib/db";

// connect to database
connectDB();

// configuration
dotenv.config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes middleware
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", socket => {
  console.log(`user connected: ${socket.id}`);

  socket.emit("message", "Hello from server");
  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
})
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});