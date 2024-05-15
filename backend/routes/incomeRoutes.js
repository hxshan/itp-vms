const express = require('express')
const {
    createIncome,
    getAllIncome,
    getIncome,
    deleteIncome,
    updateIncome,
    getContractByVehicleID,
    getIncomebytrip,
    getIncomebyvehicle
} = require('../controllers/incomeController')
const Auth = require('../middleware/Auth')



const router = express.Router()

// get all finace 

router.get('/', getAllIncome )

// get single finace 

router.get('/:id',getIncome)

router.get('/contract/:vehicleId',getContractByVehicleID)

router.get('/vehicleIncome/:vehicleid',getIncomebyvehicle)

router.get('/tripIncome/:tripid',getIncomebytrip)


router.post('/',createIncome)
   



router.delete('/:id', Auth,deleteIncome)

router.patch('/:id', Auth,updateIncome)

module.exports = router