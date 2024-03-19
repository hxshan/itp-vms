const express = require('express')

const { createmaintain } = require('../controllers/vehicemaintainController')

const router = express.Router()

router.post('/createMform', createmaintain)