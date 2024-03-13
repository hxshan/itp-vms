const express = require('express')  

const {addVehicle,editVehicle,deleteVehicle,getVehicle} = require('../controllers/vehicleController')

const router = express.Router()

router.post('/addVehicle', addVehicle)
router.get('/getVehicle', getVehicle)
router.patch('/editVehicle', editVehicle)
router.delete('/deleteVehicle', deleteVehicle)

module.exports = router