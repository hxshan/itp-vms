const express = require('express')  
const router = express.Router()
const Auth =require('../middleware/Auth')
const {addHire, fetchHires,editHire, deleteHire, generateCombinedReport, fetchVehicles, getHireById } = require('../controllers/hireController')
const {fetchHiresRates, addHireRates, editHireRate} = require('../controllers/hireRatesController.js')
const{getHiresByDriverId,updateHireDriver,  getPastTripsForDriver, getSingleHire, getHiresByVehicleId} =   require('../controllers/driverController')


  router.get('/', fetchHires)
  
  router.get('/get/:id', getHireById)

  router.get('/driver/:driverId', getHiresByDriverId)

  router.get('/past/:driverId', getPastTripsForDriver)

  router.get('/driver/trip/:id', getSingleHire)

  router.get('/vehicle/:vehicleId', getHiresByVehicleId)

  router.post('/add',Auth,addHire)

  router.put('/edit/:id',Auth,editHire)

  router.patch('/driverEdit/:id', updateHireDriver)

  router.put('/cancel/:id',Auth,deleteHire)

  router.get('/rates', fetchHiresRates)

  router.post('/rates/add', addHireRates)

  router.put('/rates/edit/:id',editHireRate)

  router.get('/report', generateCombinedReport)

  router.get('/vehicles', fetchVehicles)

module.exports = router