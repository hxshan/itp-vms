const express = require('express')  
const router = express.Router()

let Hire = require('../models/hireModel')

router.route('/').get((req,res) => {
    Hire.find()
        .then(hires => res.json(hires))
        .catch(err => res.status(400).json('Error: ' + err))
})

//Add new hire
router.post('/add', async (req, res) => {
    try {
      const {
        startDate,
        endDate,
        vehicleType,
        vehicleSubcategory,
        passengerCount,
        airCondition,
        vehicle,
        driver,
        startPoint,
        endPoint,
        tripType,
        distence,
        cusName,
        cusEmail,
        cusMobile,
        cusNic,
        estimatedTotal,
        finalTotal,
        advancedPayment,
      } = req.body;
  
      const newHire = new Hire({
        startDate,
        endDate,
        vehicleType,
        vehicleSubcategory,
        passengerCount,
        airCondition,
        vehicle,
        driver,
        startPoint,
        endPoint,
        tripType,
        distence,
        cusName,
        cusEmail,
        cusMobile,
        cusNic,
        estimatedTotal,
        finalTotal,
        advancedPayment,
      });
  
      await newHire.save();
  
      res.status(201).json({ message: 'Hire added successfully' });
    } catch (error) {
      console.error('Error adding hire:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router