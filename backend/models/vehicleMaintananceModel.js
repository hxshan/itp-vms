const mongoose = require('mongoose')
const Vehicles = require ('../models/vehicleModel')
const Schema = mongoose.Schema

const maintainSchema = mongoose.Schema(
    {

        
        
        vehicleRegister: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicles'
        },

        vrcategory:{
            type:String
        },
        
        vrvehicleRegister:{
            type:String
        },
        

  
        vrissue: {
            type: String,
            required: true
        },

        vrcost: {
            type: Number,
            required: true
        },

        vraddit: {
            type: String,
        },

        vrsdate:{
            type: Date
        },
        
        vredate:{
            type: Date
        },

        availability: {
            type: String,
            required: true,
         
        }

    },{
        timestamps:true,
    }
)


const vehicleMaintain = mongoose.model('vehicleMaintain', maintainSchema);
module.exports = vehicleMaintain;