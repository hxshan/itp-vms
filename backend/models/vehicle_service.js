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
            required: true,
        },
        lastmilage: {
            type: Number,
            required: true,
        },

        Snote: {
            type: String,
            required: true,
        },
        
        Scost: {
            type: Number,
            required: true,

        }

    })

const vehicleservice = mongoose.model('vehicleservice', serviceschema);
module.exports = vehicleservice;