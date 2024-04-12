import axios from '@/api/axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

const EditForm = ({ setShowEditForm, viewHireData }) => {
  const [startDate, setStartDate] = useState(viewHireData.startDate);
  const [endDate, setEndDate] = useState(viewHireData.endDate);
  const [vehicleType, setVehicleType] = useState(viewHireData.vehicleType);
  const [vehicleSubcategory, setVehicleSubcategory] = useState(viewHireData.vehicleSubcategory);
  const [airCondition, setAirCondition] = useState(viewHireData.airCondition);
  const [passengerCount, setPassengerCount] = useState(viewHireData.passengerCount);
  const [vehicle, setVehicle] = useState(viewHireData.vehicle);
  const [driver, setDriver] = useState(viewHireData.driver);
  const [startPoint, setStartPoint] = useState(viewHireData.startPoint);
  const [endPoint, setEndPoint] = useState(viewHireData.endPoint);
  const [tripType, setTripType] = useState(viewHireData.tripType);
  const [distance, setDistance] = useState(viewHireData.distance);
  const [cusName, setCusName] = useState(viewHireData.cusName);
  const [cusEmail, setCusEmail] = useState(viewHireData.cusEmail);
  const [cusMobile, setCusMobile] = useState(viewHireData.cusMobile);
  const [cusNic, setCusNic] = useState(viewHireData.cusNic);
  const [hireStatus, setHireStatus] = useState(viewHireData.hireStatus);

  const handleEdit = () => {
    const editedData = {
      startDate,
      endDate,
      vehicleType,
      vehicleSubcategory,
      airCondition,
      passengerCount,
      vehicle,
      driver,
      startPoint,
      endPoint,
      tripType,
      distance,
      cusName,
      cusEmail,
      cusMobile,
      cusNic,
      hireStatus,
    };
    const confirm = window.confirm("Are you sure")
    if(confirm){
      setShowEditForm(false);
      console.log('Edited Data:', editedData);

      

      axios.post(`http://localhost:3000/api/hire/edit/${viewHireData._id}`, editedData)
    }

    if (hireStatus === "Active") {
      // Create income object
      console.log('cameeee Data:');
      const incomeData = {
        date: new Date(),
        vehicle: viewHireData.vehicle, // Assuming viewHireData contains vehicle details
        recordedBy: 'YourUserId', // Change to the actual recorded user ID
        source: 'Hire',
        hirePayment: {
          customerName: viewHireData.cusName,
          hirePaymentType: 'Advance', // Assuming it's an advance payment
          hire: viewHireData._id,
        },
        description: 'Income generated from active hire',
        amount: 10000,
        paymentMethod: 'Cash', // Example payment method
        status: 'Pending', // Income status
        comments: 'Income generated automatically from active hire',
      };

      // Send the income data to create income object
       axios.post('http://localhost:3000/api/income', incomeData);
    }

  
  };

  return (
    <div className="absolute bg-white border-2 border-[#0E6300] w-[75%] mb-6 top-11 right-11 xl:top-5">
      <form className="mx-10 my-5">
        <h1 className="text-2xl underline font-bold text-center mb-5">Edit Details</h1>

        {/* Status */}
        <div className="mb-6">
            <label htmlFor="hireStatus" className="block text-lg font-semibold mb-1">Status</label>
            <select
              id="hireStatus"
              value={hireStatus}
              onChange={(e) => setHireStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              {/* Add more options as needed */}
            </select>
          </div>

        {/* Date Section */}
        <div className="flex flex-col xl:flex-row justify-between mb-6">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="startDate" className="block text-lg font-semibold mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="block text-lg font-semibold mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Vehicle Section */}
        <div className="mb-6 flex flex-col xl:flex-row justify-between">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="vehicleType" className="block text-lg font-semibold mb-1">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleSubcategory" className="block text-lg font-semibold mb-1">Vehicle Subcategory</label>
            <input
              type="text"
              id="vehicleSubcategory"
              value={vehicleSubcategory}
              onChange={(e) => setVehicleSubcategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Air Condition */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="airCondition"
            checked={airCondition}
            onChange={(e) => setAirCondition(e.target.checked)}
            className="mr-3"
          />
          <label htmlFor="airCondition" className="text-lg font-semibold">Air Condition</label>
        </div>

        {/* Passenger Count */}
        <div className="mb-6">
          <label htmlFor="passengerCount" className="block text-lg font-semibold mb-1">Passenger Count</label>
          <input
            type="number"
            id="passengerCount"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Vehicle and Driver */}
        <div className="mb-6 flex flex-col xl:flex-row justify-between">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="vehicle" className="block text-lg font-semibold mb-1">Vehicle</label>
            <input
              type="text"
              id="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driver" className="block text-lg font-semibold mb-1">Driver</label>
            <input
              type="text"
              id="driver"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Trip Details */}
        <div className="mb-6 flex flex-col xl:flex-row justify-between">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="startPoint" className="block text-lg font-semibold mb-1">Start Point</label>
            <input
              type="text"
              id="startPoint"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endPoint" className="block text-lg font-semibold mb-1">End Point</label>
            <input
              type="text"
              id="endPoint"
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Trip Type */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="tripType"
              checked={tripType}
              onChange={(e) => setTripType(e.target.checked)}
              className="mr-3"
            />
            <label htmlFor="tripType" className="text-lg font-semibold">Round Trip</label>
          </div>


        {/* Distance */}
        <div className="mb-6">
          <label htmlFor="distance" className="block text-lg font-semibold mb-1">Distance</label>
          <input
            type="text"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Customer Details */}
        <div className="mb-6 flex flex-col xl:flex-row justify-between">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="cusName" className="block text-lg font-semibold mb-1">Customer Name</label>
            <input
              type="text"
              id="cusName"
              value={cusName}
              onChange={(e) => setCusName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cusEmail" className="block text-lg font-semibold mb-1">Customer Email</label>
            <input
              type="email"
              id="cusEmail"
              value={cusEmail}
              onChange={(e) => setCusEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col xl:flex-row justify-between">
          <div className="mb-3 xl:mr-6">
            <label htmlFor="cusMobile" className="block text-lg font-semibold mb-1">Customer Mobile</label>
            <input
              type="text"
              id="cusMobile"
              value={cusMobile}
              onChange={(e) => setCusMobile(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cusNic" className="block text-lg font-semibold mb-1">Customer NIC</label>
            <input
              type="text"
              id="cusNic"
              value={cusNic}
              onChange={(e) => setCusNic(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>


        {/* Buttons */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleEdit}
            className="px-7 py-2 bg-[#0E6300] text-white rounded-md mr-4"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowEditForm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

EditForm.propTypes = {
  setShowEditForm: PropTypes.func.isRequired,
  viewHireData: PropTypes.object.isRequired,
};

export default EditForm;
