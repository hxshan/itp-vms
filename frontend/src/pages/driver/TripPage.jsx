import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';

import { useLocation } from 'react-router-dom';
import { EndTripForm, EmergencyReportForm } from '@/components/driver';
import {  FaTimes } from 'react-icons/fa';

const TripPage = () => {
  const location = useLocation();
  const tripID = location.state.tripID;
  const [trip,tripError, tripLoading, tripAxiosFetch] = useAxios();
 

  
  
console.log(tripID)
  
const getData = () => {
  tripAxiosFetch({
    axiosInstance: axios,
    method: "GET",
    url: `/hire/driver/trip/${tripID}`, // Use userID variable dynamically
  });
};



useEffect(() => {
  getData();
}, []);







  console.log(trip)

  const [showEndTripForm, setShowEndTripForm] = useState(false);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);

  const handleEndTripClick = () => {
    setShowEndTripForm(true);
  };

  const handleEmergencyReportClick = () => {
    setShowEmergencyForm(true);
  };

  return (
    <div className="overflow-hidden flex flex-col h-full">
      {/* End Trip and Emergency Report buttons */}
      <div className="p-4 flex justify-between">
        <button
          onClick={handleEmergencyReportClick}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Emergency
        </button>
        <button
          onClick={handleEndTripClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          End Trip
        </button>
      </div>
      {/* Placeholder for map */}
      <div className="flex-grow">
        <img
          src="https://1.bp.blogspot.com/-dl4ZkQihmPU/XzzqDfql56I/AAAAAAAAAh0/C3YfhyVmOUciRUYWaz9cQ5srxjNpKGyBgCLcBGAsYHQ/s687/Maharagama%2B-%2BKandy%2B-%2B69-122%2Bbus%2Broute.jpg"
          alt="Map"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {showEndTripForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <EndTripForm trip={trip } />
            <button onClick={() => setShowEndTripForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      {showEmergencyForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <EmergencyReportForm trip={trip } />
            <button onClick={() =>  setShowEmergencyForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPage;
