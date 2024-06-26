const express = require('express')

const { completemaintain,createmaintain ,getallmaintains,getonemaintains, getonemaintain, editmaintain , deletemaintain, driverMaintenanceRequest } = require('../controllers/vehicemaintainController')

const router = express.Router()

router.post('/createmainform', createmaintain)
router.post('/expense/:id', completemaintain)
router.post('/driverMaintenanceRequest',driverMaintenanceRequest)
router.get('/allmaintains', getallmaintains)
router.get('/:id',getonemaintain)
router.get('/all/:id',getonemaintains)
router.put('/:id', editmaintain)
router.delete('/:id',deletemaintain)

module.exports = router