const express = require('express')  
const router = express.Router()


const {addHire, fetchHires,editHire, deleteHire, getHiresByDriverId,updateHireDriver,  getPastTripsForDriver} = require('../controllers/hireController')

  router.get('/', fetchHires)

  router.get('/:driverId', getHiresByDriverId)

  router.get('/past/:driverId', getPastTripsForDriver)

  router.post('/add', addHire)

  router.post('/edit/:id', editHire)

  router.patch('/driverEdit/:id', updateHireDriver)

  router.delete('/:id', deleteHire)


module.exports = router