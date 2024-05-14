import React, { useState, useEffect } from 'react';
import { ReactToPrint } from 'react-to-print';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import EditIncomeForm from './EditIncomeForm';

const IncomeTable = () => {
  
  const [income, setIncome] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [filterSource, setFilterSource] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVehicle, setFilterVehicle] = useState('All');
  const [reload, setReload] = useState(0);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleData, vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios();
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
    if (incomesData && incomesData.length > 0) {
      const filteredIncomes = incomesData.filter((income) => {
        return (
          (filterSource === 'All' || income.source === filterSource) &&
          (filterStatus === 'All' || income.status === filterStatus) &&
          (filterVehicle === 'All' || income.vehicle._id === filterVehicle) 
        );
      });
      setIncome(filteredIncomes);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [incomesData, filterSource, filterStatus, filterVehicle]);

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
        return `Rs.${income.hirePayment.hireAmount.toFixed(0)}`;
      case 'Rental Income':
        return `Rs.${income.contractIncome ? income.contractIncome.rentalAmount.toFixed(0) : 0}`;
      default:
        return 'Unknown';
    }
  };
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = income.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <div className="flex gap-4 w-fit">
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Sources</option>
            <option value="Hire Income">Hire Income</option>
            <option value="Rental Income">Rental Income</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="shadow border rounded w-full min-w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Confirmed">Confirmed</option>
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
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="bg-actionRed hover:bg-red-800 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
              Generate Income Table
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="print:border print:border-gray-800 print:border-4 print:p-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary">
              <tr >
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((income, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(income.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{income.vehicle.vehicleRegister}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{income.source}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{income.status}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{getAmountBasedOnSource(income)}</td>
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                  <button
                      onClick={() => handleViewExpense(income)}
                      className="bg-actionBlue text-white py-1 px-6 mr-2 rounded-md print:hidden"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditIncome(income)}
                      className="bg-actionGreen text-white py-1 px-6  mr-2 rounded-md print:hidden"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteIncome(income._id, income.status)}
                      className="bg-actionRed text-white py-1 px-6 mr-2 rounded-md print:hidden"
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
      {EditselectedIncome && (
        <EditIncomeForm
          income={EditselectedIncome}
          onSave={handleSaveIncome}
          onCancel={handleCancelEdit}
        />
      )}
      <div className="flex justify-center mt-4">
        <ul className="flex list-none border border-gray-300 rounded-md">
          {Array.from({ length: Math.ceil(income.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`cursor-pointer px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`} onClick={() => paginate(index + 1)}>{index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeTable;
