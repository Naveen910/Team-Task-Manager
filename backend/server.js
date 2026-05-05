// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* ✅ FIXED CORS */
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://zoological-smile-production-42a9.up.railway.app" 
  ],
  credentials: true
}));

app.use(express.json());

/* ✅ DB */
connectDB();

/* ✅ Routes (NO duplicates) */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

/* ✅ Health check */
app.get("/", (req, res) => res.send("API running"));

/* ✅ PORT FIX */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));