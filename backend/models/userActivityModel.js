const mongoose = require('mongoose')

const userActivity = new mongoose.Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    requestType:{
        type:String,
        enum: ['GET', 'POST','PATCH','POST','DELETE']
    },
    status:{
        type:String,
        enum:['success','failed']
    }
})

module.exports = mongoose.model('userActivity', userActivity)