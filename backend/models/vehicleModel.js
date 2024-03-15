const {Schema,model} = require('mongoose')

const tourVehicleSchema = new Schema({
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
    vehicleBookImage : {type:String,required:true},
    vehicleLicenceImage : {type:String,required:true},
    vehicleInsuImage : {type:String,required:true},
    availability : {type:String},
},{timestamps:true})

const lorrySchema = new Schema ({
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
    vehicleBookImage : {type:String,required:true},
    vehicleLicenceImage : {type:String,required:true},
    vehicleInsuImage : {type:String,required:true},
    availability : {type:String},
},{timestamps:true})

const truckSchema = new Schema ({
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
    vehicleBookImage : {type:String,required:true},
    vehicleLicenceImage : {type:String,required:true},
    vehicleInsuImage : {type:String,required:true},
    availability : {type:String},
},{timestamps:true})


module.exports = model("TourVehicle",tourVehicleSchema)
module.exports = model("Lorry",lorrySchema)
module.exports = model("Truck",truckSchema)