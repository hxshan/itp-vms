import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState,useEffect  } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';

const ExpenseForm = ({ onFormSubmit }) => {
  const [expenseData, setExpenseData] = useState({
    date: "",
    time:"",
    vehicle: "",
    recordedBy: "",
    tripId: "",
    category: "",
    status: "Pending",
    notes: "",
    fuelDetails: {
      odometerReading: 0,
      fuelType: "",
      fuelQuantity: 0,
      fuelPricePerUnit: 0,
      totalPrice: 0
    },
    maintenanceDetails: {
      description: "",
      serviceProvider: "",
      invoiceNumber: "",
      maintenanceCost: 0
    },
    insuranceDetails: {
      insuaranceProvider: "",
      policyNumber: "",
      premiumAmount: 0
    },
    licensingDetails: {
      licenseType: "",
      otherDescription: "",
      licenseCost: 0
    },
    driverWages: {
      driverName: "",
      hoursWorked: 0,
      hourlyRate: 0,
      totalEarning: 0
    },
    other: {
      description: "",
      amount: 0
    }
  });

  const[Reciept,setReciept]=useState(null);


  const [vehicleData,vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios()
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [tripData,triperror, triploading, tripaxiosFetch] = useAxios()
  const [expensesData,expenseserror, expensesloading, expensesaxiosFetch] = useAxios()
  const { user } = useAuthContext()
  const [name,setName]=useState('')
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setName(decodedToken?.UserInfo?.name);
  }, [user]);
  

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






  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    let updatedExpenseData = { ...expenseData };
  
    // Check if the field is nested
    const isNestedField = name.includes('.');
  
    if (isNestedField) {
      // Split the nested field name
      const [parentField, nestedField] = name.split('.');
      
      // Update the nested field
      updatedExpenseData[parentField][nestedField] = value;
    } else {
      // Update the field directly if it's not nested
      updatedExpenseData[name] = value;
    }
  
    // Calculate total price for fuel if fuel details are being updated
    if (name === 'fuelDetails.fuelQuantity' || name === 'fuelDetails.fuelPricePerUnit') {
      const { fuelQuantity, fuelPricePerUnit } = updatedExpenseData.fuelDetails;
      updatedExpenseData.fuelDetails.totalPrice = fuelQuantity * fuelPricePerUnit;
    }

    if (name === 'driverWages.hoursWorked' || name === 'driverWages.hourlyRate') {
      const { hoursWorked, hourlyRate } = updatedExpenseData.driverWages;
      updatedExpenseData.driverWages.totalEarning = hoursWorked * hourlyRate ;
    }
  
    setExpenseData(updatedExpenseData);
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();


    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-mm-dd" format
    if (expenseData.date > currentDate) {
      alert("Expense date cannot be in the future");
      return; // Stop form submission if validation fails
    }
    console.log(expenseData)
    const formData = {
      ...expenseData,
      recordedBy: name
     
    
  };
  console.log(formData)

    // Handle form submission here
    try {
      console.log(formData)
    expensesaxiosFetch({
      axiosInstance:axios,
      method:'POST',
      url:'/expense/',
      requestConfig:{
        data:{
          ...formData
          
        }
      
      }
    })
  } catch (error) {
    console.error("Error creating expense:", error);
  }
    if(expenseserror){
      alert(usererror)
    }
    if(expensesData){
      alert("expense created succesfully")
      onFormSubmit();
     
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {/* Date */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Expense Date:</label>
        <input type="date" id="date" name="date" value={expenseData.date} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Expense Time:</label>
        <input type="time" id="time" name="time" value={expenseData.time} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* Vehicle */}
      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-gray-700 text-sm font-bold mb-2">
          Vehicle:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="vehicle"
          name="vehicle"
          value={expenseData.vehicle}
          onChange={handleExpenseChange}
        >
          <option value="">Select Vehicle</option>
          {vehicleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    
      {/* Recorded By */}
      <div className="mb-4">
        <label htmlFor="recordedBy" className="block text-gray-700 text-sm font-bold mb-2">Recorded By:</label>
        <input type="text" id="recordedBy" name="recordedBy" value={name} readOnly onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* Trip ID */}
      <div className="mb-4">
        <label htmlFor="tripId" className="block text-gray-700 text-sm font-bold mb-2">Trip ID:</label>
        <input type="text" id="tripId" name="tripId" value={expenseData.tripId} onChange={handleExpenseChange}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Expense Category:</label>
        <select id="category" name="category" value={expenseData.category} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select category</option>
          <option value="Fuel">Fuel</option>
          <option value="Maintenance and Repairs">Maintenance and Repair</option>
          <option value="Insurance">Insurance</option>
          <option value="Driver Wages">Driver Wages</option>
          <option value="Licensing">Licensing</option>
          <option value="Other">Other</option>
          {/* Other category options */}
        </select>
      </div>

      {/* Fuel Details */}
      {expenseData.category === 'Fuel' && (
        <div>
          {/* Fuel Type Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Type:</label>
            <div>
              <input type="radio" id="petrol" name="fuelDetails.fuelType" value="Petrol" checked={expenseData.fuelDetails.fuelType === 'Petrol'} onChange={handleExpenseChange} className="mr-2" />
              <label htmlFor="petrol" className="mr-4">Petrol</label>

              <input type="radio" id="diesel" name="fuelDetails.fuelType" value="Diesel" checked={expenseData.fuelDetails.fuelType === 'Diesel'} onChange={handleExpenseChange} className="mr-2" />
              <label htmlFor="diesel" className="mr-4">Diesel</label>

              <input type="radio" id="electric" name="fuelDetails.fuelType" value="Electric" checked={expenseData.fuelDetails.fuelType === 'Electric'} onChange={handleExpenseChange} />
              <label htmlFor="electric">Electric</label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="odometer" className="block text-gray-700 text-sm font-bold mb-2">Odometer/Mileage:</label>
            <input type="number" id="odometerReading" name="fuelDetails.odometerReading" value={expenseData.fuelDetails.odometerReading} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Fuel Quantity */}
          <div className="mb-4">
            <label htmlFor="fuelQuantity" className="block text-gray-700 text-sm font-bold mb-2">Fuel Quantity:</label>
            <input type="number" id="fuelQuantity" name="fuelDetails.fuelQuantity" value={expenseData.fuelDetails.fuelQuantity} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Fuel Price Per Unit */}
          <div className="mb-4">
            <label htmlFor="fuelPricePerUnit" className="block text-gray-700 text-sm font-bold mb-2">Fuel Price Per Unit:</label>
            <input type="number" id="fuelPricePerUnit" name="fuelDetails.fuelPricePerUnit" value={expenseData.fuelDetails.fuelPricePerUnit} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Total Price (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-gray-700 text-sm font-bold mb-2">Total Price:</label>
            <input type="number" id="totalPrice" name="fuelDetails.totalPrice" value={expenseData.fuelDetails.totalPrice} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}

      {/* Maintenance and Repair Details */}
      {expenseData.category === 'Maintenance and Repairs' && (
        <div>
          {/* Maintenance Description */}
          <div className="mb-4">
            <label htmlFor="maintenanceDescription" className="block text-gray-700 text-sm font-bold mb-2">Maintenance Description:</label>
            <input type="text" id="maintenanceDescription" name="maintenanceDetails.description" value={expenseData.maintenanceDetails.description} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Maintenance Service Provider */}
          <div className="mb-4">
            <label htmlFor="serviceProvider" className="block text-gray-700 text-sm font-bold mb-2">Service Provider:</label>
            <input type="text" id="serviceProvider" name="maintenanceDetails.serviceProvider" value={expenseData.maintenanceDetails.serviceProvider} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Maintenance Invoice Number */}
          <div className="mb-4">
            <label htmlFor="invoiceNumber" className="block text-gray-700 text-sm font-bold mb-2">Invoice Number:</label>
            <input type="text" id="invoiceNumber" name="maintenanceDetails.invoiceNumber" value={expenseData.maintenanceDetails.invoiceNumber} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Maintenance Cost */}
          <div className="mb-4">
            <label htmlFor="maintenanceCost" className="block text-gray-700 text-sm font-bold mb-2">Maintenance Cost:</label>
            <input type="number" id="maintenanceCost" name="maintenanceDetails.maintenanceCost" value={expenseData.maintenanceDetails.maintenanceCost} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}

      {/* Insurance Details */}
      {expenseData.category === 'Insurance' && (
        <div>
          {/* Insurance Provider */}
          <div className="mb-4">
            <label htmlFor="insuranceProvider" className="block text-gray-700 text-sm font-bold mb-2">Insurance Provider:</label>
            <input type="text" id="insuranceProvider" name="insuranceDetails.insuranceProvider" value={expenseData.insuranceDetails.insuranceProvider} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Policy Number */}
          <div className="mb-4">
            <label htmlFor="policyNumber" className="block text-gray-700 text-sm font-bold mb-2">Policy Number:</label>
            <input type="text" id="policyNumber" name="insuranceDetails.policyNumber" value={expenseData.insuranceDetails.policyNumber} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Premium Amount */}
          <div className="mb-4">
            <label htmlFor="premiumAmount" className="block text-gray-700 text-sm font-bold mb-2">Premium Amount:</label>
            <input type="number" id="premiumAmount" name="insuranceDetails.premiumAmount" value={expenseData.insuranceDetails.premiumAmount} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}

      {/* Driver Wages Details */}
      {expenseData.category === 'Driver Wages' && (
        <div>
          {/* Driver Name */}
          <div className="mb-4">
            <label htmlFor="driverName" className="block text-gray-700 text-sm font-bold mb-2">Driver Name:</label>
            <input type="text" id="driverName" name="driverWages.driverName" value={expenseData.driverWages.driverName} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Hours Worked */}
          <div className="mb-4">
            <label htmlFor="hoursWorked" className="block text-gray-700 text-sm font-bold mb-2">Hours Worked:</label>
            <input type="number" id="hoursWorked" name="driverWages.hoursWorked" value={expenseData.driverWages.hoursWorked} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Hourly Rate */}
          <div className="mb-4">
            <label htmlFor="hourlyRate" className="block text-gray-700 text-sm font-bold mb-2">Hourly Rate:</label>
            <input type="number" id="hourlyRate" name="driverWages.hourlyRate" value={expenseData.driverWages.hourlyRate} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Total Earning (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalEarning" className="block text-gray-700 text-sm font-bold mb-2">Total Earning:</label>
            <input type="number" id="totalEarning" name="driverWages.totalEarning" value={expenseData.driverWages.totalEarning} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}

      {/* Licensing Details */}
      {expenseData.category === 'Licensing' && (
  <div>
    {/* License Type */}
    <div className="mb-4">
      <label htmlFor="licenseType" className="block text-gray-700 text-sm font-bold mb-2">License Type:</label>
      <select id="licenseType" name="licensingDetails.licenseType" value={expenseData.licensingDetails.licenseType} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="Vehicle Registration">Vehicle Registration</option>
        <option value="Vehicle Emmission Testing">Vehicle Emission Testing</option>
        <option value="Taxi Permit">Taxi Permit</option>
        <option value="Other">Other</option>
      </select>
    </div>
    {/* Other Description */}
    {expenseData.licensingDetails.licenseType === 'Other' && (
      <div className="mb-4">
        <label htmlFor="otherDescription" className="block text-gray-700 text-sm font-bold mb-2">Other Description:</label>
        <input type="text" id="otherDescription" name="licensingDetails.otherDescription" value={expenseData.licensingDetails.otherDescription} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    )}
    {/* License Cost */}
    <div className="mb-4">
      <label htmlFor="licenseCost" className="block text-gray-700 text-sm font-bold mb-2">License Cost:</label>
      <input type="number" id="licenseCost" name="licensingDetails.licenseCost" value={expenseData.licensingDetails.licenseCost} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
  </div>
)}

      {/* Other Details */}
      {expenseData.category === 'Other' && (
        <div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="otherDescription" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <input type="text" id="otherDescription" name="other.description" value={expenseData.other.description} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="otherAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
            <input type="number" id="otherAmount" name="other.amount" value={expenseData.other.amount} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
      )}

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
        <select id="status" name="status" value={expenseData.status} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
        <textarea id="notes" name="notes" value={expenseData.notes} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
  );
};
export default ExpenseForm;
