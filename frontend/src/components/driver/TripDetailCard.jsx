import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCar } from 'react-icons/fa'; 

const TripDetailCard = ({ trip }) => {
  return (
    <button className="bg-white rounded-md shadow-md hover:bg-gray-200 p-4 mb-4 ml-4 md:ml-10 mr-4 md:mr-14 flex flex-col md:flex-row items-center">
      {/* Date */}
      <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4">
        <p className="text-lg font-semibold mb-2">{trip.date}</p>
      </div>
      
      {/* Vertical Line */}
      <div className="border-l border-gray-300 h-auto md:h-8 mb-2 md:mb-0 md:mr-4"></div>
      
      {/* Pickup, Destination, and Time */}
      <div className="flex-grow md:flex-grow-0 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-600 mr-2" />
          <p className="text-gray-700 mb-2 md:mb-0">{trip.pickupLocation} - {trip.destination}</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <FaClock className="text-gray-600 mr-2" />
          <p className="text-gray-700">{trip.startTime}</p>
        </div>
      </div>
      
      {/* Vehicle */}
      <div className="flex items-center mt-2 md:mt-0">
        <FaCar className="text-gray-600 mr-2" />
        <p className="text-gray-700">{trip.vehicleName} ({trip.vehicleNumber})</p>
      </div>
    </button>
  );
};

export default TripDetailCard;
