import React from 'react';

const TripSummary = ({ trip, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Trip Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            Close
          </button>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Trip ID:</p>
            <p className="text-gray-800">{trip._id}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Driver:</p>
            <p className="text-gray-800">{trip.driver.firstName}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Vehicle:</p>
            <p className="text-gray-800">{trip.vehicle.vehicleRegister}-{trip.vehicle.category}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="bg-blue-500 rounded-full h-6 w-6 mr-2 flex items-center justify-center text-white font-semibold">
              S
            </div>
            <div>
              <p className="text-lg font-semibold">Start Date & Time:</p>
              <p className="text-gray-800">{new Date(trip.startDate).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-1">Start Point:</p>
          <p className="text-gray-800">{trip.startPoint.no}, {trip.startPoint.street}, {trip.startPoint.city}</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="bg-orange-500 rounded-full h-6 w-6 mr-2 flex items-center justify-center text-white font-semibold">
              E
            </div>
            <div>
              <p className="text-lg font-semibold">End Date & Time:</p>
              <p className="text-gray-800">{new Date(trip.endDate).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-1">End Point:</p>
          <p className="text-gray-800">{trip.endPoint}</p>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="mb-4">
          <p className="text-lg font-semibold">Estimated Distance:</p>
          <p className="text-gray-800">{trip.estimatedDistance} km</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Estimated Fare:</p>
          <p className="text-gray-800">Rs. {trip.estimatedTotal}</p>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="mb-4">
          <p className="text-lg font-semibold">Actual Distance:</p>
          <p className="text-gray-800">{trip.actualDistance} km</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Actual Duration:</p>
          <p className="text-gray-800">{trip.actualTimeTaken}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Actual Fare:</p>
          <p className="text-gray-800">Rs. {trip.finalTotal}</p>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <div className="mb-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold mb-1">Payment</p>
            <div className="flex items-center ml-2">
              <div className="h-6 w-6 bg-red-500 rounded-full mr-2"></div>
              <p className="text-gray-800">Advance Paid</p>
            </div>
          </div>
          <p className="text-gray-800">Rs. {trip.advancedPayment}</p>
          <div className="flex items-center mt-2">
            <p className="text-lg font-semibold mr-2">Payment Amount</p>
            <p className="text-gray-800">Rs. {trip.finalTotal - trip.advancedPayment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;