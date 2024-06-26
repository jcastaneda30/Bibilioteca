const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = 3000

const routerLogin = require('./api/login/endPoints.js')
const routerRegister = require('./api/register/endPoints.js')
const routerProfile = require('./api/reader/profile.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST"]
}))

app.use('/login',routerLogin)
app.use('/register',routerRegister)
app.use('/',routerProfile)

app.listen(port,()=>{
    console.log(`Servidor en linea en el puerto ${port}`)
})


