const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceschema = mongoose.Schema(
    {
        vehicleRegister: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicles'
        },

        Snote:{
            type:String,

        },
        Scost:{
            type:Number,

        }

    })

    const vehicleservice = mongoose.model('vehicleservice', maintainSchema);
module.exports = vehicleservice;