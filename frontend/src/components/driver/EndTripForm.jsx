import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import TripReceipt from './TripReciept';

const EndTripForm = ({ trip }) => {

  console.log(trip)

  
  
  const [mileage, setMileage] = useState('');
  const [odometerImage, setOdometerImage] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dropLocation, setdropLocation] = useState(`${trip.endPoint}`);
  const [tripEnded, setTripEnded] = useState(false);
  const [formError, setFormError] = useState();

  const [vehicleData, Verror, Vloading, VaxiosFetch] = useAxios();
  const [updateResponse, updateError, updateLoading, updateAxiosFetch] = useAxios();

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };


  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEndDate(currentDate);
      setEndTime(currentTime);
    };

    updateDateTime(); // Initial call to set date and time

    // Update date every day at midnight
    const dateIntervalId = setInterval(() => {
      updateDateTime();
    }, 1000 * 60 * 60 * 24); // 24 hours

    // Update time every second
    const timeIntervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEndTime(newTime);
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      clearInterval(dateIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []);


  useEffect(() => {
    if (updateResponse && updateResponse.data) {
      // Handle response data here
      console.log(updateResponse.data);
    }
  }, [updateResponse]);

  useEffect(() => {
    if (updateError) {
      console.error("Error updating trip:", updateError);
    }
  }, [updateError]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setOdometerImage(file);
  };


  console.log(trip._id)
  const updatedTrip = {
    ...trip,
    endDate: endDate,
    endTime: endTime,
    finalOdometerReading: mileage,
    endPoint:dropLocation,
    hireStatus:"Ended"
    
  };

  const updateMileage ={

    ...trip.vehicle,
    lastMileage : mileage
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic, including sending the image file to the server

    if (!mileage || !endDate || !endTime || !dropLocation) {
      setFormError('All fields are required');
      return;
    }
  
    // Check if mileage is greater than the last recorded mileage
    console.log(parseInt(mileage))
    console.log(trip.vehicle.lastMileage)
    if (parseInt(mileage) <= trip.vehicle.lastMileage) {
      console.log(trip.vehicle.lastMileage)
      setFormError('Mileage should be greater than the last recorded mileage');
      return;
    }else{
      setFormError('');
    await updateAxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/hire/driverEdit/${trip._id}/`,
      requestConfig: {
        data: updatedTrip,
      },
    });

    await VaxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/vehicle/mileage/${trip.vehicle._id}/`,
      requestConfig: {
        data: updateMileage,
      },
    });

    if(vehicleData){
      console.log('Mileage updated')
    }

    setTripEnded(true);
    }
    
  };


  

  
  return (

    <div>
       {tripEnded ? (
        <TripReceipt trip={updatedTrip} />
      ) : (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">

        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
          Pickup Location:
        </label>
        <input
          type="text"
          id="pickupLocation"
          value={`${trip.startPoint.no},${trip.startPoint.street}, ${trip.startPoint.city}`}
          readOnly
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination:
        </label>
        <input
          type="text"
          id="destination"
          value={dropLocation}
          onChange={(e) => setdropLocation(e.target.value)}
          
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
          Vehicle:
        </label>
        <input
          type="text"
          id="vehicle"
          value={`${trip.vehicle.vehicleRegister}`}
          readOnly
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
     
      <div className="mb-4 flex gap-4">
  <div>
    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
      End Date:
    </label>
    <input
      type="date"
      id="endDate"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      readOnly
      required
      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  <div>
    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
      End Time:
    </label>
    <input
      type="time"
      id="endTime"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      readOnly
      required
      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
</div>

      <div className="mb-4">
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
          Ending Mileage:
        </label>
        <input
          type="number"
          id="mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="odometerImage" className="block text-sm font-medium text-gray-700">
          Odometer Photo:
        </label>
        <input
          type="file"
          id="odometerImage"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        
      </div>
      {formError && <p className="text-red-500">{formError}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        End Trip
      </button>
    </form>
     )}
    </div>
  );
};

export default EndTripForm;