const express = require('express')  
const router = express.Router()
const {addHire, fetchHires,editHire, deleteHire } = require('../controllers/hireController')
const {fetchHiresRates, addHireRates, editHireRate} = require('../controllers/hireRatesController.js')
const{getHiresByDriverId,updateHireDriver,  getPastTripsForDriver} =   require('../controllers/driverController')

  router.get('/', fetchHires)

  router.get('/driver/:driverId', getHiresByDriverId)

  router.get('/past/:driverId', getPastTripsForDriver)

  router.post('/add', addHire)

  router.put('/edit/:id', editHire)

  router.patch('/driverEdit/:id', updateHireDriver)

  router.delete('/:id', deleteHire)

  router.get('/rates', fetchHiresRates)

  router.post('/rates/add', addHireRates)

  router.put('/rates/edit/:id',editHireRate)

module.exports = router