const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceschema = mongoose.Schema(
    {
        vehicleRegister: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicles'
        },

        servicedate: {
            type: Date, 
            default: Date.now 
        },
        lastmilage: {
            type: Number,
            
        },
        kilometerLimit: { 
            type: Number 
        },

        Snote: {
            type: String,
            
        },
        
        Scost: {
            type: Number,
            

        }

    })

const vehicleservice = mongoose.model('vehicleservice', serviceschema);
module.exports = vehicleservice;