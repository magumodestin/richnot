require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost", // XAMPP (Apache)
      "http://localhost:5500", // VS Code Live Server
      "http://127.0.0.1:5500",
      "https://richnotweb.vercel.app", // deployed frontend
    ],
  }),
);

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "home.html"));
});

// ---------- Database (Supabase / PostgreSQL) ----------
// DATABASE_URL = the Supabase "Transaction pooler" connection string (port 6543)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

// ---------- Helpers ----------
function makeToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Table columns: id, name, email, password, role, created_at
// The frontend expects UserID / FirstName / LastName / Email / Role,
// so we convert here. The password hash is never sent to the browser.
function publicUser(user) {
  const parts = String(user.name || "")
    .trim()
    .split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");
  return {
    UserID: user.id,
    FirstName: firstName,
    LastName: lastName,
    Email: user.email,
    Role: user.role,
  };
}

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// ---------- Routes ----------
app.get("/api/ping", (req, res) => res.json({ ok: true }));

// TEMPORARY: shows the real database error. Delete this route when it works.
app.get("/api/dbtest", async (req, res) => {
  try {
    const r = await pool.query("SELECT COUNT(*) FROM users");
    res.json({ ok: true, users: r.rows[0].count });
  } catch (err) {
    res.json({
      ok: false,
      hasUrl: !!process.env.DATABASE_URL,
      error: err.message,
      code: err.code,
    });
  }
});

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const cleanRole = role === "lecturer" ? "lecturer" : "student";
    const cleanEmail = email.trim().toLowerCase();

    // Email already used?
    const { rows: existing } = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [cleanEmail],
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "This email is already registered" });
    }

    // Hash the password — never store it as plain text
    const passwordHash = await bcrypt.hash(password, 10);

    // RETURNING * gives us the new row back in one query
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name.trim(), cleanEmail, passwordHash, cleanRole],
    );
    const user = rows[0];

    res.status(201).json({ user: publicUser(user), token: makeToken(user) });
  } catch (err) {
    // 23505 = unique violation (two people registering the same email at once)
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "This email is already registered" });
    }
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.trim().toLowerCase(),
    ]);
    const user = rows[0];

    // Same message for both cases so attackers can't tell which emails exist
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ user: publicUser(user), token: makeToken(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ---------- Protected routes ----------
// Checks the token sent in the "Authorization: Bearer <token>" header
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }
  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }
}

// Returns the logged-in user, read fresh from the database
app.get("/api/me", requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.auth.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: publicUser(rows[0]) });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ---------- Start ----------
// Run the server only when started with `node server.js` (local use).
// On Vercel the exported app is used instead.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`RichNotes API running on http://localhost:${PORT}`),
  );
}

module.exports = app;
