const Vehicles = require('../models/vehicleModel')
const Availability = require('../models/vehicleAvailability')


const addunavailability = async (req, res) => {
    const {id} =req.params;
    const vehicle = await Vehicles.findById(id)

    try {
      
      const {
        
        unavailability

      } = req.body;
  
   
      if (!unavailability)
        return res.status(400).json({ msg: "Not all fields have been entered." });
    
      //match front and back names
      vehicle = new Vehicles({
      
        unavailability:[],
        
      });

      const parsedUnavailability = JSON.parse(unavailability);
  
      try {//create the emergency contact first then the user
        const unavailabilityPromises = parsedUnavailability.map(async (unavailable) => {
          const Unavaila = new Availability({
            vehicle: unavailable.vehicleId,
            status: unavailable. unavailabilityStatus,
            unavailableStartDate: unavailable.unavailableStartDate,
            unavailableEndDate: unavailable.unavailableEndDate,
          });

          let newUnavailability = await Unavaila.save();
          return newUnavailability._id
        });
        const unavailabilityIds = await Promise.all(unavailabilityPromises);
        vehicle.unavailability = unavailabilityIds;
        
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
  
      console.log(vehicle)
      await vehicle.save();
      console.log('saved')
  
  
      return res.status(200).json({ message: "Unavailability added succesfully" });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  };



  module.exports = { 
    addunavailability
  };