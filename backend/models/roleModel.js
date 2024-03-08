const mongoose = require('mongoose')


const Schema = mongoose.Schema

const roleShema = new Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Role',roleShema)