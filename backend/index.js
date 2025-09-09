import "dotenv/config";
import express from "express";
import cors from "cors";

// --- Placeholder Route Imports (we will create these files next) ---
// import projectRoutes from './routes/projects.js';
// import generationRoutes from './routes/generation.js';

const app = express();
const PORT = process.env.PORT || 3001;

// --- 1. Core Middleware ---
app.use(cors()); // Allows your frontend to communicate with this backend
app.use(express.json()); // Parses incoming JSON request bodies

// Simple request logger to see incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// --- 2. API Routes ---
// We'll uncomment these as we build each route file.
// app.use('/api', projectRoutes);       // Handles /projects, /save, /download
// app.use('/api', generationRoutes);    // Handles /generate, /explain

// A simple test route to ensure the server is running
app.get("/api", (req, res) => {
  res.status(200).json({ message: "API is online and ready!" });
});

// --- 3. Centralized Error Handling ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

// --- 4. Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
