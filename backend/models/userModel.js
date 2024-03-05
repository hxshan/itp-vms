const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userShema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    middleNames:{
        type:String,
    },
    lastName:{
        type:String,
        required: true
    },
    dob:{
        type:Date,
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
    phoneNumber:{
        type:String,
        required:true
    },
    roles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }],
})

module.exports = mongoose.model('User',userShema)