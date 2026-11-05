require("dotenv").config();
const { Client } = require("pg");

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const { rows } = await client.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id",
    );
    console.log("Total users:", rows.length);
    console.table(rows);
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
