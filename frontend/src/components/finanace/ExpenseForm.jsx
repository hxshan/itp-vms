import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit }) => {
  const [expenseData, setExpenseData] = useState({
    vehicle: '',
    type: '',
    amount: '',
    date: '',
    receiptImage: '',
    notes: '',
    fuelDetails: {
      fuelType: '',
      fuelQuantity: '',
      fuelPricePerUnit: ''
    },
    maintenanceDetails: {
      description: '',
      partsCost: '',
      laborCost: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value
    });
  };

  const handleFuelDetailsChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      fuelDetails: {
        ...expenseData.fuelDetails,
        [name]: value
      }
    });
  };

  const handleMaintenanceDetailsChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      maintenanceDetails: {
        ...expenseData.maintenanceDetails,
        [name]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expenseData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle">
          Vehicle:
        </label>
        <input
          type="text"
          name="vehicle"
          value={expenseData.vehicle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Expense Type:</label>
        <div className="flex items-center">
          {['Fuel', 'Maintenance', 'Insurance', 'Repairs', 'Other'].map((type) => (
            <div key={type} className="mr-4">
              <input
                type="radio"
                id={type}
                name="type"
                value={type}
                checked={expenseData.type === type}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={type} className="text-gray-700">{type}</label>
            </div>
          ))}
        </div>
      </div>
      {expenseData.type === 'Fuel' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuelType">
            Fuel Type:
          </label>
          <select
            name="fuelType"
            value={expenseData.fuelDetails.fuelType}
            onChange={handleFuelDetailsChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Fuel Type</option>
            {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map((fuelType) => (
              <option key={fuelType} value={fuelType}>{fuelType}</option>
            ))}
          </select>
        </div>
      )}
      {expenseData.type === 'Maintenance' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={expenseData.maintenanceDetails.description}
            onChange={handleMaintenanceDetailsChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      )}
      {/* Add other expense fields here with similar conditional rendering */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
