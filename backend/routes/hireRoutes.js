const express = require('express')  
const router = express.Router()
const {addHire, fetchHires,editHire, deleteHire, generateCombinedReport } = require('../controllers/hireController')
const {fetchHiresRates, addHireRates, editHireRate} = require('../controllers/hireRatesController.js')
const{getHiresByDriverId,updateHireDriver,  getPastTripsForDriver, getSingleHire, getHiresByVehicleId} =   require('../controllers/driverController')

  router.get('/', fetchHires)

  router.get('/driver/:driverId', getHiresByDriverId)

  router.get('/past/:driverId', getPastTripsForDriver)

  router.get('/driver/trip/:id', getSingleHire)

  router.get('/vehicle/:vehicleId', getHiresByVehicleId)

  router.post('/add', addHire)

  router.put('/edit/:id', editHire)

  router.patch('/driverEdit/:id', updateHireDriver)

  router.delete('/:id', deleteHire)

  router.get('/rates', fetchHiresRates)

  router.post('/rates/add', addHireRates)

  router.put('/rates/edit/:id',editHireRate)

  router.get('/report', generateCombinedReport)

module.exports = router