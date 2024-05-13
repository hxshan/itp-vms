
const {Vehicles} = require('../models/vehicleModel')
const Availability = require('../models/vehicleAvailability')
const path = require('path')
const fs = require('fs')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = async (req, res, next) => {

    try {
        let { category } = req.body;

        if (category === 'car' || category === 'van' || category === 'bus' ) {
         const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,fuelType,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,statusVehicle} = req.body;
            
            if(!vehicleType || !vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys || !fuelType){
                return next(new HttpError("Please fill all feiled under Performance.", 400))
            }

            if(!airCon || !numOfSeats || !lugSpace || !gps){
                return next(new HttpError("Please fill all feiled under Features.", 400))
            }

            if(!licEndDate || !insEndDate){
                return next(new HttpError("Please fill all feiled under Documentary.", 400))
            }

            const existingVehicleByRegister = await Vehicles.findOne({ vehicleRegister });
            const existingVehicleByModel = await Vehicles.findOne({ vehicleModel });

            if (existingVehicleByRegister) {
                return next(new HttpError("Vehicle with the same registration number already exists.", 400));
            }

            if (existingVehicleByModel) {
                return next(new HttpError("Vehicle with the same model already exists.", 400));
            }

    
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,statusVehicle,availability:[], fuelType});
            
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }

            
             res.status(201).json(newVehicle);
    

        } else if (category === 'lorry') {
            const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,statusVehicle, fuelType } = req.body;

            if(!vehicleType || !vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys ||!vehicleWeight || !cargoArea || !cargoArea || !fuelType){
                return next(new HttpError("Please fill all feiled under Performance.", 400))
            }

            if(!airCon || !numOfSeats || !gps){
                return next(new HttpError("Please fill all feiled under Features.", 400))
            }

            if(!licEndDate || !insEndDate){
                return next(new HttpError("Please fill all feiled under Documentary.", 400))
            }

            const existingVehicleByRegister = await Vehicles.findOne({ vehicleRegister });
            const existingVehicleByModel = await Vehicles.findOne({ vehicleModel });

            if (existingVehicleByRegister) {
                return next(new HttpError("Vehicle with the same registration number already exists.", 400));
            }

            if (existingVehicleByModel) {
                return next(new HttpError("Vehicle with the same model already exists.", 400));
            }
        
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,statusVehicle,fuelType});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }


            res.status(201).json(newVehicle);



        } else if (category === 'truck') {

            const {  vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,statusVehicle, fuelType} = req.body;

            if(!vehicleType || !vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys ||!vehicleWeight || !trailerLength || !cargoCapacity || !fuelType){
                return next(new HttpError("Please fill all feiled under Performance.", 400))
            }

            if(!airCon || !numOfSeats || !gps || !passengerCabin || !fridge || !tv){
                return next(new HttpError("Please fill all feiled under Features.", 400))
            }

            if(!licEndDate || !insEndDate){
                return next(new HttpError("Please fill all feiled under Documentary.", 400))
            }
            
            const existingVehicleByRegister = await Vehicles.findOne({ vehicleRegister });
            const existingVehicleByModel = await Vehicles.findOne({ vehicleModel });

            if (existingVehicleByRegister) {
                return next(new HttpError("Vehicle with the same registration number already exists.", 400));
            }

            if (existingVehicleByModel) {
                return next(new HttpError("Vehicle with the same model already exists.", 400));
            }

            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,statusVehicle, fuelType});

            if (!newVehicle) {

                return next(new HttpError("Vehicle couldn't be created.", 422));
            }

            

            res.status(201).json(newVehicle);

            } else {

                const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,vehicleColour,lugSpace,cargoArea,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,statusVehicle, fuelType,categoryCustom } = req.body;
    
                const requiredFields = [
                    'vehicleType',
                    'vehicleRegister',
                    'vehicleModel',
                    'vehicleManuYear',
                    'engineCap',
                    'vehicleColour',
                    'lugSpace',
                    'cargoArea',
                    'lastMileage',
                    'vehicleWeight',
                    'cargoCapacity',
                    'trailerLength',
                    'passengerCabin',
                    'vehicleGearSys',
                    'airCon',
                    'numOfSeats',
                    'gps',
                    'fridge',
                    'tv',
                    'licEndDate',
                    'insEndDate',
                    'statusVehicle',
                    'fuelType',
                    'categoryCustom',
                    'category'
                  ];

                  // Filter out empty or null values
                  const filteredFields = {};
                  requiredFields.forEach(field => {
                  if (req.body[field]) {
                         filteredFields[field] = req.body[field];
                   }
                  });

                

                  const existingVehicleByRegister = await Vehicles.findOne({ vehicleRegister });
                  const existingVehicleByModel = await Vehicles.findOne({ vehicleModel });
              
                  if (existingVehicleByRegister) {
                    return next(new HttpError('Vehicle with the same registration number already exists.', 400));
                  }
              
                  if (existingVehicleByModel) {
                    return next(new HttpError('Vehicle with the same model already exists.', 400));
                  }
              
                  const newVehicle = await Vehicles.create(filteredFields);
              
                  if (!newVehicle) {
                    return next(new HttpError('Vehicle couldn\'t be created.', 422));
                  }


                  res.status(201).json(newVehicle);

            }

        
    } catch (error) {
        return next(new HttpError(error.message));
    }
};



//PATCH:api/vehicle
const editVehicle = async (req,res,next) => {
    try {
        const vehicleId = req.params.id;
        let {category} = req.body;

        if(category === 'car' || category === 'van' || category === 'bus'){

            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,fuelType} = req.body

            
            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,fuelType}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if(category === 'lorry' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,fuelType} = req.body


            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,fuelType}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if (category === 'truck' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,fuelType} = req.body


            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,fuelType}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }
        
    } catch (error) {
        return next (new HttpError(error)) 
    }
}

//GET : api/vehicle/availability
const getAvailabilityByVehicleId = async (req, res) => {

    const vehicleId = req.params.id; 
  
    try {
      // Query the database to find the vehicle by ID and populate the availability field
      const vehicle = await Vehicles.findById(vehicleId).populate('availability');
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      // Extract availability data from the vehicle object
      const availabilityData = vehicle.availability.map(availability => ({
        status: availability.status,
        unavailableStartDate: availability.unavailableStartDate,
        unavailableEndDate: availability.unavailableEndDate
      }));
  
      // Send the availability data as a response
      res.status(200).json(availabilityData);
    } catch (error) {
      console.error('Error fetching availability data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


//PATCH:api/vehicle
const changeStatusVehicle = async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        if (!vehicleId) {
            return next(new HttpError("Vehicle ID is missing.", 400));
        }
        
        // Update the status of the vehicle to 'Deleted'
        const updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId, { statusVehicle: 'Deactive' });

        if (!updatedVehicle) {
            return next(new HttpError("Vehicle not found.", 404));
        }

        res.status(200).json({ message: `Vehicle with ID ${vehicleId} deactive successfully.` });
    } catch (error) {

        return next(new HttpError(error.message, 500));
        
    }
}



//PATCH:api/vehicle
const recoverVehicle = async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        if (!vehicleId) {
            return next(new HttpError("Vehicle ID is missing.", 400));
        }
        
        // Update the status of the vehicle to 'Deleted'
        const updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId, { statusVehicle: 'Active' });

        if (!updatedVehicle) {
            return next(new HttpError("Vehicle not found.", 404));
        }

        res.status(200).json({ message: `Vehicle with ID ${vehicleId} active successfully.` });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}

const updateMileage = async (req, res, next) => {
    try {
        
        const  vehicleId  = req.body.data._id;
        const  Mileage  = req.body.data.lastMileage;


        console.log(Mileage)
        
        
        if (!vehicleId) {
            return next(new HttpError("Vehicle ID is missing.", 400));
        }
        
        // Update the status of the vehicle to 'Active' and set the mileage
        const updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId, { lastMileage:Mileage});

        if (!updatedVehicle) {
            return next(new HttpError("Vehicle not found.", 404));
        }

        res.status(200).json({ message: `Vehicle with ID ${vehicleId} activated successfully.` });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}




//DELETE:api/vehicle
const deletePost = async(req,res,next) => {
    try {
        const vehicleId = req.params.id;

        if(!vehicleId){
            return next(new HttpError("Post unavailable.",400))
        }
        
        await Vehicles.findByIdAndDelete(vehicleId);

        res.json(`Post ${vehicleId} deleted successfully.`)

    } catch (error) {
        return next (new HttpError(error)) 
    }
}



const getVehicle = async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        
        // Determine the type of vehicle based on its _id
        const vehicles = await Vehicles.findById(vehicleId);
    

        // Check if any of the vehicles are found
        if (!vehicles) {
            return next(new HttpError("Vehicle not found.", 404));
        }
        
        else
            res.status(200).json(vehicles);
        
    } catch (error) {
        return next(new HttpError(error));
    }
}



//GET:api/vehicles
const getVehicles = async (req, res, next) => {
    try {

        const vehiclesCount = await Vehicles.countDocuments();
        const carCount = await Vehicles.countDocuments({ category: 'car' });
        const vanCount = await Vehicles.countDocuments({ category: 'van' });
        const busCount = await Vehicles.countDocuments({ category: 'bus' });
        const lorryCount = await Vehicles.countDocuments({ category: 'lorry' });
        const truckCount = await Vehicles.countDocuments({ category: 'truck' });
       // const availableCount = await Vehicles.countDocuments({ availability: 'available' });
        const underMaintanceCount = await Vehicles.countDocuments({ status: 'maintance' });
        const underClientCount = await Vehicles.countDocuments({ status: 'clinetBase' });
        const underSpecialTaskCount = await Vehicles.countDocuments({ status: 'specialTask' });
        const underInactiveCount = await Vehicles.countDocuments({ status: 'inActive' });
        const twoDaysAgo = new Date(Date.now() - (2 * 24 * 60 * 60 * 1000));


        if (underSpecialTaskCount === null || underClientCount === null || underMaintanceCount=== null || truckCount=== null || lorryCount=== null || busCount=== null || vanCount=== null || carCount=== null || vehiclesCount === null || underInactiveCount === null) {
            underSpecialTaskCount = 0;
            underClientCount = 0;
            underMaintanceCount = 0;
            truckCount = 0;
            lorryCount = 0;
            busCount = 0;
            vanCount = 0;
            carCount = 0;
            vehiclesCount = 0;
            underInactiveCount =0 ;
          }

        const query = {
            createdAt: { $gte: twoDaysAgo } 
        };  

        
        const vehicles = await Vehicles.find().sort({updatedAt: -1});
        const vehiclesRecover = await Vehicles.find({statusVehicle: 'Deactive'}).sort({updatedAt: -1});
        const car = await Vehicles.find({category: 'car'}).sort({ updatedAt: -1 });
        const van = await Vehicles.find({category: 'van'}).sort({ updatedAt: -1 });
        const bus = await Vehicles.find({category: 'bus'}).sort({ updatedAt: -1 });
        const lorry = await Vehicles.find({category: 'lorry'}).sort({ updatedAt: -1 });
        const truck = await Vehicles.find({category: 'truck'}).sort({ updatedAt: -1 });
        const newAdded = await Vehicles.find(query).sort({ updatedAt: -1 });

        res.status(200).json({vehiclesCount,carCount, vanCount, busCount, lorryCount, truckCount ,underMaintanceCount,underClientCount,underSpecialTaskCount,underInactiveCount, vehicles ,vehiclesRecover, car , van , bus , lorry , truck , newAdded});

    } catch (error) {
        return next (new HttpError(error))
    }
 
}

const getAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicles.find().sort({updatedAt: -1});
        res.status(200).json(vehicles)
    } catch (error) {
        return next (new HttpError(error))
    }       

}


module.exports = {addVehicle,editVehicle,changeStatusVehicle,getVehicle,getVehicles,recoverVehicle,deletePost,updateMileage,getAvailabilityByVehicleId,getAllVehicles}

