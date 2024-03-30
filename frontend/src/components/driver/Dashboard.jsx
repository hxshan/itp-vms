import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import TripCard from './UpcomingTrip';
import TripDetailCard from './TripDetailCard';
import useAxiosGet from '@/hooks/useAxiosGet';

const Dashboard = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-17',
      startTime: '17:30',
    },
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-15',
      startTime: '10:30',
    },
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-15',
      startTime: '10:30',
    },
  ]);
  const [pastTrips, setPastTrips] = useState([
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-15',
      startTime: '10:30',
    },
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-15',
      startTime: '10:30',
    },
    {
      id: 101,
      customerName: 'Alice',
      contact: '987654321',
      vehicleName: 'Ford Mustang',
      vehicleNumber: 'DEF 456',
      pickupLocation: 'Some Street',
      destination: 'Mall',
      startDate: '2024-03-15',
      startTime: '10:30',
    },
  ]);

  // Select the very next trip
  const nextTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;

  return (
    <div className="container mx-auto">
      
        
      <div className="flex flex-col items-start ml-10 mt-4 ">
          <div>
            {nextTrip ? (
              <TripCard key={nextTrip.id} {...nextTrip} />
            ) : (
              <p>No upcoming trips</p>
            )}
          </div>
     </div>
        
     <div className="flex flex-col lg:flex-row lg:justify-between">
  <div className="lg:w-1/2 lg:ml-10 mr-4">
    <div className="flex flex-col items-start mt-4 mb-4">
      <div className="flex items-center">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <h2 className="text-xl lg:text-2xl font-bold">Your Upcoming Trips</h2>
      </div>
      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 mt-2">
        {upcomingTrips.map((trip) => (
          <TripDetailCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  </div>

  <div className="lg:w-1/2 lg:ml-4 mt-4 lg:mt-0">
    <div className="flex flex-col items-start mt-4 mb-4">
      <div className="flex items-center">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <h2 className="text-xl lg:text-2xl font-bold">Your Past Trips</h2>
      </div>
      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 mt-2">
        {pastTrips.map((trip) => (
          <TripDetailCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  </div>
</div>


      
    </div>
  );
};

export default Dashboard;
