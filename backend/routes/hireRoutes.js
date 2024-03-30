const express = require('express')  
const router = express.Router()


const {addHire, fetchHires, deleteHire} = require('../controllers/hireController')

  router.get('/', fetchHires)

  router.post('/add', addHire)

  router.delete('/:id', deleteHire)


module.exports = router