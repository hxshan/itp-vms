const express = require('express')
const { addservice, getallservices, getservicesbytype } = require('../controllers/vehicleservice')

const router = express.Router()

router.post('/addservicenote', addservice)
router.get('/getservices', getallservices)
router.get('/getservices/:id', getservicesbytype)


module.exports = router