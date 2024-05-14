// EditExpenseForm.js
import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';



const EditExpenseForm = ({ expense, onSave, onCancel }) => {
  // State to hold edited expense data
  const [editedExpense, setEditedExpense] = useState({ ...expense });
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleData,vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios()
  const [tripData,triperror, triploading, tripaxiosFetch] = useAxios()
  const [tripOptions, setTripOptions] = useState([]);
  const[driverData,driverError,driverLoading,driverAxiosFetech]= useAxios()
  const[driverOptions, setDriverOptions] = useState([]);
  const[userData,userError, userLoading, userAxiosFetech] = useAxios()
  const [users,setUsers]=useState([])
  const { user } = useAuthContext()

  console.log(user)

  const [name,setName]=useState('')
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setName(decodedToken?.UserInfo?.name);
  }, [user]);
  

  useEffect(() => {
    if (expense.date) {
      const dateObject = new Date(expense.date);
      const dateString = dateObject.toISOString().split('T')[0]; // Extract YYYY-MM-DD
      setEditedExpense({ ...editedExpense, date: dateString });
    }
  }, [expense]);


  const getVehicleData =()=>{
    vehicleAxiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/vehicle/`,
   });
 }

 useEffect(() => {
  getVehicleData();
}, []); 

  useEffect(() => {
    if (vehicleData && vehicleData.vehicles) {
      const options = vehicleData.vehicles.map(vehicle => ({
        value: vehicle._id,
        label: `${vehicle.vehicleRegister} - ${vehicle.vehicleType}`,
      }));
      setVehicleOptions(options);
    }
  }, [vehicleData]);


  const getTripData = (vehicleId) => {
   
    tripaxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/hire/vehicle/${vehicleId}`,
    });
   
  }
  useEffect(() => {
    getTripData(editedExpense.vehicle._id); // Fetch trip data related to the selected vehicle
  }, []);
  
  
  useEffect(() => {
  
    if (tripData ) {
      const options = tripData.map(hire => ({
        value: hire._id,
        label: `${hire.startPoint.city} - ${hire.endPoint}  (Start Date -${new Date(hire.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${hire.startTime}) (Driver - ${hire.driver.firstName})`,
      }));
      setTripOptions(options);
    }
  }, [tripData]);

  const getDriverData = ()=>{
    driverAxiosFetech({
      axiosInstance:axios,
      method:'GET',
      url:'/user/drivers',
     
    })
}

useEffect(() => {
  getDriverData();
}, []); 

useEffect(() => {
  if (driverData ) {
    const options = driverData.map(user => ({
      value: user._id,
      label: `${user.firstName} - ${user.nicNumber}`,
    }));
    setDriverOptions(options);
  }
}, [driverData]);


const getData = ()=>{
  userAxiosFetech({
    axiosInstance:axios,
    method:'GET',
    url:'/user/',
   
  })
}

useEffect(() => {
  getData();
}, []); 

useEffect(() => {
  if (userData) {
    const options = userData.map(users => ({
      value: users._id,
      label: `${users.firstName} ${users.lastName} -${users.role.name}`,
    }));
    setUsers(options);
  }
}, [userData]);



  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedEditedexpense ={...editedExpense}

    updatedEditedexpense[name] = value;

    if (name === 'vehicle') {
      getTripData(value);
    }
    if (name === 'fuelQuantity' || name === 'fuelPricePerUnit') {
      const { fuelQuantity, fuelPricePerUnit } = updatedEditedexpense;
      updatedEditedexpense.totalFuelPrice = fuelQuantity * fuelPricePerUnit;
    }
    if (name === 'category'){
      updatedEditedexpense.odometerReading= 0,
      updatedEditedexpense.fuelType= "",
      updatedEditedexpense.fuelQuantity= 0,
      updatedEditedexpense.fuelPricePerUnit= 0,
      updatedEditedexpense.totalFuelPrice= 0,
      updatedEditedexpense.maintenanceDescription= "",
      updatedEditedexpense.serviceProvider= "",
      updatedEditedexpense.invoiceNumber= "",
      updatedEditedexpense.maintenanceCost= 0,
      updatedEditedexpense.insuaranceProvider= "",
      updatedEditedexpense.policyNumber= "",
      updatedEditedexpense.premiumAmount= 0,
      updatedEditedexpense.licenseType= "",
      updatedEditedexpense.otherLicensingDescription= "",
      updatedEditedexpense.licenseCost= 0,
      updatedEditedexpense.driverName= null,
      updatedEditedexpense.wagepercentage= 25,
      updatedEditedexpense.tripAmount= 0,
      updatedEditedexpense.totalEarning= 0,
      updatedEditedexpense.otherDescription= "",
      updatedEditedexpense.otherAmount= 0
    }
    if (name === 'tripId') {
      const {tripId, wagepercentage} = updatedEditedexpense;
      const selectedTrip = tripData.find(trip => trip._id === value);
      if (selectedTrip) {
        console.log(selectedTrip)
        updatedEditedexpense.driverName = selectedTrip.driver._id
        updatedEditedexpense.tripAmount = selectedTrip.finalTotal;
        updatedEditedexpense.totalEarning = (selectedTrip.finalTotal/100.0)*wagepercentage;
  
      }
    }
    if (name === 'wagepercentage' || name === 'tripAmount') {
      const { wagepercentage, tripAmount } = updatedEditedexpense;
      updatedEditedexpense.totalEarning = (wagepercentage/100.0) *  tripAmount;
    }
    if (name === 'isReimbursement') {
      if (value === 'false') {
        updatedEditedexpense.reimbursementAmount = 0;
        updatedEditedexpense.reimbursmentPerson = '';
        updatedEditedexpense.reimbursementStatus = '';
      }
      updatedEditedexpense[name] = value === 'true'; // Convert 'true' string to true, 'false' string to false
    } else {
      updatedEditedexpense[name] = value;
    } 

    setEditedExpense(updatedEditedexpense);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...editedExpense, editedBy: name });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
  <div className="bg-white rounded-lg p-8 max-w-md w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg xl:max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={editedExpense.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="time"
              type="time"
              name="time"
              value={editedExpense.time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vehicle"
              name="vehicle"
              value={editedExpense.vehicle._id} 
              onChange={handleChange}
            >
              
              <option value={editedExpense.vehicle._id}>
                {`${editedExpense.vehicle.vehicleRegister} - ${editedExpense.vehicle.vehicleType}`}
              </option>
             
              {vehicleOptions
                .filter(option => option.value !== editedExpense.vehicle._id)
                .map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="editedBy" className="block text-sm font-medium text-gray-700">Edited By</label>
            <input
              id="editedBy"
              type="text"
              name="editedBy"
              value={name}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
        <label htmlFor="tripId" className="block text-gray-700 text-sm font-bold mb-2">Trip:</label>
        <select  id="tripId" name="tripId" value={editedExpense.tripId._id} onChange={handleChange}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
      
        <option value={editedExpense.tripId._id}>
                {`${editedExpense.tripId.startPoint.city} - ${editedExpense.tripId.endPoint}  (Start Date -${new Date(editedExpense.tripId.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${editedExpense.tripId.startTime}) (Driver - ${editedExpense.tripId.driver.firstName})`}
              </option>
                {tripOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Expense Category:</label>
        <select id="category" name="category" value={editedExpense.category} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select category</option>
          <option value="Fuel">Fuel</option>
          <option value="Maintenance and Repairs">Maintenance and Repairs</option>
          <option value="Insurance">Insurance</option>
          <option value="Driver Wages">Driver Wages</option>
          <option value="Licensing and Permits">Licensing and Permits</option>
          <option value="Tolls and Parking">Tolls and Parking</option>
          <option value="Driver Hire Expense">Driver Hire Expense</option>
          <option value="Other">Other</option>
          {/* Other category options */}
        </select>
      </div>

      {/* Fuel Details */}
      {editedExpense.category === 'Fuel' && (
        <div>
          {/* Fuel Type Radio Buttons */}
          <div className="grid grid-cols-2 gap-x-4"></div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Type:</label>
            <div>
              <input type="radio" id="petrol" name="fuelType" value="Petrol" checked={editedExpense.fuelType === 'Petrol'} onChange={handleChange} className="mr-2" />
              <label htmlFor="petrol" className="mr-4">Petrol</label>

              <input type="radio" id="diesel" name="fuelType" value="Diesel" checked={editedExpense.fuelType === 'Diesel'} onChange={handleChange} className="mr-2" />
              <label htmlFor="diesel" className="mr-4">Diesel</label>

              <input type="radio" id="electric" name="fuelType" value="Electric" checked={editedExpense.fuelType === 'Electric'} onChange={handleChange} />
              <label htmlFor="electric">Electric</label>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4">
          <div className="mb-4">
            <label htmlFor="odometer" className="block text-gray-700 text-sm font-bold mb-2">Odometer/Mileage:</label>
            <input type="number" id="odometerReading" name="odometerReading" value={editedExpense.odometerReading} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Fuel Quantity */}
          
          <div className="mb-4">
            <label htmlFor="fuelQuantity" className="block text-gray-700 text-sm font-bold mb-2">Fuel Quantity:</label>
            <input type="number" id="fuelQuantity" name="fuelQuantity" value={editedExpense.fuelQuantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Fuel Price Per Unit */}
          <div className="mb-4">
            <label htmlFor="fuelPricePerUnit" className="block text-gray-700 text-sm font-bold mb-2">Fuel Price Per Unit:</label>
            <input type="number" id="fuelPricePerUnit" name="fuelPricePerUnit" value={editedExpense.fuelPricePerUnit} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Total Price (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalFuelPrice" className="block text-gray-700 text-sm font-bold mb-2">Total Price:</label>
            <input type="number" id="totalFuelPrice" name="totalFuelPrice" value={editedExpense.totalFuelPrice} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        </div>
      )}

      {/* Maintenance and Repair Details */}
      {editedExpense.category === 'Maintenance and Repairs' && (
        <div>
          {/* Maintenance Description */}
          <div className="mb-4">
            <label htmlFor="maintenanceDescription" className="block text-gray-700 text-sm font-bold mb-2">Maintenance Description:</label>
            <input type="text" id="maintenanceDescription" name="maintenanceDescription" value={editedExpense.maintenanceDescription} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Maintenance Service Provider */}
          <div className="mb-4">
            <label htmlFor="serviceProvider" className="block text-gray-700 text-sm font-bold mb-2">Service Provider:</label>
            <input type="text" id="serviceProvider" name="serviceProvider" value={editedExpense.serviceProvider} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="grid grid-cols-2 gap-x-4">
          {/* Maintenance Invoice Number */}
          <div className="mb-4">
            <label htmlFor="invoiceNumber" className="block text-gray-700 text-sm font-bold mb-2">Invoice Number:</label>
            <input type="text" id="invoiceNumber" name="invoiceNumber" value={editedExpense.invoiceNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Maintenance Cost */}
          <div className="mb-4">
            <label htmlFor="maintenanceCost" className="block text-gray-700 text-sm font-bold mb-2">Maintenance Cost:</label>
            <input type="number" id="maintenanceCost" name="maintenanceCost" value={editedExpense.maintenanceCost} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        </div>
      )}

      {/* Insurance Details */}
      {editedExpense.category === 'Insurance' && (
        <div>
          {/* Insurance Provider */}
          <div className="grid grid-cols-3 gap-x-4">
          <div className="mb-4">
            <label htmlFor="insuranceProvider" className="block text-gray-700 text-sm font-bold mb-2">Insurance Provider:</label>
            <input type="text" id="insuranceProvider" name="insuranceProvider" value={editedExpense.insuranceProvider} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Policy Number */}
          <div className="mb-4">
            <label htmlFor="policyNumber" className="block text-gray-700 text-sm font-bold mb-2">Policy Number:</label>
            <input type="text" id="policyNumber" name="policyNumber" value={editedExpense.policyNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Premium Amount */}
          <div className="mb-4">
            <label htmlFor="premiumAmount" className="block text-gray-700 text-sm font-bold mb-2">Premium Amount:</label>
            <input type="number" id="premiumAmount" name="premiumAmount" value={editedExpense.premiumAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        </div>
      )}

      {/* Driver Wages Details */}
      {editedExpense.category === 'Driver Wages' && (
        <div>
          {/* Driver Name */}
          <div className="mb-4">
            <label htmlFor="driverName" className="block text-gray-700 text-sm font-bold mb-2">Driver Name:</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="driverName"
          name="driverName"
          value={editedExpense.driverName}
          onChange={handleChange}
        >
          <option value="">Select Driver</option>
          {driverOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
          {/* Hours Worked */}
          
          <div className="grid grid-cols-3 gap-x-4">
          <div className="mb-4">
            <label htmlFor="wagepercentage" className="block text-gray-700 text-sm font-bold mb-2">Wage Percentage:</label>
            <input type="number" id="wagepercentage" name="wagepercentage" value={editedExpense.wagepercentage} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Hourly Rate */}
          <div className="mb-4">
            <label htmlFor="tripAmount" className="block text-gray-700 text-sm font-bold mb-2">Trip Amount:</label>
            <input type="number" id="tripAmount" name="tripAmount" value={editedExpense.tripAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Total Earning (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalEarning" className="block text-gray-700 text-sm font-bold mb-2">Total Earning:</label>
            <input type="number" id="totalEarning" name="totalEarning" value={editedExpense.totalEarning} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        </div>
      )}

      {/* Licensing Details */}
      {editedExpense.category === 'Licensing and Permits' && (
  <div>
    {/* License Type */}
    <div className="grid grid-cols-2 gap-x-4">
    <div className="mb-4">
      <label htmlFor="licenseType" className="block text-gray-700 text-sm font-bold mb-2">License Type:</label>
      <select id="licenseType" name="licenseType" value={editedExpense.licenseType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="Vehicle Registration">Vehicle Registration</option>
        <option value="Vehicle Emmission Testing">Vehicle Emission Testing</option>
        <option value="Taxi Permit">Taxi Permit</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    {/* License Cost */}
    <div className="mb-4">
      <label htmlFor="licenseCost" className="block text-gray-700 text-sm font-bold mb-2">License Cost:</label>
      <input type="number" id="licenseCost" name="licenseCost" value={editedExpense.licenseCost} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    {/* Other Description */}
    {editedExpense.licenseType === 'Other' && (
      <div className="mb-4">
        <label htmlFor="otherLicensingDescription" className="block text-gray-700 text-sm font-bold mb-2">Other Description:</label>
        <input type="text" id="otherLicensingDescription" name="otherLicensingDescription" value={editedExpense.otherLicensingDescription} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    )}
  </div>
  </div>
)}

      {/* Other Details */}
      {(editedExpense.category === 'Other' ||editedExpense.category === 'Tolls and Parking' ||editedExpense.category === 'Driver Hire Expense'  )&& (
        <div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="otherDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <input type="text" id="otherDescription" name="otherDescription" value={editedExpense.otherDescription} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="otherAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
            <input type="number" id="otherAmount" name="otherAmount" value={editedExpense.otherAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}
      <div className="mb-4">
    <label htmlFor="isReimbursement" className="block text-gray-700 text-sm font-bold mb-2">Is Reimbursement:</label>
    <select
      id="isReimbursement"
      name="isReimbursement"
      value={editedExpense.isReimbursement}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value={false}>No</option>
      <option value={true}>Yes</option>
    </select>
  </div>
  {editedExpense.isReimbursement && (
    <>
      <div className="mb-4">
        <label htmlFor="reimbursementAmount" className="block text-gray-700 text-sm font-bold mb-2">Reimbursement Amount:</label>
        <input
          type="number"
          id="reimbursementAmount"
          name="reimbursementAmount"
          value={editedExpense.reimbursementAmount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reimbursmentPerson" className="block text-gray-700 text-sm font-bold mb-2">
          Reimbursement Person:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="reimbursmentPerson"
          name="reimbursmentPerson"
          value={editedExpense.reimbursmentPerson}
          onChange={handleChange}
        >
          <option value="">Select Person</option>
          {users.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="reimbursementStatus" className="block text-gray-700 text-sm font-bold mb-2">Reimbursement Status:</label>
        <select
          id="reimbursementStatus"
          name="reimbursementStatus"
          value={editedExpense.reimbursementStatus}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
    </>

  )}

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Expense Status:</label>
        <select id="status" name="status" value={editedExpense.status} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Paid">Paid</option>
          {/* Other status options */}
        </select>
      </div>
      {/* Notes */}
      <div className="mb-4">
        <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">Notes:</label>
        <textarea id="notes" name="notes" value={editedExpense.notes} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>


          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
