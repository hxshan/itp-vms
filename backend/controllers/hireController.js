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
  console.log('cam innn')
  try {
    const {
      startDate,
      endDate,
      startTime,
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
      hireStatus
    } = req.body;

    const newHire = new Hire({
      startDate,
      endDate,
      startTime,
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
      hireStatus
    });

    await newHire.save();

    res.status(201).json({ message: 'Hire added successfully' });
  } catch (error) {
    console.error('Error adding hire:', error);
    res.status(500).json({ message: 'Internal serverss error' });
  }
}

const editHire = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distence, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment, hireStatus } = req.body.data;
  try {
    const hire = await Hire.findByIdAndUpdate(id, { startDate, endDate, vehicleType, vehicleSubcategory, passengerCount, airCondition, vehicle, driver, startPoint, endPoint, tripType, distence, cusName, cusEmail, cusMobile, cusNic, estimatedTotal, finalTotal, advancedPayment, hireStatus }, { new: true });
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


//find hire by driver id
const getHiresByDriverId = async (req, res) => {
  // Extract the driver id from request parameters
  const { driverId }  = req.params;

console.log(driverId )

  // Check if the provided driverId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ error: 'Invalid driver id' });
  }

  try {
      // Find hires where the driver matches the provided driverId
      const hires = await Hire.find({ driver: driverId }).populate('vehicle').populate('driver').sort({ startDate: 1, startTime: 1 });

      // If no hires are found, return a 404 Not Found response with an error message
      if (hires.length === 0) {
          return res.status(404).json({ error: 'No hires found for the specified driver' });
      }

      // If hires are found, return a 200 OK response with the hire data
      res.status(200).json(hires);
  } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error fetching hires by driver id:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


//startTripForm Edit
const updateHireDriver = async (req, res) => {
  const { id } = req.params;

  const expense = await Hire.findById(id)
  console.log(expense)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid hire ID' });
  }

  try {
    const hire = await Hire.findByIdAndUpdate(id, req.body.data, { new: true });

    console.log(hire)

    if (!hire) {
      return res.status(404).json({ error: 'Hire not found' });
    }

    res.status(200).json({ message: 'Hire updated successfully', hire });
  } catch (error) {
    console.error('Error updating hire:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPastTripsForDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    // Check if the provided driverId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ error: 'Invalid driver id' });
    }

    const currentDate = new Date();

    const pastTrips = await Hire.find({
      driver: mongoose.Types.ObjectId(driverId),
      endDate: { $lt: currentDate },
      hireStatus: { $in: ['cancelled', 'completed'] }
    }).sort({ endDate: -1 });

    if (pastTrips.length === 0) {
      return res.status(404).json({ error: 'No past trips found for the specified driver' });
    }

    res.status(200).json(pastTrips);
  } catch (error) {
    console.error('Error fetching past trips for driver:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {addHire, fetchHires,editHire, deleteHire,getHiresByDriverId, updateHireDriver, getPastTripsForDriver}