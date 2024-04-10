const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
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
}, { timestamps: true });

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;