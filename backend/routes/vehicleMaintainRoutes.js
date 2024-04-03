const express = require('express')

const { createmaintain ,getallmaintains, getonemaintain, editmaintain , deletemaintain } = require('../controllers/vehicemaintainController')

const router = express.Router()

router.post('/createmainform', createmaintain)
router.get('/allmaintains', getallmaintains)
router.get('/:id',getonemaintain)
router.put('/:id', editmaintain)
router.delete('/:id',deletemaintain)

module.exports = router