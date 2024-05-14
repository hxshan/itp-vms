const express = require('express')  

const {addVehicle,editVehicle,changeStatusVehicle,updateMileage,getVehicle,getVehicles,recoverVehicle,deleteVehicle,getAvailabilityByVehicleId,getAllVehicles} = require('../controllers/vehicleController')
const Auth = require('../middleware/Auth')

const router = express.Router()
router.post('/',Auth,addVehicle)
router.get('/:id', getVehicle)
router.get('/availability/:id', getAvailabilityByVehicleId)
router.patch('/:id', editVehicle)
router.patch('/delete/:id',Auth,changeStatusVehicle)
router.patch('/mileage/:id', updateMileage)
router.patch('/recover/:id',Auth,recoverVehicle)
router.delete('/:id', deleteVehicle)
router.get('/', getVehicles)

module.exports = router