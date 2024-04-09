const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vehicles = require('../models/vehicleModel').Vehicles; 

const availabilitySchema = new Schema({
    vehicleRegister: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicles',
        required: true,
        cascade: 'remove'
    },
    status: {
        type: String,
        required: true
    },
    unavailableStartDate: {
        type: Date
    },
    unavailableEndDate: {
        type: Date
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;