import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TripDetailsPopup = ({ showDetails, toggleDetails, trip }) => {
  if (!showDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-md shadow-md p-4 max-w-lg relative">
        <FaTimes className="absolute top-0 right-0 m-4 text-gray-500 cursor-pointer hover:text-gray-700" onClick={toggleDetails} />
        <p>Trip details:</p>
        <p>Customer: {trip.customerName}</p>
        <p>Contact: {trip.contact}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default TripDetailsPopup;
 