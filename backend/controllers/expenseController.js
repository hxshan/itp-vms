const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

//get all expense
const getAllExpenses = async(req,res) => {
    const expense= await Expense.find({}).sort({createdAt : -1})
    res.status(200).json(expense)
}

//get a single expense

const getExpense = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'invalid id'})
    }

    const expense = await Expense.findById(id)

    if(!expense)
    {
        return res.status(400).json({error: 'No such Expense'})
    }

    res.status(200).json(expense)

}

// creata a new expense
const createExpense = async (req,res) =>{ 
    const {
        vehicle,
        type,
        amount,
        date,
        receiptImage,
        notes,
        fuelDetails,
        maintenanceDetails
      } = req.body;

  try{
  const expense =await  Expense.create({
    vehicle,
    type,
    amount,
    date,
    receiptImage,
    notes,
    fuelDetails,
    maintenanceDetails
  });

  res.status(200).json(expense)
   }
   catch(error)
    {
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

        ...req.body
    })

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