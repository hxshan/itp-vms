const Expense = require('../models/expenseModel');
const mongoose = require('mongoose');
const logUserActivity = require("../middleware/logUserActivity");

// Get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({}).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName').sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('getAllExpenses failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get a single expense
const getExpense = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('getExpense failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

//driver reimbursements
const getReimbursmentByDriverId = async (req, res) => {
    const { driverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.find({'reimbursmentPerson':driverId}).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName');
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('getReimbursmentByDriverId failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

//getExpenserelatedtotrips
const getExpensesBytripId = async (req, res) => {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.find({tripId:tripId}).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName');
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('getExpensesBytripId failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

//getExpensesrelatedtovehicles
const getExpensesByvehicleId = async (req, res) => {
    const { vehicleId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.find({vehicle:vehicleId,category: { $in: ['Fuel', 'Maintenance and Repairs', 'Insurance', 'Licensing and Permits'] }
    }).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName');
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('getExpensesByvehicleId failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getdriverWageBydriverId = async (req, res) => {
    const { driverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.find({driverName:driverId}).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName');
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('getdriverWageBydriverId failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Create a new expense
const createExpense = async (req, res) => {
    const expenseData = req.body.data;

    try {
        const expense = await Expense.create(expenseData);
        //await logUserActivity(req,200,'CREATE',`created Expense`)
        res.status(201).json(expense);
    } catch (error) {
        //await logUserActivity(req,500,'CREATE',`created Expense`)
        console.error('createExpense failed', error)
        res.status(400).json({ message: 'Bad request' });
    }
}

// Delete an expense
const deleteExpense = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        await logUserActivity(req,200,'DELETE',`Deleted Expense`)
        res.status(200).json(expense);
    } catch (error) {
        console.error('deleteExpense failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update an expense
const updateExpense = async (req, res) => {
    
    const { id } = req.params;

    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.findOneAndUpdate({_id:id}, {

            ...req.body.data
        })
        
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        await logUserActivity(req,200,'UPDATE',`Updated Expense`)
        res.status(200).json(expense);
    } catch (error) {
        await logUserActivity(req,500,'UPDATE',`created new hire`)
        console.error('updateExpense failed', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createExpense,
    getAllExpenses,
    getReimbursmentByDriverId,
    getExpensesBytripId,
    getExpensesByvehicleId,
    getdriverWageBydriverId,
    getExpense,
    deleteExpense,
    updateExpense
}
