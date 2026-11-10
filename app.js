const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "0852",
    database: "test"
});

// Login API
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await db.query(
            `SELECT id, name, role, email
             FROM users
             WHERE email = $1 AND password = $2`,
            [email, password]
        );

        if (result.rows.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: result.rows[0]
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});