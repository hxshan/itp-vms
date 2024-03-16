import React, { useState, useEffect } from 'react';

const StartTripForm = ({ trip }) => {
  const { vehicleName, vehicleNumber, pickupLocation, destination } = trip;
  const [mileage, setMileage] = useState('');
  const [odometerImage, setOdometerImage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [pickLocation, setPickUpLocation] = useState(`${pickupLocation}`);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current time in HH:MM format
    setStartDate(currentDate);
    setStartTime(currentTime);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setOdometerImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, including sending the image file to the server
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
          Pickup Location:
        </label>
        <input
          type="text"
          id="pickupLocation"
          value={pickLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination:
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          readOnly
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
          Vehicle:
        </label>
        <input
          type="text"
          id="vehicle"
          value={`${vehicleName} - ${vehicleNumber}`}
          readOnly
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
          Starting Mileage:
        </label>
        <input
          type="number"
          id="mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          readOnly
          required
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          readOnly
          required
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="odometerImage" className="block text-sm font-medium text-gray-700">
          Odometer Photo:
        </label>
        <input
          type="file"
          id="odometerImage"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Start Trip
      </button>
    </form>
  );
};

export default StartTripForm;
