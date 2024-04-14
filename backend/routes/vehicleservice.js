const express = require('express')
const { addservice, getallservices } = require('../controllers/vehicleservice')

const router = express.Router()

router.post('/addservicenote', addservice)
router.get('/getservices', getallservices)


module.exports = router