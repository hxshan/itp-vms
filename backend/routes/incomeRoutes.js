const express = require('express')
const {
    createIncome,
    getAllIncome,
    getIncome,
    deleteIncome,
    updateIncome
} = require('../controllers/incomeController')



const router = express.Router()

// get all finace 

router.get('/', getAllIncome )

// get single finace 

router.get('/:id',getIncome)


router.post('/',  createIncome)
   



router.delete('/:id', deleteIncome)

router.patch('/:id', updateIncome)

module.exports = router