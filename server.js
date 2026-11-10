require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Test PostgreSQL connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      success: true,
      message: "PostgreSQL connected successfully!",
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get messages
app.get("/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get gallery images
app.get("/gallery_images", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM gallery_images");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get gallery image by ID
app.get("/gallery_images/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid image ID" });
    }

    const result = await db.query(
      "SELECT * FROM gallery_images WHERE id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
