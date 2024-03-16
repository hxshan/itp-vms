import React, { useState, useEffect } from 'react';
import { FaPhone, FaCar } from 'react-icons/fa'; // Import icons for customer, phone, and car
import StartTripForm from './StartTripForm';

const TripCard = ({
  customerName,
  contact,
  vehicleName,
  vehicleNumber,
  pickupLocation,
  destination,
  startDate,
  startTime,
}) => {
  const [showStartTripForm, setShowStartTripForm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update currentDateTime every minute

    return () => clearInterval(intervalId);
  }, []);

  const calculateTimeUntilStart = (startDate, startTime) => {
    const tripStartDateTime = new Date(`${startDate}T${startTime}`);
    
    // Check if tripStartDateTime is a valid date
    if (isNaN(tripStartDateTime.getTime())) {
      return 'Invalid start date or time';
    }
    
    const differenceInMilliseconds = tripStartDateTime - currentDateTime;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''}`;
    } else if (differenceInMinutes < 1440) { // Less than 24 hours
      const hours = Math.floor(differenceInMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(differenceInMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  };

  const handleStartTrip = () => {
    setShowStartTripForm(true);
  };

  return (
    <div className="trip-card-container">
      <div className="bg-white shadow-md rounded-md p-10">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 mb-4">Trip Starts in {calculateTimeUntilStart(startDate,startTime)}</p>
          {!showStartTripForm && (
            <button onClick={handleStartTrip} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Start Trip
            </button>
          )}
        </div>
        <h2 className="text-lg font-bold mb-2">{customerName}</h2>
        <div className="flex items-center space-x-2">
          <FaPhone />
          <p>{contact}</p>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <FaCar />
          <p>{vehicleName} - {vehicleNumber}</p>
        </div>
        <p className="text-gray-500 mb-2">Pickup: {pickupLocation}</p>
        <p className="text-gray-500 mb-2">Destination: {destination}</p>
        <p className="text-gray-500 mb-2">Start Time: {startTime}</p>
      </div>
      {showStartTripForm && <StartTripForm trip={{
 
  vehicleName,
  vehicleNumber,
  pickupLocation,
  destination,
  
}} />}

    </div>
  );
};

export default TripCard;
