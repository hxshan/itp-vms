const Expense = require('../models/expenseModel');
const mongoose = require('mongoose');

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
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
    getExpense,
    deleteExpense,
    updateExpense
}
