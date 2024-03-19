const express = require('express')

const { createmaintain } = require('../controllers/vehicemaintainController')

const router = express.Router()

router.post('/createmainform', createmaintain)

module.exports=router