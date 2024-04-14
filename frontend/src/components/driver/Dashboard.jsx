import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { FaCalendarAlt } from 'react-icons/fa';
import TripCard from './UpcomingTrip';
import TripDetailCard from './TripDetailCard';
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const { user } = useAuthContext()

  const [tripData,tripError, tripLoading, tripAxiosFetch] = useAxios();


  const [userID,setUserID]=useState('')
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setUserID(decodedToken?.UserInfo?.id);
  }, [user]);
  
console.log(userID)
  
useEffect(() => {
  if(userID) {
    tripAxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/hire/driver/${userID}`, // Use userID variable dynamically
    });
  }
}, [userID]);
console.log(tripData)

  useEffect(() => {
    if (tripData && tripData.length > 0) {
      
      const currentDate = new Date();

      console.log(currentDate)
      const past = [];
      const upcoming = [];

      

      tripData.forEach(trip => {
        
        const isoDate = trip.startDate;
        const convertedDate = isoDate.substring(0, 10);
         const tripStartDateTime = new Date(convertedDate + 'T' + trip.startTime);
       console.log(tripStartDateTime > currentDate, tripStartDateTime, currentDate )
       console.log((trip.hireStatus === "Active" ||trip.hireStatus === "Ongoing"), trip.hireStatus)
         if (tripStartDateTime > currentDate && (trip.hireStatus === "Active" ||trip.hireStatus === "Ongoing")) {
          upcoming.push(trip);
      } else if (tripStartDateTime < currentDate && 
                 (trip.hireStatus === "Completed" || 
                  trip.hireStatus === "Ended" || 
                  trip.hireStatus === "Cancelled")) {
          past.push(trip);
      }
      
      });

      setPastTrips(past);
      setUpcomingTrips(upcoming);
    }
  }, [tripData]);
  // Select the very next trip
  const nextTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;



  return (
    <div className="container mx-auto">
      
        
      <div className="flex flex-col items-start ml-10 mt-4 ">
          <div>
            {nextTrip ? (
              <TripCard key={nextTrip._id} trip={nextTrip} /> 
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
          <TripDetailCard key={trip._id} trip={trip} />
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
      {pastTrips
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => {
          const dateA = new Date(a.startDate + 'T' + a.startTime);
          const dateB = new Date(b.startDate + 'T' + b.startTime);
          // Sort in descending order (most recent first)
          return dateB - dateA;
        })
        .map((trip) => (
          <TripDetailCard trip={trip} key={trip._id} />
        ))}
      </div>
    </div>
  </div>
</div>


      
    </div>
  );
};

export default Dashboard;
