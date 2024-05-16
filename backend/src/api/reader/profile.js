const express = require('express')
const router = express.Router()

const profileInfo = require('../../controllers/reader/readerProfileController')

router.get('/',profileInfo)

module.exports = router