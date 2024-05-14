import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { Pie } from 'react-chartjs-2';

const BarChart = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [filteredIncome, setFilteredIncome] = useState([]);
  const [filteredExpense, setFilteredExpense] = useState([]);
  const [incomeStatusFilter, setIncomeStatusFilter] = useState('All');
  const [expenseStatusFilter, setExpenseStatusFilter] = useState('All');

  const [incomeResponse, incomeError, incomeLoading, incomeAxiosFetch] = useAxios();
  const [expenseResponse, expenseError, expenseLoading, expenseAxiosFetch] = useAxios();

  useEffect(() => {
    incomeAxiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/income/',
    });

    expenseAxiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/expense/',
    });
  }, []);

  useEffect(() => {
    if (incomeResponse) {
      setIncomeData(incomeResponse);
    }
  }, [incomeResponse]);

  useEffect(() => {
    if (expenseResponse) {
      setExpenseData(expenseResponse);
    }
  }, [expenseResponse]);

  useEffect(() => {
    // Filter income based on status and any other criteria
    const filteredIncome = incomeData.filter((income) => {
      return incomeStatusFilter === 'All' || income.status === incomeStatusFilter;
    });
    setFilteredIncome(filteredIncome);
  }, [incomeData, incomeStatusFilter]);

  useEffect(() => {
    // Filter expense based on status and any other criteria
    const filteredExpense = expenseData.filter((expense) => {
      return expenseStatusFilter === 'All' || expense.status === expenseStatusFilter;
    });
    setFilteredExpense(filteredExpense);
  }, [expenseData, expenseStatusFilter]);

  // Calculate total income
  const totalIncome = filteredIncome.reduce((acc, income) => acc + calculateIncomeAmount(income), 0);

  // Calculate total expense
  const totalExpense = filteredExpense.reduce((acc, expense) => acc + calculateExpenseAmount(expense), 0);

  const pieChartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['green', 'red'],
      },
    ],
  };

  // Handle status filter change for income
  const handleIncomeStatusFilterChange = (event) => {
    setIncomeStatusFilter(event.target.value);
  };

  // Handle status filter change for expense
  const handleExpenseStatusFilterChange = (event) => {
    setExpenseStatusFilter(event.target.value);
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <h3 className="text-xl font-semibold mb-2">Income vs Expense</h3>
        <div className="mb-4">
          <label htmlFor="incomeStatusFilter" className="block mb-1">Income Status:</label>
          <select id="incomeStatusFilter" value={incomeStatusFilter} onChange={handleIncomeStatusFilterChange} className="w-full">
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Recieved">Recieved</option>
            <option value="Confirmed">Confirmed</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="expenseStatusFilter" className="block mb-1">Expense Status:</label>
          <select id="expenseStatusFilter" value={expenseStatusFilter} onChange={handleExpenseStatusFilterChange} className="w-full">
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid ">Paid</option>
            <option value="Rejected">Rejected</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="w-1/3 p-4">
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default BarChart;

// Helper function to calculate income amount
const calculateIncomeAmount = (income) => {
  if (income.source === 'Hire Income' && income.hirePayment) {
    return income.hirePayment.hireAmount;
  } else if (income.source === 'Rental Income' && income.contractIncome) {
    return income.contractIncome.rentalAmount;
  }
  return 0;
};

// Helper function to calculate expense amount
const calculateExpenseAmount = (expense) => {
  switch (expense.category) {
    case 'Fuel':
      return expense.totalFuelPrice;
    case 'Maintenance and Repairs':
      return expense.maintenanceCost;
    case 'Insurance':
      return expense.premiumAmount;
    case 'Licensing and Permits':
      return expense.licenseCost;
    case 'Driver Wages':
      return expense.totalEarning;
    case 'Tolls and Parking':
        return expense.otherAmount;
    case 'Driver Hire Expense':
      return expense.otherAmount;
    case 'Other':
      return expense.otherAmount;
    default:
      return 0;
  }
};
