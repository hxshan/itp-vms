const express = require('express')  
const router = express.Router()


const {addHire, fetchHires,editHire, deleteHire} = require('../controllers/hireController')
const {fetchHiresRates, addHireRates, editHireRate} = require('../controllers/hireRatesController.js')

  router.get('/', fetchHires)

  router.post('/add', addHire)

  router.put('/edit/:id', editHire)

  router.delete('/:id', deleteHire)

  router.get('/rates', fetchHiresRates)

  router.post('/rates/add', addHireRates)

  router.put('/rates/edit/:id',editHireRate)

module.exports = router