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
        enum: ['CREATE','UPDATE','READ','DELETE']
    },
    endpoint:{
        type:String
    },
    status:{
        type:String,
        enum:['success','failure']
    },
    action:{
        type:String
    }
})

module.exports = mongoose.model('userActivity', userActivity)