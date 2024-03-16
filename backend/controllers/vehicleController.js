const TourVehicle = require('../models/vehicleModel')
const Vehicle = require('../models/vehicleModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = async (req,res,next) => {
    try {
        let {category,vehicleType,vehicleRegister,vehicleManuYear} = req.body;
        if(!category || !vehicleType || !vehicleRegister || !vehicleManuYear){
            return next (new HttpError("Fill in  all fields.", 422))
        }  
        
        const newVehicle = await Vehicle.create({category,vehicleType,vehicleRegister,vehicleManuYear})
            if(!newVehicle){
                    return next(new HttpError("Vehicle couldn't be created." , 422))
            }
               
            res.status(201).json(newVehicle);
           
    } catch (error) {
        return next (new HttpError(error))
    }
}

//PATCH:api/vehicle
const editVehicle = async (req,res,next) => {
    try {
        
        const vehicleId = req.params.id;
        let {category,vehicleType,vehicleRegister,vehicleManuYear} = req.body;

        if(!category || !vehicleType || !vehicleRegister || !vehicleManuYear){
            return next(new HttpError("Fill in the all feild."),422)
        }

        updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId,{category,vehicleType,vehicleRegister,vehicleManuYear}, {new: true})
        if(!updatedVehicle){
            return next(new HttpError("Couldn;t update Vehicle.",400))
        }

        res.status(200).json(updatedVehicle)
        
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
        const vehicle = await Vehicle.findById(vehicleId);

       
        await Vehicle.findByIdAndDelete(vehicleId);    
        
        res.json(`Vehicle ${vehicleId} deleted successfully.`)

    } catch (error) {
        return next (new HttpError(error)) 
    }
}

//GET:api/vehicle
const getVehicle = async (req,res,next) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId);

        if(!vehicle){
            return next (new HttpError("Vehicle not found."),404)
        }
        res.status(200).json(vehicle);
        
    } catch (error) {
        return next (new HttpError(error))
    }
}

module.exports = {addVehicle,editVehicle,deleteVehicle,getVehicle}

