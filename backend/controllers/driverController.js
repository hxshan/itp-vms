const Hire = require("../models/hireModel")
const mongoose = require('mongoose');

// Find hires by driver id
const getHiresByDriverId = async (req, res) => {
    // Extract the driver id from request parameters
    const { driverId } = req.params;

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


// Update hire driver
const updateHireDriver = async (req, res) => {
    const { id } = req.params;

    // Validate if the hire ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid hire ID' });
    }

    try {
        // Find the hire by ID
        const hire = await Hire.findById(id);

        // If hire not found, return 404 Not Found
        if (!hire) {
            return res.status(404).json({ error: 'Hire not found' });
        }

        // Update the hire with the provided data
        const updatedHire = await Hire.findByIdAndUpdate(id, req.body.data, { new: true });

        // Return success message and updated hire data
        res.status(200).json({ message: 'Hire updated successfully', hire: updatedHire });
    } catch (error) {
        console.error('Error updating hire:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get past trips for driver
const getPastTripsForDriver = async (req, res) => {
    try {
        const { driverId } = req.params;

        // Validate if the driver ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(driverId)) {
            return res.status(400).json({ error: 'Invalid driver id' });
        }

       

        // Find past trips for the specified driver where hireStatus is either 'Cancelled' or 'Completed'
        const pastTrips = await Hire.find({driver: driverId,hireStatus: 
                        { $in: ['Cancelled','Completed'] }}).sort({ endDate: -1, endTime: -1 }).populate('vehicle').populate('driver');

        // If no past trips found, return 404 Not Found
        if (pastTrips.length === 0) {
            return res.status(404).json({ error: 'No past trips found for the specified driver' });
        }

        // Return past trips data
        res.status(200).json(pastTrips);
    } catch (error) {
        console.error('Error fetching past trips for driver:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//getHireByHireID
const getSingleHire = async (req, res)=>{
    const {id} = req.params

  console.log('in get single')
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const hire = await Hire.findById(id).populate('vehicle').populate('driver')
    console.log(hire)
    if(!hire)
    {
        return res.status(400).json({error: 'No such hire'})
    }

   
    res.status(200).json(hire)

}

// Find hires by driver id
const getHiresByVehicleId = async (req, res) => {
    // Extract the driver id from request parameters
    const { vehicleId } = req.params;

    // Check if the provided driverId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return res.status(400).json({ error: 'Invalid vehicle id' });
    }

    try {
        // Find hires where the driver matches the provided driverId
        const hires = await Hire.find({ vehicle : vehicleId }).populate('vehicle').populate('driver').sort({ startDate: 1, startTime: 1 });

        // If no hires are found, return a 404 Not Found response with an error message
        if (hires.length === 0) {
            return res.status(404).json({ error: 'No hires found for the specified vehicle' });
        }

        // If hires are found, return a 200 OK response with the hire data
        res.status(200).json(hires);
        console.log(hires)
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error fetching hires by vehicle id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getHiresByDriverId, updateHireDriver, getPastTripsForDriver, getSingleHire, getHiresByVehicleId };
