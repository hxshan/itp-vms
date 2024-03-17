const mongoose = require('mongoose')

const tourVehicleSchema = new mongoose.Schema({
    category : {type:String,required:true},
    vehicleType : {type:String},
    vehicleRegister : {type:String,required:true},
    vehicleModel : {type:String,required:true},
    vehicleManuYear : {type:Number,required:true},
    engineCap : {type:Number,required:true},
    lastMileage : {type:Number,required:true},
    vehicleColour : {type:String,required:true},
    vehicleGearSys : {type:String,required:true},
    airCon : {type:String,required:true},
    numOfSeats : {type:Number,required:true},
    lugSpace : {type:Number,required:true},
    gps : {type:String,required:true},
    fridge : {type:String,default:"no"},
    tv : {type:String, default:"no"},
    licEndDate : {type:Number,required:true},
    insEndDate : {type:Number,required:true},
    vehicleBookImage : {type:String},
    vehicleLicenceImage : {type:String},
    vehicleInsuImage : {type:String},
    availability : {type:String},
},{timestamps:true})

const lorrySchema = new mongoose.Schema({
    category : {type:String,required:true},
    vehicleType : {type:String,required:true},
    vehicleRegister : {type:String,required:true},
    vehicleModel : {type:String,required:true},
    vehicleManuYear : {type:Number,required:true},
    engineCap : {type:Number,required:true},
    lastMileage : {type:Number,required:true},
    vehicleWeight : {type:Number,required:true},
    cargoCapacity : {type:Number,required:true},
    cargoArea : {type:String,required:true},
    vehicleGearSys : {type:String,required:true},
    airCon : {type:String,required:true},
    numOfSeats : {type:Number,required:true},
    gps : {type:String,required:true},
    licEndDate : {type:Number,required:true},
    insEndDate : {type:Number,required:true},
    vehicleBookImage : {type:String},
    vehicleLicenceImage : {type:String},
    vehicleInsuImage : {type:String},
    availability : {type:String},
},{timestamps:true})

const truckSchema = new mongoose.Schema({
    category : {type:String,required:true},
    vehicleType : {type:String, required:true},
    vehicleRegister : {type:String,required:true},
    vehicleModel : {type:String,required:true},
    vehicleManuYear : {type:Number,required:true},
    engineCap : {type:Number,required:true},
    lastMileage : {type:Number,required:true},
    vehicleWeight : {type:Number,required:true},
    cargoCapacity : {type:Number,required:true},
    trailerLength : {type:Number,required:true},
    passengerCabin : {type:String,required:true},
    vehicleGearSys : {type:String,required:true},
    airCon : {type:String,required:true},
    numOfSeats : {type:Number,required:true},
    gps : {type:String, default:"no"},
    fridge : {type:String, default:"no"},
    tv : {type:String,  default:"no"},
    licEndDate : {type:Number,required:true},
    insEndDate : {type:Number,required:true},
    vehicleBookImage : {type:String},
    vehicleLicenceImage : {type:String},
    vehicleInsuImage : {type:String},
    availability : {type:String},
},{timestamps:true})



const TourVehicles = mongoose.model('TourVehicles',tourVehicleSchema)
const Lorry = mongoose.model('Lorry',lorrySchema)
const Truck = mongoose.model('Truck',truckSchema)

module.exports = {TourVehicles,Lorry,Truck}
