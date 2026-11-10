// const express = require('express');
// const db = require('./config/db'); // Assumes this exports your pg Pool or client
// const cors = require ("cors")


// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

// // Test PostgreSQL connection
// app.get("/test", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");

//     res.json({
//       success: true,
//       message: "PostgreSQL connected successfully!",
//       time: result.rows[0].now,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       success: false,
//       message: "Database connection failed",
//     });
//   }
// });
// // GET route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM users');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.get('/messages', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM messages');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/gallery_images',async(req,res) => {
//   try {
//     const result = await db.query('SELECT * FROM gallery_images');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error'});
//   }
// });

// // Get image by ID
// app.get('/gallery_images/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);

//     const result = await db.query(
//       'SELECT * FROM gallery_images WHERE id = $1',
//       [id]
//     );

//     if (result.rows.length > 0) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).json({ Message: 'Image not Found' });
//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();
app.use(cors());
const express = require("express");
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "https://your-frontend-domain.com"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use(express.json());

const db = require("./config/db");

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      success: true,
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
