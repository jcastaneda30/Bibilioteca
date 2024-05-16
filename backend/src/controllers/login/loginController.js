const pool = require("../../models/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para verificar la contraseña
async function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Función para iniciar sesión
async function login(req, res) {
  const client = await pool.connect();
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query(
      "SELECT * FROM reader WHERE username = $1",
      [username]
    );

    if (rows.length === 0) {
      res.json({ success: false, message: "User does not exist" });
      return;
    }

    const correctPass = await verifyPassword(password, rows[0].sessionhash);
    if (!correctPass) {
      res.json({ success: false, message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ username }, "Stack", { expiresIn: "1m" });
    res.json({ token, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
}

module.exports = login;
