const express = require('express')  
const Auth = require('../middleware/Auth')
const {createContract, createClient, getContractbyID, getClientbyId} = require('../controllers/contractController')

const router = express.Router()

router.post('/:id/create',createContract)
router.post('/registerClient',createClient)
router.get('/viewClient/:id',getClientbyId)
router.get('/viewContract/:id',getContractbyID)

module.exports = router;