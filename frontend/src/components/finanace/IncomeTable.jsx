import React, { useState, useEffect } from 'react';
import { ReactToPrint } from 'react-to-print';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import EditIncomeForm from './EditIncomeForm';

const IncomeTable = () => {
  const [income, setIncome] = useState([]);
  const [filterSource, setFilterSource] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [reload, setReload] = useState(0);

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [EditselectedIncome, setEditSelectedIncome] = useState(null);

  const [incomesData, incomesError, incomesLoading, incomesAxiosFetch] = useAxios();
  const [deleteResponse, deleteError, deleteLoading, deleteAxiosFetch] = useAxios();
  const [updateResponse, updateError, updateLoading, updateAxiosFetch] = useAxios();
  const componentRef = React.createRef();

  useEffect(() => {
    incomesAxiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/income/',
    });
  }, [reload]);

  useEffect(() => {
    if (incomesData && incomesData.length > 0) {
      const filteredIncomes = incomesData.filter((income) => {
        return (
          (filterSource === 'All' || income.source === filterSource) &&
          (filterStatus === 'All' || income.status === filterStatus)
        );
      });
      setIncome(filteredIncomes);
    }
  }, [incomesData, filterSource, filterStatus]);

  useEffect(() => {
    if (updateResponse) {
      setReload((prevReload) => prevReload + 1);
    }
  }, [updateResponse]);

  const handleEditIncome = (income) => {
    setEditSelectedIncome(income);
  };

  const handleSaveIncome = (editedIncome) => {
    updateAxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/income/${editedIncome._id}/`,
      requestConfig: {
        data: editedIncome,
      },
    });
    setEditSelectedIncome(null);
  };

  const handleCancelEdit = () => {
    setEditSelectedIncome(null);
  };

  const handleDeleteIncome = async (id, status) => {
    if (status === 'Confirmed') {
      alert('This income cannot be deleted as it has already been paid.');
    } else {
      const confirmDelete = window.confirm('Are you sure you want to delete this income?');
      if (confirmDelete) {
        try {
          await deleteAxiosFetch({
            axiosInstance: axios,
            method: 'DELETE',
            url: `/income/${id}`,
          });
          setReload((prevReload) => prevReload + 1);
        } catch (error) {
          console.error('Error deleting income:', error);
          alert('An error occurred while deleting income. Please try again.');
        }
      }
    }
  };

  const getAmountBasedOnSource = (income) => {
    switch (income.source) {
      case 'Hire Income':
        return `Rs.${income.hirePayment.hireAmount.toFixed(2)}`;
      case 'Rental Income':
        return `Rs.${income.contractIncome ? income.contractIncome.rentalAmount.toFixed(2) : 0}`;
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-x-4">
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="All">All Sources</option>
            <option value="Hire Income">Hire Income</option>
            <option value="Rental Income">Rental Income</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="bg-gray-400 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
              Generate Income Table
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="print:border print:border-gray-800 print:border-4 print:p-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2 print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {income.map((income, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{new Date(income.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="px-4 py-2">{income.vehicle.vehicleRegister}</td>
                <td className="px-4 py-2">{income.source}</td>
                <td className="px-4 py-2">{income.status}</td>
                <td className="px-4 py-2">{getAmountBasedOnSource(income)}</td>
                <td className="px-4 py-2">
                <button
                  onClick={() => handleViewExpense(income)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-1 print:hidden"
                >
                  View
                </button>
                  <button
                    onClick={() => handleEditIncome(income)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-1 print:hidden"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteIncome(income._id, income.status)}
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
      {EditselectedIncome && (
        <EditIncomeForm
          income={EditselectedIncome}
          onSave={handleSaveIncome}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default IncomeTable;
