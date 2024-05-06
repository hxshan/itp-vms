const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    category: { type: String },
    categoryCustom:{type:String},
    vehicleType: { type: String },
    vehicleRegister: { type: String },
    vehicleModel: { type: String },
    fuelType: { type: String },
    vehicleManuYear: { type: Number },
    engineCap: { type: Number },
    lastMileage: { type: Number },
    vehicleColour: { type: String },
    vehicleGearSys: { type: String },
    vehicleWeight: { type: Number },
    cargoCapacity: { type: Number },
    cargoArea: { type: String },
    trailerLength: { type: Number },
    passengerCabin: { type: String },
    airCon: { type: String },
    numOfSeats: { type: Number },
    lugSpace: { type: Number },
    gps: { type: String },
    fridge: { type: String },
    tv: { type: String },
    licEndDate: { type: Date },
    insEndDate: { type: Date },
    vehicleBookImage: { type: String },
    vehicleLicenceImage: { type: String },
    vehicleInsuImage: { type: String },
    statusVehicle: { type: String },
    availability: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Availability" },
    ],
  },
  { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 } }
);

const Vehicles = mongoose.model("Vehicles", VehicleSchema);

module.exports = { Vehicles };
