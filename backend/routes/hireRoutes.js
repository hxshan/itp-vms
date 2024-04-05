const express = require('express')  
const router = express.Router()


const {addHire, fetchHires,editHire, deleteHire} = require('../controllers/hireController')

  router.get('/', fetchHires)

  router.post('/add', addHire)

  router.put('/edit/:id', editHire)

  router.delete('/:id', deleteHire)


module.exports = router