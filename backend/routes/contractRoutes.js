const express = require('express')  
const Auth = require('../middleware/Auth')
const {createContract, createClient, getContractbyID, getClientbyId,getallContract,getallClients} = require('../controllers/contractController')

const router = express.Router()

router.post('/:id/create',createContract)
router.post('/createClient',createClient)
router.get('/viewClient/:id',getClientbyId)
router.get('/getContract/:id',getContractbyID)
router.get('/getAllContracts',getallContract)
router.get('/getClients',getallClients)

module.exports = router;