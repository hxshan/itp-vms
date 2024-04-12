const Income = require('../models/incomeModel');
const { Vehicles }= require('../models/vehicleModel');
const Client = require('../models/clientModel');
const Contract = require('../models/contractModel');
const Hire = require('../models/hireModel');
const mongoose = require('mongoose')

//get all expense
const getAllIncome = async(req,res) => {
    const incomes= await Income.find({}).populate('vehicle').populate('hirePayment.hire')
    .populate('contractIncome.client')
    .populate('contractIncome.contract').sort({ createdAt: -1 });
    res.status(200).json(incomes)
}

//get a single expense

const getIncome = async (req, res)=>{
    const {id} = req.params

 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const income = await Income.findById(id)
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
        amount,
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
    amount,
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



module.exports = {
    createIncome,
    getAllIncome,
    getIncome,
    deleteIncome,
    updateIncome
}