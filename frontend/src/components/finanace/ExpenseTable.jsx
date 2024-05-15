import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { ReactToPrint } from 'react-to-print';
import ViewExpense from './ViewExpense';
import EditExpenseForm from './EditExpenseForm';
import { useAuthContext } from "@/hooks/useAuthContext";

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVehicle, setFilterVehicle] = useState('All');
  const [reload, setReload] = useState(0);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleData, vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [EditselectedExpense, setEditSelectedExpense] = useState(null);
  const [filterReimbursement, setFilterReimbursement] = useState('All');

  const { user } = useAuthContext()

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

  const getVehicleData = () => {
    vehicleAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/vehicle/`,
    });
  }

  useEffect(() => {
    getVehicleData();
  }, []);

  useEffect(() => {
    if (vehicleData && vehicleData.vehicles) {
      const options = vehicleData.vehicles.map(vehicle => ({
        value: vehicle._id,
        label: `${vehicle.vehicleRegister}`,
      }));
      setVehicleOptions(options);
    }
  }, [vehicleData]);

  useEffect(() => {
    if (expensesData && expensesData.length > 0) {
      const filteredExpenses = expensesData.filter((expense) => {
        return (
          (filterVehicle === 'All' || (expense.vehicle && expense.vehicle._id === filterVehicle)) &&
          (filterCategory === 'All' || expense.category === filterCategory) &&
          (filterStatus === 'All' || expense.status === filterStatus)&&
          (filterReimbursement === 'All' || (expense.isReimbursement ? 'true' : 'false') === filterReimbursement)
        );
      });
      setExpenses(filteredExpenses);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [expensesData, filterDate, filterCategory, filterStatus, filterVehicle, filterReimbursement]);

  useEffect(() => {
    if (updateResponse) {
      setReload((prevReload) => prevReload + 1);
    }
  }, [updateResponse]);

  const handleEditExpense = (expense) => {
    setEditSelectedExpense(expense);
  };

  const handleSaveExpense = (editedExpense) => {
    console.log(editedExpense)
    updateAxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/expense/${editedExpense._id}/`,
      requestConfig: {
        data: editedExpense
      },
      headers:{
        withCredentials:true,
        authorization:`Bearer ${user?.accessToken}`
      }
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
            headers:{
              withCredentials:true,
              authorization:`Bearer ${user?.accessToken}`
            }
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
    console.log(expense.isReimbursement)
    switch (expense.category) {
      case 'Fuel':
        return `Rs.${expense.totalFuelPrice}`;
      case 'Maintenance and Repairs':
        return `Rs.${expense.maintenanceCost.toFixed(2)}`;
      case 'Insurance':
        return `Rs.${expense.premiumAmount.toFixed(2)}`;
      case 'Licensing and Permits':
        return `Rs.${expense.licenseCost.toFixed(2)}`;
      case 'Driver Wages':
        return `Rs.${expense.totalEarning.toFixed(2)}`;
      case 'Tolls and Parking':
        return `Rs.${expense.otherAmount.toFixed(2)}`;
        case 'Driver Hire Expense':
          return `Rs.${expense.otherAmount.toFixed(2)}`;
          case 'Other':
            return `Rs.${expense.otherAmount.toFixed(2)}`;
      default:
        return 'Unknown';
    }
  };

  

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <div className="flex gap-4 w-fit">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Categories</option>
            <option value="Fuel">Fuel</option>
            <option value="Maintenance and Repairs">Maintenance and Repairs</option>
            <option value="Insurance">Insurance</option>
            <option value="Licensing and Permits">Licensing and Permits</option>
            <option value="Driver Wages">Driver Wages</option>
            <option value="Tolls and Parking">Tolls and Parking</option>
            <option value="Driver Hire Expense">Driver Hire Expense</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
            className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Vehicles</option>
            {vehicleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
        <select
    value={filterReimbursement}
    onChange={(e) => setFilterReimbursement(e.target.value)}
    className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="All">All Expenses</option>
    <option value="true">Reimbursement Expense</option>
    <option value="false">Non Reimbursement Expense</option>
  </select>
</div>

        <ReactToPrint
          trigger={() => (
            <button className="bg-actionRed hover:bg-red-800 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
              Generate Expense Table
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="print:border print:border-gray-800 print:border-4 print:p-8 overflow-x-auto">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary">
              <tr >
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Reimbursement</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((expense, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{expense.vehicle.vehicleRegister}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{expense.category}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{expense.status}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{getAmountBasedOnCategory(expense)}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{expense.isReimbursement ? 'Yes' : 'No'}</td>


                  <td className="px-6 py-2 whitespace-nowrap justify-between flex">
                    <button
                      onClick={() => handleViewExpense(expense)}
                      className="bg-actionBlue text-white py-1 px-6 rounded-md print:hidden"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="bg-actionGreen text-white py-1 px-6 rounded-md print:hidden"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense._id, expense.status)}
                      className="bg-actionRed text-white py-1 px-6 rounded-md print:hidden"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <div className="flex justify-center mt-4">
        <ul className="flex list-none border border-gray-300 rounded-md">
          {Array.from({ length: Math.ceil(expenses.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`cursor-pointer px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`} onClick={() => paginate(index + 1)}>{index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTable;
