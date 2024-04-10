const mongoose = require("mongoose");

const Schema = mongoose.Schema

const clientSchema =new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    dob:{
        type:Date,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    nicNumber:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required: true,
    },
    Address:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required:false
    },  
    licenceNumber:{
        type:String
    },
    Comp_Available:{
        type:Boolean
    },
    Comp_Name:{
        type:String,
    },
    Reg_Num:{
        type:String,
    },
    Tax_Num:{
        type:String,
    },
    Legal_struc:{
        type:String,
    },
    Comp_Email:{
        type:String,
    },
    Comp_Phone:{
        type:String,
    },
    Comp_Address:{
        type:String,
    },
    contractID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contract' 
    }
})

module.exports = mongoose.model('Client',clientSchema)