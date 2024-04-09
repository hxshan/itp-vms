const express = require('express')  

const {addVehicle,editVehicle,changeStatusVehicle,getVehicle,getVehicles,recoverVehicle} = require('../controllers/vehicleController')

const router = express.Router()
router.post('/', addVehicle)
router.get('/:id', getVehicle)
router.patch('/:id', editVehicle)
router.patch('/delete/:id', changeStatusVehicle)
router.patch('/recover/:id', recoverVehicle)
router.get('/', getVehicles)

module.exports = router