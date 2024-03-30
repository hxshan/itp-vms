const express = require('express')

const router = express.Router()

// get all finace 

router.get('/', (req,res) => {
    res.json({mssg: 'get all finances'})

})

// get single finace 

router.get('/:id', (req,res) => {
    res.json({mssg: 'get single finances'})

})


router.post('/:id', (req,res) => {
    res.json({mssg: 'post all finances'})

})

router.delete('/:id', (req,res) => {
    res.json({mssg: 'delete a finances'})

})

router.patch('/:id', (req,res) => {
    res.json({mssg: 'update all finances'})

})

module.exports = router