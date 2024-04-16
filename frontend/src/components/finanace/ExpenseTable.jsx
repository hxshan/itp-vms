import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { ReactToPrint } from 'react-to-print';
import ViewExpense from './ViewExpense';
import EditExpenseForm from './EditExpenseForm';

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [reload, setReload] = useState(0);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [EditselectedExpense, setEditSelectedExpense] = useState(null);

  const [expensesData, expensesError, expensesLoading, expensesAxiosFetch] = useAxios();
  const [deleteResponse, deleteError, deleteLoading, deleteAxiosFetch] = useAxios();
  const [updateResponse, updateError, updateLoading, updateAxiosFetch] = useAxios();
  const componentRef = React.createRef();

  useEffect(() => {
    expensesAxiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/expense/',
    });
  }, [reload]);

  useEffect(() => {
    if (expensesData && expensesData.length > 0) {
      const filteredExpenses = expensesData.filter((expense) => {
        return (
          (filterDate === '' || new Date(expense.date).toLocaleDateString() === filterDate) &&
          (filterCategory === 'All' || expense.category === filterCategory) &&
          (filterStatus === 'All' || expense.status === filterStatus)
        );
      });
      setExpenses(filteredExpenses);
    }
  }, [expensesData, filterDate, filterCategory, filterStatus]);

  useEffect(() => {
    if (updateResponse) {
      setReload((prevReload) => prevReload + 1);
    }
  }, [updateResponse]);

  const handleEditExpense = (expense) => {
    setEditSelectedExpense(expense);
  };

  const handleSaveExpense = (editedExpense) => {
    updateAxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/expense/${editedExpense._id}/`,
      requestConfig: {
        data: editedExpense,
      },
    });
    setEditSelectedExpense(null);
  };

  const handleCancelEdit = () => {
    setEditSelectedExpense(null);
  };

  const handleDeleteExpense = async (id, status) => {
    if (status === 'Paid') {
      alert("This expense cannot be deleted as it has already been paid.");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
      if (confirmDelete) {
        try {
          await deleteAxiosFetch({
            axiosInstance: axios,
            method: 'DELETE',
            url: `/expense/${id}`,
          });
          setReload((prevReload) => prevReload + 1);
        } catch (error) {
          console.error("Error deleting expense:", error);
          alert("An error occurred while deleting expense. Please try again.");
        }
      }
    }
  };

  const handleViewExpense = (expense) => {
    setSelectedExpense(expense);
  };

  const getAmountBasedOnCategory = (expense) => {
    switch (expense.category) {
      case 'Fuel':
        return `Rs.${expense.fuelDetails.totalPrice.toFixed(2)}`;
      case 'Maintenance and Repairs':
        return `Rs.${expense.maintenanceDetails.maintenanceCost.toFixed(2)}`;
      case 'Insurance':
        return `Rs.${expense.insuranceDetails.premiumAmount.toFixed(2)}`;
      case 'Licensing and Permits':
        return `Rs.${expense.licensingDetails.licenseCost.toFixed(2)}`;
      case 'Driver Wages':
        return `Rs.${expense.driverWages.totalEarning.toFixed(2)}`;
      case 'Other':
        return `Rs.${expense.other.amount.toFixed(2)}`;
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="All">All Categories</option>
            <option value="Fuel">Fuel</option>
            <option value="Maintenance and Repairs">Maintenance and Repairs</option>
            <option value="Insurance">Insurance</option>
            <option value="Licensing and Permits">Licensing and Permits</option>
            <option value="Driver Wages">Driver Wages</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="bg-gray-400 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
              Generate Expense Table
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="print:border print:border-gray-800 print:border-4 print:p-8 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2 print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="px-4 py-2">{expense.vehicle.vehicleRegister}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2">{expense.status}</td>
                <td className="px-4 py-2">{getAmountBasedOnCategory(expense)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewExpense(expense)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-1 print:hidden"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditExpense(expense)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-1 print:hidden"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense._id, expense.status)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded print:hidden"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedExpense && (
        <ViewExpense expense={selectedExpense} onClose={() => setSelectedExpense(null)} />
      )}
      {EditselectedExpense && (
        <EditExpenseForm
          expense={EditselectedExpense}
          onSave={handleSaveExpense}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
