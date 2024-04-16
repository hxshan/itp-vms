import React from 'react';
import { ReactToPrint } from 'react-to-print';
import { FaTimes, FaPrint } from 'react-icons/fa';

const TripSummary = ({ trip, onClose }) => {
  const componentRef = React.createRef();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md border border-gray-300">

        <div className="flex justify-between items-center mb-4">
          <ReactToPrint
            trigger={() => (
              <button className="text-gray-500 hover:text-gray-800 mr-auto p-1">
                <FaPrint className="text-xl" />
              </button>
            )}
            content={() => componentRef.current}
          />
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 ml-auto p-1">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div ref={componentRef} className="text-center print:border print:border-gray-800 print:border-4 print:p-8">

        <div className="mb-4 print:px-8 print:py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Summary</h2>
          
          
            <hr className="border-t border-gray-200 mb-4" />
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <p className="text-lg print:text-xl ">Trip ID:</p>
                <p className="text-gray-800 print:text-lg">{trip._id}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg print:text-xl ">Driver:</p>
                <p className="text-gray-800 print:text-lg">{trip.driver.firstName}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg print:text-xl ">Vehicle:</p>
                <p className="text-gray-800 print:text-lg">{trip.vehicle.vehicleRegister}-{trip.vehicle.category}</p>
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-4" />
            <div className="mb-6 flex justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold mr-2">
                    S
                  </div >
                  <div className="mr-4"> 
                    <p className="text-lg text-black print:text-xl">{new Date(trip.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })},  {trip.startTime}</p>
                    <p className="text-lg text-gray-800 print:text-xl">{trip.startPoint.no}, {trip.startPoint.street}, {trip.startPoint.city}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold mr-2">
                    E
                  </div>
                  <div>
                    <p className="text-lg text-black print:text-xl">{new Date(trip.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })},  {trip.endTime}</p>
                    <p className="text-lg text-gray-800 print:text-xl">{trip.endPoint}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-4" />
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <p className="text-lg text-black print:text-xl">Estimated Fare:</p>
                <p className="text-lg text-black print:text-xl">Rs. {trip.estimatedTotal}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-600 print:text-xl">Estimated Distance:</p>
                <p className="text-gray-600 print:text-lg">{trip.estimatedDistance} km</p>
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-4" />
            <div className="flex justify-between mb-2">
              <p className="text-lg text-black print:text-xl">Actual Fare:</p>
              <p className="text-lg text-black print:text-xl">Rs. {trip.finalTotal}</p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-600print:text-xl">Actual Distance:</p>
                <p className="text-gray-600 print:text-lg">{trip.actualDistance} km</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-600 print:text-xl">Actual Duration:</p>
                <p className="text-gray-600 print:text-lg">{trip.actualTimeTaken}</p>
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-4" />
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <p className="text-lg text-black print:text-xl">Advance Paid:</p>
                <p className="text-lg text-black print:text-xl">- Rs. {trip.advancedPayment}</p>
              </div>
              <hr className="border-t border-gray-200 mb-4" />
              <div className="flex justify-between mb-2">
                <p className="text-lg font-semibold mr-2 print:text-xl">Final Payment:</p>
                <p className="text-lg font-semibold print:text-xl">Rs. {trip.finalTotal - trip.advancedPayment}</p>
              </div>
              <hr className="border-t border-gray-200 mb-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
