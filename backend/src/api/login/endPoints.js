const express = require('express')
const router = express.Router()
const login = require('../../controllers/login/loginController.js')


router.post('/',login)
module.exports = router