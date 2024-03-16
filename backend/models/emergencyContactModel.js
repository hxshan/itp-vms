const mongoose = require('mongoose')


const Schema = mongoose.Schema

const emergencyContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});




module.exports = mongoose.model('EmergencyContact',emergencyContactSchema)