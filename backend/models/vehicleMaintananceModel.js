const mongoose = require('mongoose')

const maintainSchema = mongoose.Schema(
    {
        vrtype: {
            type: String,
            required: true

        },

        vrid: {
            type: String,
            required: true
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

        }
    },{
        timestamps:true,
    }
) 

export const vehicleMaintain = mongoose.model('vehicleMaintain', maintainSchema)