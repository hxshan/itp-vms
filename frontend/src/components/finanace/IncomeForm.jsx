import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';


const IncomeForm = ({ onFormSubmit }) => {
  const [incomeData, setIncomeData] = useState({
    date: '',
    vehicle: "",
    recordedBy: '',
    source: '',
    hirePaymentType: '',
    hire: '',
    hireAmount:0,
    rentalType: 'Monthly',
    contract: '661cd658794fd56195d8d2b2',
    rentalAmount:0,
    description: '',
    paymentMethod: '',
    status: 'Pending',
    comments: ''
  });

  const { user } = useAuthContext()
  const [incomesData, incomeserror, incomesloading, incomesaxiosFetch] = useAxios();
  const [contractData, contracterror, contractloading, contractaxiosFetch] = useAxios();
  const [vehicleData, vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios();
  const [tripData, triperror, triploading, tripaxiosFetch] = useAxios();
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [tripOptions, setTripOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [inputRentalType, setInputRentalType] = useState('');


  const [userId, setUserId] = useState('');
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setUserId(decodedToken?.UserInfo?.id);
  }, [user]);


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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value
    });

    if (name === 'vehicle') {
      getTripData(value);
    }

    if (name === 'contract') {
      getContractData(value);

      const selectedContract = contractData.find(contract => contract._id === value);
    if (selectedContract) {
      setInputRentalType(selectedContract.Payment_Plan);
    }
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = {
      ...incomeData,
      rentalType: inputRentalType,
      recordedBy:  userId
    };
  
    if (incomeData.source === "Hire Income") {
      formData = {
        ...formData,
        hirePayment: {
          hire: incomeData.hire,
          hirePaymentType: incomeData.hirePaymentType,
          hireAmount: incomeData.hireAmount
        }
      };
    } else if (incomeData.source === "Rental Income") {
      formData = {
        ...formData,
        contractIncome: {
          contract: incomeData.contract,
          rentalType: incomeData.rentalType,
          rentalAmount: incomeData.rentalAmount
        }
      };
    }
  
    // Handle form submission here
    try {
      await incomesaxiosFetch({
        axiosInstance: axios,
        method: 'POST',
        url: '/income/',
        requestConfig: {
          data: {
            ...formData
          }
        }
      });
      alert("Income created successfully");
      onFormSubmit();
    } catch (error) {
      console.error("Error creating income:", error);
      alert("An error occurred. Please try again.");
    }
    console.log(formData)
  };
  

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>
      <form onSubmit={handleSubmit}>
        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={incomeData.date}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
        {/* Vehicle */}
        <div className="mb-4">
          <label htmlFor="vehicle" className="block font-semibold mb-1">Vehicle</label>
          <select
            id="vehicle"
            name="vehicle"
            value={incomeData.vehicle}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Vehicle</option>
            {vehicleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {/* Source */}
        <div className="mb-4">
          <label htmlFor="source" className="block font-semibold mb-1">Source</label>
          <select
            id="source"
            name="source"
            value={incomeData.source}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Source</option>
            <option value="Hire Income">Hire Income</option>
            <option value="Rental Income">Rental Income</option>
          </select>
        </div>
        {/* Conditional Fields */}
        {incomeData.source === "Hire Income" && (
          <>
            
            {/* Hire */}
            <div className="mb-4">
              <label htmlFor="hire" className="block font-semibold mb-1">Hire</label>
              <select
                id="hire"
                name="hire"
                value={incomeData.hire}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="">Select Hire</option>
                {tripOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Hire Payment Type */}
            <div className="mb-4">
              <label htmlFor="hirePaymentType" className="block font-semibold mb-1">Hire Payment Type</label>
              <select
            id="hirePaymentType"
             name="hirePaymentType"
            value={incomeData.hirePaymentType}
             onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Hire Payment Type</option>
           <option value="Final Payment">Final Payment</option>
            <option value="Advance Payment">Advance Payment</option>
</select>
            </div>
            <div className="mb-4">
          <label htmlFor="amount" className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            id="hireAmount"
            name="hireAmount"
            value={incomeData.hireAmount}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
          </>
        )}
        {incomeData.source === "Rental Income" && (
          <>
            
            
            {/* Contract */}

            <div className="mb-4">
              <label htmlFor="hire" className="block font-semibold mb-1">Contract</label>
              <select
                id="contract"
                name="contract"
                value={incomeData.contract}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="">Select Contract</option>
                {contractOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Rental Type */}
            <div className="mb-4">
              <label htmlFor="rentalType" className="block font-semibold mb-1">Rental Type</label>
              <input
                type="text"
                id="rentalType"
                name="rentalType"
                value={inputRentalType }
                readOnly
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
          <label htmlFor="amount" className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            id="rentalAmount"
            name="rentalAmount"
            value={incomeData.rentalAmount}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
          </>
        )}
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={incomeData.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
      
        {/* Payment Method */}
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block font-semibold mb-1">Payment Method</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={incomeData.paymentMethod}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
        {/* Status */}
<div className="mb-4">
  <label htmlFor="status" className="block font-semibold mb-1">Status</label>
  <select
    id="status"
    name="status"
    value={incomeData.status}
    onChange={handleChange}
    className="border px-3 py-2 rounded-md w-full"
  >
    <option value="Pending">Pending</option>
    <option value="Received">Received</option>
    <option value="Confirmed">Confirmed</option>
  </select>
</div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="block font-semibold mb-1">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={incomeData.comments}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full"
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
