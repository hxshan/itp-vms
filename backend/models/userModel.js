const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userShema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    middleName:{
        type:String,
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
    nicDocument:{
        type:String,
        required:false
    },
    emergencyContacts: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'EmergencyContact'
    }],
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
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    department:{
        type:String,
    },
    employmentDate:{
        type:Date,
    },
    baseSalary:{
        type:Number,
        require:true
    },
    licenceNumber:{
        type:String
    },
    empPhoto:{
        type:String
    }
})

module.exports = mongoose.model('User',userShema)