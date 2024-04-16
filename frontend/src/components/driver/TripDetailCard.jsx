import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaCar } from 'react-icons/fa';
import TripDetailsPopup from './TripDetailsPopup'; 

const TripDetailCard = ({ trip }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
    <button className="bg-white rounded-md shadow-md hover:bg-gray-200 p-4 mb-4 ml-4 md:ml-10 mr-4 md:mr-14 flex flex-col md:flex-row items-center" onClick={toggleDetails}>
  {/* Date */}
  <div className="flex-grow md:flex-grow-2 flex items-center">
    <div className="flex items-center">
      <p className="text-gray-700">{new Date(trip.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  </div>

  {/* Vertical Line */}
  <div className="border-l border-gray-500 h-auto md:h-8 mb-2 md:mb-0 md:mr-4 md:ml-4"></div>

  {/* Pickup and Destination */}
  <div className="flex items-center mb-2 md:mb-0 md:mr-4">
    <p className="text-lg font-semibold mr-2">{trip.startPoint.city}</p>
    <p className="text-lg font-semibold mr-2">-</p>
    <p className="text-lg font-semibold">{trip.endPoint}</p>
  </div>

  {/* Time and Car Details */}
  <div className="flex items-center">
    <div className="flex items-center mr-4 md:mr-6">
      <FaClock className="text-gray-600 mr-2" />
      <p className="text-sm md:text-base text-gray-600">{trip.startTime}</p>
    </div>
    <div className="flex items-center">
      <FaCar className="text-gray-600 mr-2" />
      <p className="text-sm md:text-base text-gray-600">{trip.vehicle.vehicleRegister} </p>
    </div>
  </div>
</button>




      {/* Trip details pop-up */}
      <TripDetailsPopup showDetails={showDetails} toggleDetails={toggleDetails} trip={trip} />
    </div>
  );
};

export default TripDetailCard;
