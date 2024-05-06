import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';

const Total = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
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
    const calculateTotalIncome = () => {
      let total = 0;
      incomeData.forEach((income) => {
        if (incomeStatusFilter === 'All' || income.status === incomeStatusFilter) {
          if (income.source === 'Hire Income' && income.hirePayment) {
            total += income.hirePayment.hireAmount;
          } else if (income.source === 'Rental Income' && income.contractIncome) {
            total += income.contractIncome.rentalAmount;
          }
        }
      });
      setTotalIncome(total);
    };

    const calculateTotalExpense = () => {
      let total = 0;
      expenseData.forEach((expense) => {
        if (expenseStatusFilter === 'All' || expense.status === expenseStatusFilter) {
          switch (expense.category) {
            case 'Fuel':
              total += expense.fuelDetails.totalPrice;
              break;
            case 'Maintenance and Repairs':
              total += expense.maintenanceDetails.maintenanceCost;
              break;
            case 'Insurance':
              total += expense.insuranceDetails.premiumAmount;
              break;
            case 'Licensing and Permits':
              total += expense.licensingDetails.licenseCost;
              break;
            case 'Driver Wages':
              total += expense.driverWages.totalEarning;
              break;
            case 'Other':
              total += expense.other.amount;
              break;
            default:
              break;
          }
        }
      });
      setTotalExpense(total);
    };

    calculateTotalIncome();
    calculateTotalExpense();
  }, [incomeData, expenseData, incomeStatusFilter, expenseStatusFilter]);

  return (
    <div className="container mx-auto p-4">
     

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Total Income:</h3>
          <div className="bg-green-100 rounded-md p-4 mb-4">
            <div className="text-xl font-semibold mb-2">{totalIncome}</div>
          </div>
          <select
            value={incomeStatusFilter}
            onChange={(e) => setIncomeStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2 mb-4"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Total Expense:</h3>
          <div className="bg-red-100 rounded-md p-4 mb-4">
            <div className="text-xl font-semibold mb-2">{totalExpense}</div>
          </div>
          <select
            value={expenseStatusFilter}
            onChange={(e) => setExpenseStatusFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2 mb-4"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
         
          <ul>
            {incomeData.map((income) => (
              (incomeStatusFilter === 'All' || income.status === incomeStatusFilter) && (
                <li key={income._id}></li>
              )
            ))}
          </ul>
        </div>

        <div>
          
          <ul>
            {expenseData.map((expense) => (
              (expenseStatusFilter === 'All' || expense.status === expenseStatusFilter) && (
                <li key={expense._id}></li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Total;
