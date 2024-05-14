const mongoose = require("mongoose");

const caseFileSchema = new mongoose.Schema(
  {
    caseType: {
      type: String,
      enum: ["accident", "emergency", "other"],
    },
    caseTitle: {
      type: String,
    },

    location: {
      type: String,
    },

    isDriverFault: {
        type:Boolean,
        default: false
    },

    timeOfIncident: {
      type: Date,
    },

    licencePlate: {
      type: String,
    },
    currentCondition: {
      type: String,
    },

    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    hire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hire",
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicles"
    },

    passengerCount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },

    incidentDescription: {
      type: String,
    },
    severity: {
      type: String,
      enum: ["minor", "moderate", "severe"],
    },

    injuriesDiscription: {
      type: String,
    },


    witnessesStatement: {
      type: String,
    },

    emergencyServicesContacted: {
      type: String,
      enum: ["Yes", "No"],
    },
    emergencyServicesResponseTime: {
      type: String,
    },
    emergencyServicesActionsTaken: {
      type: String,
    },

    photographicEvidence: {
      type: String,
    },

    insuranceCompaniesContactInfo: {
      type: String,
    },
    insuranceStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    policeReport: {
      type: String, // link to the document
    },
  },

  {
    timestamps: { 
      type: Date,
      default: Date.now
     },
  }
);
const CaseFile = mongoose.model("CaseFile", caseFileSchema);
module.exports = CaseFile;