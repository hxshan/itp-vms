import React, { useState } from 'react';

const ExpenseForm = () => {
  const [date, setDate] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  const [tripId, setTripId] = useState('');
  const [category, setCategory] = useState('');
  const [categoryDetails, setCategoryDetails] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status to Pending

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    // Reset category details when category changes
    setCategoryDetails('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { date, vehicle, recordedBy, tripId, category, categoryDetails, status };
    // You can submit expenseData to a backend API or perform other actions here
    console.log(expenseData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Expense Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">Vehicle:</label>
        <input type="text" id="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="recordedBy" className="block text-gray-700 text-sm font-bold mb-2">Recorded By:</label>
        <input type="text" id="recordedBy" value={recordedBy} onChange={(e) => setRecordedBy(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="tripId" className="block text-gray-700 text-sm font-bold mb-2">Trip ID:</label>
        <input type="text" id="tripId" value={tripId} onChange={(e) => setTripId(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Expense Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select category</option>
          <option value="Fuel">Fuel</option>
          <option value="Maintenance and Repair">Maintenance and Repair</option>
          <option value="Insurance">Insurance</option>
          <option value="Licensing and Permits">Licensing and Permits</option>
          <option value="Driver Wages">Driver Wages</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Render additional fields based on selected category */}
      {category && (
        <>
          {/* Common fields */}
          <div className="mb-4">
            <label htmlFor="categoryDetails" className="block text-gray-700 text-sm font-bold mb-2">{category} Details:</label>
            <textarea id="categoryDetails" value={categoryDetails} onChange={(e) => setCategoryDetails(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={`Enter details for ${category}`} rows={4} />
          </div>

          {/* Render additional fields based on selected category */}
          {category === 'Fuel' && (
            <>
              <div className="mb-4">
                {/* Render additional fields specific to Fuel category */}
                <label htmlFor="fuelType" className="block text-gray-700 text-sm font-bold mb-2">Fuel Type:</label>
                <input type="text" id="fuelType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {/* Add more fields specific to Fuel category as needed */}
            </>
          )}

          {category === 'Maintenance and Repair' && (
            <>
              <div className="mb-4">
                {/* Render additional fields specific to Maintenance and Repair category */}
                <label htmlFor="maintenanceType" className="block text-gray-700 text-sm font-bold mb-2">Maintenance Type:</label>
                <input type="text" id="maintenanceType" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {/* Add more fields specific to Maintenance and Repair category as needed */}
            </>
          )}

          {/* Add more conditions for other categories */}
        </>
      )}

      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Paid">Paid</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
