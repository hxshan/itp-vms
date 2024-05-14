const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema (
    {
        driver: { 
            type: mongoose.Schema.Types.ObjectId, 
            required : true,
            ref: 'User', 
        },

        vehicle: { 
            type: mongoose.Schema.Types.ObjectId, 
            required : true,
            ref: 'Vehicles',
        },

        hire: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Hire',
        },

        caseFile: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'caseFileModel',
        },

        hireStatus: {
            type : String,
            required : true,
            default : "Pending"
        },

        maintainStatus: {
            type : String,
            required : true,
            default : "Pending"
        }
    }
)

module.exports = mongoose.model("Alert", alertSchema)