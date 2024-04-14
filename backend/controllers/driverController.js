const Hire = require("../models/hireModel")
const {v4: uuid} = require('uuid')
const mongoose = require('mongoose');

//find hire by driver id
const getHiresByDriverId = async (req, res) => {
    // Extract the driver id from request parameters
    const { driverId }  = req.params;
  
  console.log('driverId' )
  
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
  
    const hirbyid = await Hire.findById(id)
    console.log(hirbyid)
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
  
      console.log('insode det by past')
      // Check if the provided driverId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(driverId)) {
        return res.status(400).json({ error: 'Invalid driver id' });
      }
      
  
      console.log(driverId)
      const currentDate = new Date();
  
      const pastTrips = await Hire.find({
        driver: driverId,
        hireStatus: { $in: ['Cancelled', 'Completed'] }
      }).sort({ endDate: -1 , endTime: -1}).populate('vehicle').populate('driver');
  
      if (pastTrips.length === 0) {
        return res.status(404).json({ error: 'No past trips found for the specified driver' });
      }
  
      res.status(200).json(pastTrips);
    } catch (error) {
      console.error('Error fetching past trips for driver:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {getHiresByDriverId, updateHireDriver, getPastTripsForDriver}