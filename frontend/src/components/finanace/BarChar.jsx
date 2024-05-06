import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [filteredIncome, setFilteredIncome] = useState([]);
  const [filteredExpense, setFilteredExpense] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);
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

  useEffect(() => {
    // Combine all unique dates from income and expense data
    const allDates = new Set([...filteredIncome.map((income) => income.date), ...filteredExpense.map((expense) => expense.date)]);
    setDateLabels(Array.from(allDates).sort());

    console.log(allDates)
  }, [filteredIncome, filteredExpense]);

  

  const calculateTotalIncomeForDate = (date) => {
    return filteredIncome.reduce((total, income) => {
      return income.date === date ? total + calculateIncomeAmount(income) : total;
    }, 0);
  };

  const calculateTotalExpenseForDate = (date) => {
    return filteredExpense.reduce((total, expense) => {
      return expense.date === date ? total + calculateExpenseAmount(expense) : total;
    }, 0);
  };

  const calculateIncomeAmount = (income) => {
    let totalIncome = 0;
    if (income.source === 'Hire Income' && income.hirePayment) {
      totalIncome += income.hirePayment.hireAmount;
    } else if (income.source === 'Rental Income' && income.contractIncome) {
      totalIncome += income.contractIncome.rentalAmount;
    }
    return totalIncome;
  };
  
  const calculateExpenseAmount = (expense) => {
    let totalExpense = 0;
    switch (expense.category) {
      case 'Fuel':
        totalExpense += expense.fuelDetails.totalPrice;
        break;
      case 'Maintenance and Repairs':
        totalExpense += expense.maintenanceDetails.maintenanceCost;
        break;
      case 'Insurance':
        totalExpense += expense.insuranceDetails.premiumAmount;
        break;
      case 'Licensing and Permits':
        totalExpense += expense.licensingDetails.licenseCost;
        break;
      case 'Driver Wages':
        totalExpense += expense.driverWages.totalEarning;
        break;
      case 'Other':
        totalExpense += expense.other.amount;
        break;
      default:
        break;
    }
    return totalExpense;
  };
  
  const barChartData = {
    labels: dateLabels.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Income',
        data: dateLabels.map((date) => calculateTotalIncomeForDate(date)),
        backgroundColor: 'green',
      },
      {
        label: 'Expense',
        data: dateLabels.map((date) => calculateTotalExpenseForDate(date)),
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div>
      
        <h3 className="text-xl font-semibold mb-2">Income vs Expense</h3>
        <Bar data={barChartData} />
      </div>
   
  );
};

export default BarChart;
