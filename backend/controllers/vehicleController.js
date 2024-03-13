const TourVehicle = require('../models/vehicleModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require ('../models/errorModel')

//POST:api/vehicle
const addVehicle = (req,res,next) => {
    res.json("Add vehicle")
}

//PATCH:api/vehicle
const editVehicle = (req,res,next) => {
    res.json("Edit vehicle")
}

//DELETE:api/vehicle
const deleteVehicle = (req,res,next) => {
    res.json("Delete vehicle")
}

//GET:api/vehicle
const getVehicle = (req,res,next) => {
    res.json("Get vehicle")
}

module.exports = {addVehicle,editVehicle,deleteVehicle,getVehicle}

