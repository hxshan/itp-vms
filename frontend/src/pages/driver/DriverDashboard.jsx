import React from 'react';
import TripCard from '../../components/driver/UpcomingTrip'; // Import the TripCard component

const DriverDashboard = () => {
  
  const upcomingTrip = {
    customerName: 'Ramla',
    contact: '1234579',
    vehicleName: 'Toyota Prius',
    vehicleNumber: 'ABC 123',
    pickupLocation: 'No 55 park road',
    destination: 'Airport',
    startTime: 'Wednesday, March 13th, 2024 10:50 PM',
    minutesUntilStart: 30,
  };

  return (
    <div>
      
      <TripCard {...upcomingTrip} />
    </div>
  );
};

export default DriverDashboard;
