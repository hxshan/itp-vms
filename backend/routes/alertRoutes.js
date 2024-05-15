const express = require('express')
const router = express.Router()

const {sendAlert, getAlertHire, updateHireStatus,getAlertCaseFileById} = require('../controllers/alertController.js')

    router.post('/send' , sendAlert)
    router.get('/hire/get', getAlertHire)
    router.get('/caseFile/get/:id', getAlertCaseFileById)
    router.put('/hire/update/:id', updateHireStatus)


module.exports = router;