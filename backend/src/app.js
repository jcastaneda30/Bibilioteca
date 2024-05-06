const express = require("express");
const { engine } = require("express-handlebars");
const myconecction = require("express-myconnection");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express()
app.set('port',4000)
app.set('port',4000)


app.listen(app.get('port'), ()=>{
    console.log('en linea ',app.get('port'))
})