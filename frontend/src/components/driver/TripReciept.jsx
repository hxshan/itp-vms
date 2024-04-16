import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';

import { useNavigate } from "react-router-dom";

const TripReceipt = ({ trip }) => {
  // Define state variables
  const navigate = useNavigate()
  const [fare, setFare] = useState(0);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const actualDistance = trip.finalOdometerReading - trip.intialOdometerReading;
  const [vehicleRates, Verror, Vloading, VaxiosFetch] = useAxios();
  const [updateResponse, updateError, updateLoading, updateAxiosFetch] = useAxios();
  const [incomesData,incomeserror,incomesloading, incomesaxiosFetch] = useAxios()
  // Fetch vehicle rates when the component mounts
  useEffect(() => {
    VaxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/hire/rates",
    });
  }, []);

  // Calculate fare whenever vehicle rates or actual distance change
  useEffect(() => {
    if (vehicleRates.length > 0) {
      setFare(calculateFare());
    }
  }, [vehicleRates, actualDistance]);

  // Function to calculate fare based on trip details and vehicle rates
  const calculateFare = () => {
    if (!trip.vehicleType || !actualDistance) {
      return 0;
    }

    const selectedVehicleRate = vehicleRates.find(rate => rate.vehicleCatagory.toLowerCase() === trip.vehicleType.toLowerCase());
    if (!selectedVehicleRate) {
      return 0;
    }

    let fare = 0;
    if (!trip.airCondition) { // Non-AC vehicle
      fare = actualDistance > selectedVehicleRate.baseDistence ?
        selectedVehicleRate.baseRate + (actualDistance - selectedVehicleRate.baseDistence) * selectedVehicleRate.additionalRate :
        selectedVehicleRate.baseRate;
    } else { // AC vehicle
      fare = actualDistance > selectedVehicleRate.baseDistence ?
        selectedVehicleRate.acBaseRate + (actualDistance - selectedVehicleRate.baseDistence) * selectedVehicleRate.acAdditionalRate :
        selectedVehicleRate.acBaseRate;
    }

    return fare;
  };

  // Calculate payment due
  const paymentDue = fare - trip.advancedPayment;

  // Function to handle payment received checkbox change
  const handlePaymentReceivedChange = () => {
    setPaymentReceived(!paymentReceived);
  };

  const calculateTimeDifference = (startDate, startTime, endDate, endTime) => {
    const startDateTime = new Date(startDate + 'T' + startTime);
    const endDateTime = new Date(endDate + 'T' + endTime);
    const timeDiffMs = endDateTime - startDateTime;

    // Convert milliseconds to days, hours, minutes
    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Construct the formatted time difference string
    let timeDifference = '';
    if (days > 0) {
        timeDifference += `${days} day${days > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
        timeDifference += ` ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        timeDifference += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return timeDifference.trim(); // Trim any leading/trailing spaces
};




  const updatedTrip = {
    ...trip,
    finalTotal: fare,
    actualDistance:actualDistance,
    actualTimeTaken: calculateTimeDifference(trip.startDate, trip.startTime, trip.endDate, trip.endTime),
    hireStatus: paymentReceived ? "Completed" : trip.hireStatus,
    
  };

  // Function to handle "Done" button click
  const handleDoneClick = () => {
    

    if (!paymentReceived) {
      alert("Please confirm payment receipt by checking the 'Payment Received' checkbox.");
      return;
    }
    
    updateAxiosFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/hire/driverEdit/${trip._id}/`,
      requestConfig: {
        data: updatedTrip,
      },
    });


    if (paymentReceived) {
      const incomeData = {
        date: new Date(),
        vehicle: trip.vehicle, // Assuming vehicle ID is available in trip object
        recordedBy: trip.driver, // You can change this as needed
        source: "Hire Income",
        hirePayment: {
          hirePaymentType: "Final Payment",
          hire: trip._id,
        },
        amount: paymentDue,
        status: "Received",
      };

      incomesaxiosFetch({
        axiosInstance:axios,
        method:'POST',
        url:'/income/',
        requestConfig:{
          data: incomeData
        
        }
      })
    }

    if (updateResponse  && incomesData ) {
      
      alert("successfully updated")
      navigate('/driver');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md font-sans text-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center">Trip Receipt</h2>
      {Verror && <p className="text-red-500 text-center">Failed to fetch data</p>}
      {!Verror && (
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Actual Fare:</span>
            <span className="font-medium">LKR {fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Advance Payment:</span>
            <span className="font-medium">-LKR {trip.advancedPayment}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-blue-600">Payment Due:</span>
            <span className="font-bold text-blue-600">LKR {paymentDue}</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="paymentReceived"
              className="mr-2"
              checked={paymentReceived}
              onChange={handlePaymentReceivedChange}
            />
            <label htmlFor="paymentReceived">Payment Received</label>
          </div>
          <button
            onClick={handleDoneClick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          >
            Done
          </button>
          {incomesloading && <p>Loading...</p>}
          {incomeserror && <p className="text-red-500">Failed to create income</p>}
        </div>
      )}
    </div>
  );
};

export default TripReceipt;
