import React, { useState, useEffect } from 'react';

const PastTripsTable = () => {
  // State to store past trips data
  const [pastTrips, setPastTrips] = useState([]);

  // Fetch past trips data from the backend or mock data
  useEffect(() => {
    // Fetch past trips data from the backend or use mock data
    const sampleData = [
      { id: 1, date: '2023-12-01', startTime: '10:00 AM', endTime: '12:00 PM', duration: '2 hours', startLocation: 'Main Street', endLocation: 'Airport', fare: 'Rs. 8000' },
      { id: 2, date: '2024-16-02', startTime: '08:00 PM', endTime: '08:00 PM', duration: '2 hours', startLocation: 'Park Road', endLocation: 'City Center', fare: 'Rs. 10000' },
      // Add more past trips data as needed
    ];
    setPastTrips(sampleData);
  }, []);

  // Function to handle editing a trip
  const handleEditTrip = (tripId) => {
    // Logic to handle editing the trip
    console.log(`Editing trip with ID: ${tripId}`);
  };

  // Function to check if a trip can be edited (within 1 hour of end time)
  const canEditTrip = (endTime) => {
    const oneHourInMillis = 60 * 60 * 1000;
    const tripEndTime = new Date(endTime).getTime();
    const currentTime = new Date().getTime();
    return currentTime - tripEndTime < oneHourInMillis;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trip ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fare
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pastTrips.map((trip) => (
            <tr key={trip.id}>
              <td className="px-6 py-4 whitespace-nowrap">{trip.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.startTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.endTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.duration}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.startLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.endLocation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.fare}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {canEditTrip(trip.endTime) && (
                  <button
                    onClick={() => handleEditTrip(trip.id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
                  View Summary
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastTripsTable;
