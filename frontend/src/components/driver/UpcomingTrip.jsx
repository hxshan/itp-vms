import React from 'react';
import { FaUser, FaPhone, FaCar } from 'react-icons/fa'; // Import icons for customer, phone, and car

const TripCard = ({
  customerName,
  contact,
  vehicleName,
  vehicleNumber,
  pickupLocation,
  destination,
  startTime,
  minutesUntilStart,
}) => {
  const handleStartTrip = () => {
    
  };

  return (
    <div className="trip-card-container">
      <div className="bg-white shadow-md rounded-md p-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{customerName}</h2>
          <div className="flex items-center space-x-2">
            <FaPhone />
            <p>{contact}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <FaCar />
          <p>{vehicleName} - {vehicleNumber}</p>
        </div>
        <p className="text-gray-500 mb-2">Pickup: {pickupLocation}</p>
        <p className="text-gray-500 mb-2">Destination: {destination}</p>
        <p className="text-gray-500 mb-2">Start Time: {startTime}</p>
        <p className="text-gray-500 mb-4">{minutesUntilStart} minutes until start</p>
        <button onClick={handleStartTrip} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Start Trip
        </button>
      </div>
    </div>
  );
};

export default TripCard;
