const { error } = require("qrcode-terminal");
const pool = require("../../models/db.js");
async function register(req,res){
    const client = await pool.connect()
    try{
        const {username,email,password} = req.body
        const consult = 'INSERT INTO client(username,email,password) values($1,$2,$3)'
        await client.query(consult,[username,email,password],(err,result)=>{
            console.log(result)
            if(err) res.send({success:false, error:error})
            else res.send({success:true})
        })
    }catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      } finally {
        client.release();
      }
}

module.exports = register