const TourVehicle = require('../models/vehicleModel')
const {Car,Van,Lorry} = require('../models/vehicleModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = async (req, res, next) => {
    try {
        let { category } = req.body;

        if (category === 'Car') {
            const { vehicleType, vehicleRegister, vehicleManuYear} = req.body;
            const newVehicle = await Car.create({ category, vehicleType, vehicleRegister, vehicleManuYear});
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }
            res.status(201).json(newVehicle);
            
        } else if (category === 'Van') {
            const { vehicleType, vehicleGearSys, vehicleWeight } = req.body;
            const newVehicle = await Van.create({ category, vehicleType, vehicleGearSys, vehicleWeight });
            if (!newVehicle) {
                return next(new HttpError("Vehicle couldn't be created.", 422));
            }
            res.status(201).json(newVehicle);

        } else if (category === 'Lorry') {
            const { vehicleType, trailerLength, fridge } = req.body;
            const newVehicle = await Lorry.create({ category, vehicleType, trailerLength, fridge });
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










// const addVehicle = async (req,res,next) => {
//     try {
        
//         let {category} = req.body;

//         if(category=='Car'){
//             let {category,vehicleType,vehicleRegister,vehicleManuYear} = req.body;
//             if(!category || !vehicleType || !vehicleRegister || !vehicleManuYear){
//                 return next (new HttpError("Fill in  all fields in vehicle1.", 422))
//             }  
        
//             const newVehicle = await Vehicle1.create({category,vehicleType,vehicleRegister,vehicleManuYear})
//                 if(!newVehicle){
//                     return next(new HttpError("Vehicle1 couldn't be created." , 422))
//                 }
               
//             res.status(201).json(newVehicle);
//         } 

//         else if(category=='Van'){
//             let {category,vehicleType,vehicleGearSys,vehicleWeight} = req.body;
//             if(!category || !vehicleType || !vehicleGearSys || !vehicleWeight){
//                 return next (new HttpError("Fill in  all fields in vehicle1.", 422))
//             }  
        
//             const newVehicle = await Vehicle2.create({category,vehicleType,vehicleGearSys,vehicleWeight})
//                 if(!newVehicle){
//                     return next(new HttpError("Vehicle1 couldn't be created." , 422))
//                 }
               
//             res.status(201).json(newVehicle);
//         } 
       
//         else if(category=='Lorry'){
//             let {category,vehicleType,trailerLength,fridge} = req.body;
//             if(!category || !vehicleType || !trailerLength || !fridge){
//                 return next (new HttpError("Fill in  all fields  in vehicle3.", 422))
//             }  
        
//             const newVehicle = await Vehicle2.create({category,vehicleType,trailerLength,fridge})
//                 if(!newVehicle){
//                     return next(new HttpError("Vehicle3 couldn't be created." , 422))
//                 }
               
//             res.status(201).json(newVehicle);
//         }    
           
//     } catch (error) {
//         return next (new HttpError(error))
//     }
// }



















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

