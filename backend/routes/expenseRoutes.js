const express = require('express')
const {
    createExpense,
    getAllExpenses,
    getExpense,
    deleteExpense,
    updateExpense
} = require('../controllers/expenseController')



const router = express.Router()

// get all finace 

router.get('/',getAllExpenses )

// get single finace 

router.get('/:id',getExpense)


router.post('/', createExpense)
   



router.delete('/:id', deleteExpense)

router.patch('/:id', updateExpense)

module.exports = router