
const {Vehicles} = require('../models/vehicleModel')
const path = require('path')
const fs = require('fs')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = async (req, res, next) => {

    try {
        let { category } = req.body;

        if (category === 'car' || category === 'van' || category === 'bus' ) {
         const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,availability} = req.body;
            
            if(!vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys){
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
    
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,availability});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }
             res.status(201).json(newVehicle);
    

        } else if (category === 'lorry') {
            const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate } = req.body;

            if(!vehicleType || !vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys ||!vehicleWeight || !cargoArea || !cargoArea){
                return next(new HttpError("Please fill all feiled under Performance.", 400))
            }

            if(!airCon || !numOfSeats || !gps){
                return next(new HttpError("Please fill all feiled under Features.", 400))
            }

            if(!licEndDate || !insEndDate){
                return next(new HttpError("Please fill all feiled under Documentary.", 400))
            }
        
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }

            res.status(201).json(newVehicle);



        } else if (category === 'truck') {

            const {  vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate } = req.body;

            if(!vehicleType || !vehicleRegister || !vehicleModel || !vehicleManuYear || !engineCap || !lastMileage || !vehicleGearSys ||!vehicleWeight || !trailerLength || !cargoCapacity){
                return next(new HttpError("Please fill all feiled under Performance.", 400))
            }

            if(!airCon || !numOfSeats || !gps || !passengerCabin || !fridge || !tv){
                return next(new HttpError("Please fill all feiled under Features.", 400))
            }

            if(!licEndDate || !insEndDate){
                return next(new HttpError("Please fill all feiled under Documentary.", 400))
            }


            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate });
            if (!newVehicle) {

                return next(new HttpError("Vehicle couldn't be created.", 422));
            }

            res.status(201).json(newVehicle);

        } else {
            return next(new HttpError("Invalid category.", 422));
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

            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,availability,status} = req.body

            if(status === 'maintance'  || status === 'clinetBase' || status === 'specialTask' || status === 'inActive'){
                availability = 'unavailable'
            }

            else{
                availability = 'available'
            }

            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,availability,status}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if(category === 'lorry' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,availability,status} = req.body

            if(status === 'maintance'  || status === 'clinetBase' || status === 'specialTask' || status === 'inActive'){
                   availability = 'unavailable'
            }

            else{
                availability = 'available'
            }

            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,availability,status}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if (category === 'truck' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,availability,status} = req.body

            if(status === 'maintance'  || status === 'clinetBase' || status === 'specialTask' || status === 'inActive'){
                availability = 'unavailable'
            }

            else{
             availability = 'available'
            }

            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,availability,status}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }
        
    } catch (error) {
        return next (new HttpError(error)) 
    }
}

//DELETE:api/vehicle
const deleteVehicle = async (req,res,next) => {
    try {
        const vehicleId = req.params.id;
        if(!vehicleId){
            return next(new HttpError("Vehicle unavailable.",400))
        }
        

       await Vehicles.findByIdAndDelete(vehicleId);    
 
        
        res.json(`Vehicle ${vehicleId} deleted successfully.`)

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
        const availableCount = await Vehicles.countDocuments({ availability: 'available' });
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
        const car = await Vehicles.find({category: 'car'}).sort({ updatedAt: -1 });
        const van = await Vehicles.find({category: 'van'}).sort({ updatedAt: -1 });
        const bus = await Vehicles.find({category: 'bus'}).sort({ updatedAt: -1 });
        const lorry = await Vehicles.find({category: 'lorry'}).sort({ updatedAt: -1 });
        const truck = await Vehicles.find({category: 'truck'}).sort({ updatedAt: -1 });
        const newAdded = await Vehicles.find(query).sort({ updatedAt: -1 });


        res.status(200).json({vehiclesCount,carCount, vanCount, busCount, lorryCount, truckCount ,availableCount,underMaintanceCount,underClientCount,underSpecialTaskCount,underInactiveCount, vehicles , car , van , bus , lorry , truck , newAdded});
        

    } catch (error) {
        return next (new HttpError(error))
    }
}


module.exports = {addVehicle,editVehicle,deleteVehicle,getVehicle,getVehicles}

