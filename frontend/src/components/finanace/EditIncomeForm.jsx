import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import axios from '@/api/axios';
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';

const EditIncomeForm = ({ income, onSave, onCancel }) => {
  // State to hold edited income data
  console.log(income)
  const [editedIncome, setEditedIncome] = useState({ ...income });
  console.log(editedIncome)
  const [contractData, contracterror, contractloading, contractaxiosFetch] = useAxios();
  const [vehicleData, vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios();
  const [tripData, triperror, triploading, tripaxiosFetch] = useAxios();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [tripOptions, setTripOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [inputRentalType, setInputRentalType] = useState('');
  const[defaultHire, setDefaultHire] = useState({...income})
  const { user } = useAuthContext();

  const [name, setName] = useState('');

  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setName(decodedToken?.UserInfo?.name);
  }, [user]);

  useEffect(() => {
    if (income.date) {
      const dateObject = new Date(income.date);
      const dateString = dateObject.toISOString().split('T')[0]; // Extract YYYY-MM-DD
      setEditedIncome({ ...editedIncome, date: dateString });
    }
  }, [income]);

  


  const getVehicleData = () => {
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
    console.log('vehicle',vehicleData)
    console.log('vehicle',vehicleData.vehicles)
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
 
    if (tripData ) {
      const options = tripData.map(hire => ({
        value: hire._id,
        label: `${hire.startPoint.city} - ${hire.endPoint}  (Start Date -${new Date(hire.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${hire.startTime}) (Driver - ${hire.driver.firstName})`,
      }));
      setTripOptions(options);
    }
  }, [tripData]);

  const getContractData = (vehicleId) => {
   
    contractaxiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/income/contract/${vehicleId}`,
    });
    
  }


  useEffect(() => {
 
    if (contractData ) {
      const options = contractData.map(contract => ({
        value: contract._id,
        label: `${contract.clientID.firstName} `,
      }));
      setContractOptions(options);
      
    }
  }, [contractData]);


  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value)
    setEditedIncome(prevState => ({
      ...prevState,
      [name]: value
    }));

    console.log(editedIncome)
    // if(name === hirePaymentType)
    // {
    //   setEditedIncome({...editedIncome, hirePayment.hirePaymentType: value})
    // }
    
    console.log(editedIncome)

    if (name === 'vehicle') {
      getTripData(value);
      setDefaultHire({hirePayment: ''});
      
    }

    if (name === 'contract') {
      getContractData(value);
      const selectedContract = contractData.find(contract => contract._id === value);
      if (selectedContract) {
        setInputRentalType(selectedContract.Payment_Plan);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      ...editedIncome,
      editedBy: name
    };
    
    console.log(editedIncome)
    onSave(formData);
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
  <div className="bg-white rounded-lg p-8 max-w-md w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg xl:max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit income</h2>
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium ">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={editedIncome.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            />
          </div>
          {/* Vehicle */}
          <div className="mb-4">
            <label htmlFor="vehicle" className="block  text-sm font-bold mb-2">
              Vehicle:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
              id="vehicle"
              name="vehicle"
              value={editedIncome.vehicle ? editedIncome.vehicle._id : ''}
              onChange={handleChange}
            >
              {vehicleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Source */}
          <div className="mb-4">
            <label htmlFor="source" className="block  text-sm font-bold mb-2">
              Source:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
              id="source"
              name="source"
              value={editedIncome.source}
              onChange={handleChange}
            >
              <option value="Hire Income">Hire Income</option>
              <option value="Rental Income">Rental Income</option>
            </select>
          </div>
          {/* Conditional Fields */}
          {editedIncome.source === "Hire Income" && editedIncome.hirePayment &&(
            <>
              {/* Hire */}
              <div className="mb-4">
                <label htmlFor="hire" className="block  text-sm font-bold mb-2">
                  Hire:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                  id="hire"
                  name="hire"
                  value={editedIncome.hire}
                  onChange={handleChange}
                >
                  <option value={defaultHire.hirePayment.hire ? defaultHire.hirePayment.hire._id : ''}>
  {defaultHire.hirePayment.hire ? `${defaultHire.hirePayment.hire.startPoint.city} - ${defaultHire.hirePayment.hire.endPoint}  (Start Date -${new Date(defaultHire.hirePayment.hire.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${defaultHire.hirePayment.hire.startTime}) (Driver - ${defaultHire.hirePayment.hire.driver.firstName})` : 'Select a hire'}
</option>

                  {tripOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Hire Payment Type */}
              <div className="mb-4">
                <label htmlFor="hirePaymentType" className="block  text-sm font-bold mb-2">
                  Hire Payment Type:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                  id="hirePaymentType"
                  name="hirePaymentType"
                  value={editedIncome.hirePaymentType}
                  onChange={handleChange}
                >
                   <option value={defaultHire.hirePayment.hire ? defaultHire.hirePayment.hire._id : ''}>
  {defaultHire.hirePayment.hire ? `${defaultHire.hirePayment.hirePaymentType}` : 'Select a hire'}
</option>
                  <option value="Final Payment">Final Payment</option>
                  <option value="Advance Payment">Advance Payment</option>
                </select>
              </div>

              <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium ">Amount</label>
            <input
              id="hireAmount"
              type="number"
              name="hireAmount"
              value={editedIncome.hirePayment.hireAmount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            />
          </div>
            </>
          )}
          {editedIncome.source === "Rental Income"   &&(
            <>
              {/* Contract */}
              <div className="mb-4">
                <label htmlFor="contract" className="block  text-sm font-bold mb-2">
                  Contract:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                  id="contract"
                  name="contract"
                  value={editedIncome.contract}
                  onChange={handleChange}
                >
                  {contractOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Rental Type */}
              <div className="mb-4">
                <label htmlFor="rentalType" className="block  text-sm font-bold mb-2">
                  Rental Type:
                </label>
                <input
                  type="text"
                  id="rentalType"
                  name="rentalType"
                  value={inputRentalType}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
                />
              </div>
              <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium ">Amount</label>
            <input
              id="rentalAmount"
              type="number"
              name="rentalAmount"
              value={editedIncome.contractIncome.rentalAmount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            />
          </div>
            </>
          )}
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium ">Description</label>
            <input
              id="description"
              type="text"
              name="description"
              value={editedIncome.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            />
          </div>
         
         
          {/* Payment Method */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium ">Payment Method</label>
            <input
              id="paymentMethod"
              type="text"
              name="paymentMethod"
              value={editedIncome.paymentMethod}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            />
          </div>
          {/* Status */}
<div className="mb-4">
  <label htmlFor="status" className="block  text-sm font-bold mb-2">
    Status:
  </label>
  <select
    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
    id="status"
    name="status"
    value={editedIncome.status}
    onChange={handleChange}
  >
    <option value="Pending">Pending</option>
    <option value="Received">Received</option>
    <option value="Confirmed">Confirmed</option>
  </select>
</div>

          {/* Comments */}
          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium ">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={editedIncome.comments}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            ></textarea>
          </div>
  
          {/* Submit Button */}
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

export default EditIncomeForm;
