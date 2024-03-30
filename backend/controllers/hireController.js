const Hire = require("../models/hireModel")
const {v4: uuid} = require('uuid')
const mongoose = require('mongoose');


//Fetch all the hires
const fetchHires = async (req, res) => {
  try {
    Hire.find()
        .then(hires => res.json(hires))
        .catch(err => res.status(400).json('Error: ' + err))
  } catch (error) {
    console.error('Error fetching hire:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Add new hire
const addHire = async (req, res) => {
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
}

const editHire = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distence, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment } = req.body;
  try {
    const hire = await Hire.findByIdAndUpdate(id, { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distence, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment }, { new: true });
    if (!hire) {
      return res.status(404).json({ message: 'Hire not found' });
    }
    res.json({ message: 'Hire updated successfully', hire });
  } catch (error) {
    console.error('Error updating hire:', error);
    res.status(500).json({ message: 'Error updating hire', error: error.message });
  }
};


const deleteHire = async (req, res) => {
  try {
    const hireId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(hireId)) {
      return res.status(400).json({ message: 'Invalid hire ID' });
    }
    const hire = await Hire.findByIdAndDelete(hireId);
    if (!hire) {
      return res.status(404).json({ message: 'Hire not found' });
    }
    res.json({ message: 'Hire deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hire', error: error.message });
  }
};



module.exports = {addHire, fetchHires,editHire, deleteHire}