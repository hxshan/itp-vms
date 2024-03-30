const express = require('express')  

const {addVehicle,editVehicle,deleteVehicle,getVehicle,getVehicles} = require('../controllers/vehicleController')

const router = express.Router()
router.post('/', addVehicle)
router.get('/:id', getVehicle)
router.patch('/:id', editVehicle)
router.delete('/:id', deleteVehicle)
router.get('/', getVehicles)

module.exports = router