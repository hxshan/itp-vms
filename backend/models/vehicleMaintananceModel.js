const mongoose = require('mongoose')

const maintainSchema = mongoose.Schema(
    {

        vrid:{
            type: String,
            required: true
        }, 
        
        vrtype: {
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
        },

        vrsdate:{
            type:Date
        },
        
        vredate:{
            type:Date
        }

    },{
        timestamps:true,
    }
) 

const vehicleMaintain = mongoose.model('vehicleMaintain', maintainSchema);
module.exports = vehicleMaintain;