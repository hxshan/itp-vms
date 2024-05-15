const express = require('express')
const {
    createExpense,
    getAllExpenses,
    getReimbursmentByDriverId,
    getExpensesBytripId,
    getExpensesByvehicleId,
    getdriverWageBydriverId,
    getExpense,
    deleteExpense,
    updateExpense
} = require('../controllers/expenseController')
const Auth = require('../middleware/Auth')



const router = express.Router()

// get all finace 

router.get('/',getAllExpenses )

// get single finace 

router.get('/:id',getExpense)

router.get('/reimbursment/:driverId',getReimbursmentByDriverId)

router.get('/tripExpense/:tripId',getExpensesBytripId)

router.get('/vehicleExpense/:vehicleId', getExpensesByvehicleId)

router.get('/driverwage/:driverId',getdriverWageBydriverId)


router.post('/',createExpense)
   



router.delete('/:id', Auth,deleteExpense)

router.patch('/:id',Auth,updateExpense)

module.exports = router