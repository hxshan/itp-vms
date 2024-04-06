const hireRates = require("../models/hireRatesModel")
const {v4: uuid} = require('uuid')
const mongoose = require('mongoose');

//Fetch all the hires rates
const fetchHiresRates = async (req, res) => {
    try {
      hireRates.find()
          .then(hiresRate => res.json(hiresRate))
          .catch(err => res.status(400).json('Error: ' + err))
    } catch (error) {
      console.error('Error fetching hire:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  const addHireRates = async (req, res) => {
    try {
        const {
            vehicleCatagory,
            baseRate,
            baseDistence,
            additionalRate
        } = req.body.data;

        const Category = vehicleCatagory.toLowerCase();
        // Check if the category already exists in the database
        const existingCategory = await hireRates.findOne({ vehicleCatagory:  Category});

        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newHireRate = new hireRates({
            vehicleCatagory: Category,
            baseRate,
            baseDistence,
            additionalRate
        });

        await newHireRate.save();

        res.status(201).json({ message: 'Hire rate added successfully' });
    } catch (error) {
        console.error('Error adding hire rate:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  

//Edit the hires rates
const editHireRate = async (req, res) => {
    const { id } = req.params;
    const { 
        vehicleCatagory,
        baseRate,
        baseDistence,
        additionalRate
     } = req.body.data;
    try {
      const hire = await hireRates.findByIdAndUpdate(id, { 
        vehicleCatagory,
        baseRate,
        baseDistence,
        additionalRate
       }, { new: true });

      if (!hireRates) {
        return res.status(404).json({ message: 'Hire not found' });
      }

      res.json({ message: 'Hire updated successfully', hire });
    } catch (error) {
      console.error('Error updating hire:', error);
      res.status(500).json({ message: 'Error updating hire', error: error.message });
    }
};

module.exports = {fetchHiresRates, addHireRates, editHireRate}