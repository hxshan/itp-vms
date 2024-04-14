// EmergencyReportForm.js

import React, { useState } from 'react';

const EmergencyReportForm = ({ trip }) => {
  const [emergencyDetails, setEmergencyDetails] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    driverName: trip.driver.firstName,
    vehicleNumber: trip.vehicle.vehicleRegister,
    vehicleName: trip.vehicle.vehicleType,
    location: '',
    emergencyType: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(emergencyDetails);
    // Clear form fields
    setEmergencyDetails({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      driverName: trip.driver.firstName,
      vehicleNumber: trip.vehicle.vehicleRegister,
      vehicleName: trip.vehicle.vehicleType,
      location: '',
      emergencyType: '',
      description: ''
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Emergency Report Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={emergencyDetails.location} 
            onChange={handleChange} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
            required
          />
        </div>
        <div>
          <label htmlFor="emergencyType" className="block font-medium text-gray-700">Type of Emergency</label>
          <input 
              type="text" 
              id="emergencyType" 
              name="emergencyType"
              value={emergencyDetails.emergencyType} 
              onChange={handleChange} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
              required 
         />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <textarea 
             id="description" 
             name="description" 
             value={emergencyDetails.description} 
             onChange={handleChange} 
             className="mt-1 p-2 border border-gray-300 rounded-md w-full" rows="4" 
             required>
        </textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default EmergencyReportForm;
