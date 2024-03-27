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
        required:true
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },  
    licenceNumber:{
        type:String
    },
    contractID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contract' 
    }
})

module.exports = mongoose.model('Client',clientSchema)