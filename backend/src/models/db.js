const {Pool} = require('pg')

const config = {
    user:'postgres',
    host:'localhost',
    password:'3126803284Ja',
    database:'library'
}

const pool = new Pool(config)

module.exports = pool