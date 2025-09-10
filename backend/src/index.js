import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // must be at the top

import { connectDB } from "./config/dbconfig.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares (keep them before routes)

app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  credentials: true                 // allow cookies/authorization headers
}));
app.use(cookieParser());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("hey buddy"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

export default app;
