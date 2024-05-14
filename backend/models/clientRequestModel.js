const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestShema = new Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  ContractID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
  },
  renew_ED: {
    type: Date,
  },
  Status:{
    type:String
  }
});

module.exports = mongoose.model("ClientRequest", requestShema);
