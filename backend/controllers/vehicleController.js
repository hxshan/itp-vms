
const {Vehicles} = require('../models/vehicleModel')
const path = require('path')
const fs = require('fs')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = async (req, res, next) => {

    try {
        let { category } = req.body;

        if (category === 'car' || category === 'van' || category === 'bus' ) {
         const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate} = req.body;
    
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }
             res.status(201).json(newVehicle);
         
                
          

        } else if (category === 'lorry') {
            const { vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate } = req.body;
            

        
            const newVehicle = await Vehicles.create({ category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }

            res.status(201).json(newVehicle);



        } else if (category === 'truck') {

            const {  vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate } = req.body;
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

            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleColour,vehicleGearSys,airCon,numOfSeats,lugSpace,gps,fridge,tv,licEndDate,insEndDate,availability,status}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if(category === 'lorry' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,availability,status} = req.body

            updatedVehicle = await Vehicles.findByIdAndUpdate(vehicleId,{category,vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,cargoArea,vehicleGearSys,airCon,numOfSeats,gps,licEndDate,insEndDate,availability,status}, {new: true})
            if(!updatedVehicle){
                return next(new HttpError("Couldn;t update Vehicle.",400))
            }

            res.status(200).json(updatedVehicle)
        }

        if(category === 'truck' ){
            let{vehicleType, vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,passengerCabin,vehicleGearSys,airCon,numOfSeats,gps,fridge,tv,licEndDate,insEndDate,availability,status} = req.body

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
        const vehicles = await Vehicles.find().sort({updatedAt: -1})
        res.status(200).json(vehicles)
        
    } catch (error) {
        return next (new HttpError(error))
    }
}


module.exports = {addVehicle,editVehicle,deleteVehicle,getVehicle,getVehicles}

