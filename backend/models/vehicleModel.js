const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    category : {type:String},
    vehicleType : {type:String},
    vehicleRegister : {type:String},
    vehicleModel : {type:String},
    vehicleManuYear : {type:Number},
    engineCap : {type:Number},
    lastMileage : {type:Number},
    vehicleColour : {type:String},
    vehicleGearSys : {type:String},
    vehicleWeight : {type:Number},
    cargoCapacity : {type:Number},
    cargoArea : {type:String},
    trailerLength : {type:Number},
    passengerCabin : {type:String},
    airCon : {type:String},
    numOfSeats : {type:Number},
    lugSpace : {type:Number},
    gps : {type:String},
    fridge : {type:String, default:'No'},
    tv : {type:String, default:'No'},
    licEndDate : {type:Date},
    insEndDate : {type:Date},
    vehicleBookImage : {type:String},
    vehicleLicenceImage : {type:String},
    vehicleInsuImage : {type:String},
    availability : {type:String},
    status:{type:String}
},{timestamps:true})


const Vehicles = mongoose.model('Vehicles',VehicleSchema)

module.exports = {Vehicles}
