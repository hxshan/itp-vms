const Expense = require('../models/expenseModel');
const { Vehicles }= require('../models/vehicleModel');
const mongoose = require('mongoose')

//get all expense
const getAllExpenses = async(req,res) => {
    const expenses = await Expense.find({}).populate('vehicle').sort({ createdAt: -1 });
    res.status(200).json(expenses)
}

//get a single expense

const getExpense = async (req, res)=>{
    const {id} = req.params

    console.log('expense')
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const expense = await Expense.findById(id)
    console.log(expense)
    if(!expense)
    {
        return res.status(400).json({error: 'No such Expense'})
    }

   
    res.status(200).json(expense)

}

// creata a new expense
const createExpense = async (req,res) =>{ 
    
    const {
        date,
        time,
        vehicle,
        recordedBy,
        tripId,
        category,
        status,
        receiptImage,
        notes,
        fuelDetails,
        maintenanceDetails,
        insuranceDetails,
        licensingDetails,
        driverWages,
        other
      } = req.body.data;
      
  try{
  const expense =await  Expense.create({
    date,
    time,
    vehicle,
    recordedBy,
    tripId,
    category,
    status,
    receiptImage: receiptImage || '', 
    notes,
    fuelDetails,
    maintenanceDetails,
    insuranceDetails,
    licensingDetails,
    driverWages,
    other
  });

  res.status(200).json(expense)
   }
   catch(error)
    {
       console.log(error)
    res.status(400).json({error: error.message})
    }
}

//delete a expense
const deleteExpense = async (req,res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})

    if(!expense)
    {
        return res.status(400).json({error: 'No such Expense'})
    }

    res.status(200).json(expense)

}


//update a expense
const updateExpense = async (req,res) =>{

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const expense = await Expense.findOneAndUpdate({_id:id}, {

        ...req.body.data
    })

    console.log(expense)
    if(!expense)
    {
        return res.status(400).json({error: 'No such Expense'})
    }

    res.status(200).json(expense)
    
} 



module.exports = {
    createExpense,
    getAllExpenses,
    getExpense,
    deleteExpense,
    updateExpense
}