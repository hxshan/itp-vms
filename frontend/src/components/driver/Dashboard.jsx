import React, {useState,useEffect} from 'react';
import TripCard from './UpcomingTrip';
import TripDetailCard from './TripDetailCard';
import StartTripForm from './StartTripForm';


const  Dashboard = () => {
    const upcomingTrip = {
      customerName: 'Ramla',
      contact: '1234579',
      vehicleName: 'Toyota Prius',
      vehicleNumber: 'ABC 123',
      pickupLocation: 'No 55 park road',
      destination: 'Airport',
      startDate: '2024-03-17',
      startTime: '11:00:00',
    };
  
    const trip = {
      date: 'March 13, 2024',
      pickupLocation: 'Main Street',
      destination: 'Airport',
      startTime: '10:00 AM',
      vehicleName: 'Toyota Camry',
      vehicleNumber: 'ABC 123',
    };
  
    const driverName = 'kamala';
    const [showStartTripForm, setShowStartTripForm] = useState(false);
  
    const handleStartTrip = () => {
      setShowStartTripForm(true);
    };
  
    return (
      <div>
       
       
       
          <div>
            <div className='flex right mt-14 mb-14 ml-10 mr-10'>
              <TripCard {...upcomingTrip} />
            </div>
            <div className='flex right ml-10 mr-10 mt-4 mb-4'>
              <h2> Your Upcoming Trips</h2>
            </div>
            <div> <TripDetailCard trip={trip} /></div>
  
          </div>
       
      
      </div>
    );
  };
   
  export default Dashboard;

  