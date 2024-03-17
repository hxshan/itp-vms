const express = require('express')  

const {addVehicle,editVehicle,deleteVehicle,getVehicle} = require('../controllers/vehicleController')
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router()

router.post('/addVehicle',addVehicle)
router.get('/:id', getVehicle)
router.patch('/:id', editVehicle)
router.delete('/:id', deleteVehicle)

module.exports = router