import React, { useState, useEffect } from 'react';
import { FaPhone, FaCar, FaClock, FaTimes } from 'react-icons/fa'; // Import icons for customer, phone, car, clock, and close

import StartTripForm from './StartTripForm';

const TripCard = ({trip}) => {
  const [showStartTripForm, setShowStartTripForm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update currentDateTime every minute

    return () => clearInterval(intervalId);
  }, []);

 
  
  

  const calculateTimeUntilStart = (startDate, startTime, status) => {
    console.log(startDate, startTime);
    if (!startDate || !startTime) {
        return 'Invalid input';
    }

    const isoDate = startDate;
   const convertedDate = isoDate.substring(0, 10);
    const tripStartDateTime = new Date(convertedDate + 'T' + startTime);

    console.log(tripStartDateTime);

    // Check if tripStartDateTime is a valid date
    if (isNaN(tripStartDateTime.getTime())) {
        return 'Invalid';
    }
    if(status === 'Active'){
          const differenceInMilliseconds = tripStartDateTime - currentDateTime;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    
    if (differenceInMinutes < 60) {
        return `Trip starts in ${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''}`;
    } else if (differenceInMinutes < 1440) { // Less than 24 hours
        const hours = Math.floor(differenceInMinutes / 60);
        return `Trip starts in ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
        const days = Math.floor(differenceInMinutes / 1440);
        return `Trip starts in ${days} day${days !== 1 ? 's' : ''}`;
    }
  }else if(status ='Ongoing')
  {

    const differenceInMillisecondsongoing = currentDateTime - tripStartDateTime;

    const differenceInMinutes = Math.floor(differenceInMillisecondsongoing / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    // If the trip started less than an hour ago, show the time in minutes
    if (differenceInMinutes < 60) {
      return `Trip started ${differenceInMinutes} minute${differenceInMinutes !== 1 ? 's' : ''} ago`;
    }
    // If the trip started less than 24 hours ago, show the time in hours
    else if (differenceInHours < 24) {
      return `Trip started ${differenceInHours} hour${differenceInHours !== 1 ? 's' : ''} ago`;
    }
    // Otherwise, show the time in days
    else {
      return `Trip started ${differenceInDays} day${differenceInDays !== 1 ? 's' : ''} ago`;
    }

  }
};






  
  

  const handleStartTrip = () => {
    const timeUntilStart = calculateTimeUntilStart(trip.startDate, trip.startTime,trip.hireStatus);
  
    
    if (timeUntilStart && timeUntilStart.includes('minute')) {
      setShowStartTripForm(true);
    } else {
      // Handle case where the trip cannot be started yet
      console.log('Trip cannot be started yet');
      // Optionally, you can display a message to the user indicating that the trip cannot be started yet
    }
  };

  return (
    <div className="trip-card-container p-8 bg-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500 font-semibold mr-15"> {calculateTimeUntilStart(trip.startDate, trip.startTime, trip.hireStatus)}</p>
        {!showStartTripForm && (
          <button 
            onClick={handleStartTrip} 
            className={`bg-blue-500 text-white py-2 px-6 rounded-lg ml-20 hover:bg-blue-600 ${calculateTimeUntilStart(trip.startDate, trip.startTime, trip.hireStatus).includes('minute') ? '' : 'opacity-50'}`}
          >
            Start Trip
          </button>
        )}
      </div>
      <hr className="border-t border-gray-400 mb-6" />
      <div className="flex items-center mb-6">
        <p className="text-lg font-semibold mr-4">{trip.cusName}</p>
        <div className="flex items-center">
          <FaPhone className="text-gray-500 mr-2" />
          <p>{trip.cusMobile}</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FaCar className="text-gray-500 mr-2" />
          <p>{trip.vehicle.vehicleRegister}</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-gray-500 font-semibold">Pickup Location</p>
        <p className="text-lg">{trip.startPoint.no}, {trip.startPoint.street}, {trip.startPoint.city}</p>
      </div>
      <div className="mb-6">
        <p className="text-gray-500 font-semibold">Destination</p>
        <p className="text-lg">{trip.endPoint}</p>
      </div>
      <div className="flex items-center mb-6">
        <FaClock className="text-gray-500 mr-2" />
        <p>{trip.startTime}</p>
      </div>
      {showStartTripForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <StartTripForm trip={trip } />
            <button onClick={() => setShowStartTripForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
