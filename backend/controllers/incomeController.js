const Income = require('../models/incomeModel');
const { Vehicles }= require('../models/vehicleModel');
const Contract = require("../models/contractModel");
const Client = require("../models/clientModel");
const Hire = require('../models/hireModel');
const user = require('../models/userModel')
const mongoose = require('mongoose')

//get all 
const getAllIncome = async(req,res) => {
    const incomes= await Income.find({}).populate('vehicle').populate('hirePayment.hire').populate('recordedBy').populate('contractIncome.contract')
    
    .populate('contractIncome.contract').sort({ createdAt: -1 });
    res.status(200).json(incomes)
}

//get a single 

const getIncome = async (req, res)=>{
    const {id} = req.params

 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.findById(id).populate('vehicle').populate('hirePayment.hire').populate('recordedBy').populate('contractIncome.contract')
    console.log(income)
    if(!income)
    {
        return res.status(400).json({error: 'No such income'})
    }

   
    res.status(200).json(income)

}

const getIncomebytrip = async (req, res)=>{
    const {tripid} = req.params

 
    if(!mongoose.Types.ObjectId.isValid(tripid)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.find({'hirePayment.hire': tripid}).populate('vehicle').populate('hirePayment.hire').populate('recordedBy').populate('contractIncome.contract')
    console.log(income)
    if(!income)
    {
        return res.status(400).json({error: 'No such income'})
    }

   
    res.status(200).json(income)

}
const getIncomebyvehicle = async (req, res)=>{
    const {vehicleid} = req.params

 
    if(!mongoose.Types.ObjectId.isValid(vehicleid)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.find({vehicle:vehicleid}).populate('vehicle').populate('hirePayment.hire').populate('recordedBy').populate('contractIncome.contract')
    console.log(income)
    if(!income)
    {
        return res.status(400).json({error: 'No such income'})
    }

   
    res.status(200).json(income)

}
// creata a new expense
const createIncome = async (req,res) =>{ 
    
    const {
        date,
        vehicle,
        recordedBy,
        editedBy,
        source,
        hirePayment,
        contractIncome,
        description,
        paymentMethod,
        status,
        comments
      } = req.body.data;
      
  try{
  const income =await  Income.create({
    date,
    vehicle,
    recordedBy,
    editedBy,
    source,
    hirePayment,
    contractIncome,
    description,
    paymentMethod,
    status,
    comments
  });

  res.status(200).json(income)
   }
   catch(error)
    {
       console.log(error)
    res.status(400).json({error: error.message})
    }
}

//delete a expense
const deleteIncome = async (req,res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.findOneAndDelete({_id: id})

    if(!income)
    {
        return res.status(400).json({error: 'No such income'})
    }

    res.status(200).json(income)

}


//update a expense
const updateIncome = async (req,res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.findOneAndUpdate({_id:id}, {

        ...req.body.data
    })

    console.log(income)
    if(!income)
    {
        return res.status(400).json({error: 'No such Income'})
    }

    res.status(200).json(income)
    
} 

const getContractByVehicleID = async (req, res)=>{
    const {vehicleId} = req.params

 
    if(!mongoose.Types.ObjectId.isValid(vehicleId)){
        return res.status(400).json({error: 'invalid id'})
    }

    const contract = await Contract.find({ Vehical: vehicleId }).populate('Vehical').populate('clientID');
    console.log(contract)
    if(!contract)
    {
        return res.status(400).json({error: 'No such contract'})
    }

   
    res.status(200).json(contract)

}




module.exports = {
    createIncome,
    getAllIncome,
    getIncome,
    deleteIncome,
    updateIncome,
    getContractByVehicleID,
    getIncomebytrip,
    getIncomebyvehicle

}