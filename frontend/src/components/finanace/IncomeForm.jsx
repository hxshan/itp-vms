import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState,useEffect  } from "react";

const IncomeForm = () => {
  const [incomeData, setIncomeData] = useState({
    date: '',
    vehicle:"",
    recordedBy: '',
    source: '',
    hirePaymentType: '',
    hire: '',
    rentalType: '',
    client: '',
    contract: '',
    description: '',
    amount: 0,
    paymentMethod: '',
    status: 'Pending',
    comments: ''
  });

  const [incomesData,incomeserror,incomesloading, incomesaxiosFetch] = useAxios()
  const [vehicleData,vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios()
  const [vehicleOptions, setVehicleOptions] = useState([]);


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = {
      ...incomeData
     
    
  };
  console.log(formData)

    // Handle form submission here
    try {
      console.log(formData)
      incomesaxiosFetch({
      axiosInstance:axios,
      method:'POST',
      url:'/income/',
      requestConfig:{
        data:{
          ...formData
          
        }
      
      }
    })
  } catch (error) {
    console.error("Error creating expense:", error);
  }
    if(incomeserror){
      alert(usererror)
    }
    if(incomesData){
      alert("expense created succesfully")
     
    }
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
        <div className="mb-4">
        <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="vehicle"
          name="vehicle"
          value={incomeData.vehicle}
          onChange={handleChange}
        >
          <option value="">Select Vehicle</option>
          {vehicleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
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
            <option value="Hire Payment">Hire Payment</option>
            <option value="Rental Payment">Rental Payment</option>
          </select>
        </div>
        {/* Hire Payment Fields */}
        {incomeData.source === "Hire Payment" && (
          <>
            {/* Hire Payment Type */}
            <div className="mb-4">
              <label htmlFor="hirePaymentType" className="block font-semibold mb-1">Hire Payment Type</label>
              <input
                type="text"
                id="hirePaymentType"
                name="hirePaymentType"
                value={incomeData.hirePaymentType}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* Hire */}
            <div className="mb-4">
              <label htmlFor="hire" className="block font-semibold mb-1">Hire</label>
              <input
                type="text"
                id="hire"
                name="hire"
                value={incomeData.hire}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* Other Hire Payment Fields */}
            {/* Add other hire payment fields here */}
          </>
        )}
        {/* Rental Payment Fields */}
        {incomeData.source === "Rental Payment" && (
          <>
            {/* Rental Type */}
            <div className="mb-4">
              <label htmlFor="rentalType" className="block font-semibold mb-1">Rental Type</label>
              <input
                type="text"
                id="rentalType"
                name="rentalType"
                value={incomeData.rentalType}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* Client */}
            <div className="mb-4">
              <label htmlFor="client" className="block font-semibold mb-1">Client</label>
              <input
                type="text"
                id="client"
                name="client"
                value={incomeData.client}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* Contract */}
            <div className="mb-4">
              <label htmlFor="contract" className="block font-semibold mb-1">Contract</label>
              <input
                type="text"
                id="contract"
                name="contract"
                value={incomeData.contract}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* Other Rental Payment Fields */}
            {/* Add other rental payment fields here */}
          </>
        )}
        {/* Other input fields */}
        {/* Add input fields for vehicle, recordedBy, description, amount, paymentMethod, status, comments */}
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
