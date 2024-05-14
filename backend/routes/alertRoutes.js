const express = require('express')
const router = express.Router()

const {sendAlert, getAlertHire, updateHireStatus} = require('../controllers/alertController.js')

    router.post('/send' , sendAlert)
    router.get('/hire/get', getAlertHire)
    router.put('/hire/update/:id', updateHireStatus)


module.exports = router;