const  mongoose  = require("mongoose");

const Schema = mongoose.Schema

const contractSchema = new Schema({
    clientID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
    },
    Vehical:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehical' 
    },
    contract_SD:{
        type:Date,
    },
    contract_ED:{
        type:Date,
    },
    Insurance_Source:{
        type:String,
    },
    Insurace_provider:{
        type:String,
    },
    Policy_Number:{
        type:Number,
    },
    Coverage_Type:{
        type:String,
    },
    Coverage_Amount:{
        type:Number,
    },
    Deductible:{
        type:Number,
    },
    Insurance_SD:{
        type:Date,
    },
    Insurance_ED:{
        type:Date,
    },
    Insurance_notes:{
        type:String,
    },
    Payment_Amount:{
        type:Number,
    },
    Payment_Plan:{
        type:String,
    },
    Payment_Date:{
        type:Date,
    },
    Amount_Payed:{
        type:Number,
    },
})

module.exports = mongoose.model('Contract',contractSchema)
