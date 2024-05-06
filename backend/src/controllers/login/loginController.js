const pool = require("../../models/db.js");
const jwt = require('jsonwebtoken')
async function login(req, res) {
  const client = await pool.connect();
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query(
      "SELECT * FROM client WHERE username = $1 AND password=$2",
      [username, password]
    );
    if (rows.length > 0) {
      const token = jwt.sign({username },"Stack",{expiresIn:'10m'})
      res.json({token,success:true});
    } else
      res.json({success: false});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
}

module.exports = login;
