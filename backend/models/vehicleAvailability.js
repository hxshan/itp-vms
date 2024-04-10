const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({

    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
    },
    
    status: {
        type: String,
    },
    unavailableStartDate: {
        type: Date
    },
    unavailableEndDate: {
        type: Date
    }

}, { timestamps: true });

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;