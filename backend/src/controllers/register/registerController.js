const pool = require("../../models/db.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

async function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}
async function register(req, res) {
  const client = await pool.connect();
  try {
    const { username, email, password } = req.body;
    const hash = await generateHash(password);
    const image = await readFileAsync("src/assets/defaultProfilePicture.jpg");
    const consult =
      "INSERT INTO reader(username,email,sessionHash,profile) VALUES($1,$2,$3,$4)";
    await client.query(consult, [username, email, hash, image]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
}

module.exports = register;
