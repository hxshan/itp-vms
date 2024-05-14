const Expense = require('../models/expenseModel');
const mongoose = require('mongoose');
const logUserActivity = require("../middleware/logUserActivity");

// Get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({}).populate('vehicle').populate('tripId').populate('reimbursmentPerson').populate('driverName').sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
}


// Create a new expense
const createExpense = async (req, res) => {
    const expenseData = req.body.data;
    console.log(expenseData)

    try {
        const expense = await Expense.create(expenseData);
        console.log(expense)
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log({ error: error.message })
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
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an expense
const updateExpense = async (req, res) => {
    console.log("cameon")
    const { id } = req.params;

    console.log(req.body )

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.findOneAndUpdate({_id:id}, {

            ...req.body.data
        })
        console.log(expense)
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
