const express = require('express')  

const {addVehicle,editVehicle,changeStatusVehicle,updateMileage,getVehicle,getVehicles,recoverVehicle,deletePost,getAvailabilityByVehicleId} = require('../controllers/vehicleController')

const router = express.Router()
router.post('/', addVehicle)
router.get('/:id', getVehicle)
router.get('/availability/:id', getAvailabilityByVehicleId)
router.patch('/:id', editVehicle)
router.patch('/delete/:id', changeStatusVehicle)
router.patch('/mileage/:id', updateMileage)
router.patch('/recover/:id', recoverVehicle)
router.delete('/:id', deletePost)
router.get('/', getVehicles)

module.exports = router