const pool = require("../../models/db.js");

async function profileInfo(req, res) {
  const client = await pool.connect();
  try {
    const { username } = req.body;
    const consultImg = "Select id,profile from reader where username=$1";
    const {rows} = await client.query(consultImg, [username]);
    const consultStates =
      "Select state,count(*) from book where user_id=$1 group by state";
    const estados = await client.query(consultStates, [rows[0].id]);
    console.log(estados)
  } catch (error) {
    console.log(error.message)
    res.send({ message: error.message });
  }
}

module.exports = profileInfo;


