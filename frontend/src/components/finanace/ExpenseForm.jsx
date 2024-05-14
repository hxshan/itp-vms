import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useState,useEffect  } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode';

const ExpenseForm = ({ onFormSubmit }) => {
  const [expenseData, setExpenseData] = useState({
      date: "",
      time:"",
      vehicle: null,
      recordedBy: "",
      tripId: null,
      category: "",
      status: "Pending",
      notes: "",
      odometerReading: 0,
      fuelType: "",
      fuelQuantity: 0,
      fuelPricePerUnit: 0,
      totalFuelPrice: 0,
      maintenanceDescription: "",
      serviceProvider: "",
      invoiceNumber: "",
      maintenanceCost: 0,
      insuaranceProvider: "",
      policyNumber: "",
      premiumAmount: 0,
      licenseType: "",
      otherLicensingDescription: "",
      licenseCost: 0,
      driverName: null,
      wagepercentage: 25,
      tripAmount: 0,
      totalEarning: 0,
      otherDescription: "",
      otherAmount: 0,
      isReimbursement: false,
      reimbursementAmount:0,
      reimbursmentPerson:null,
      reimbursementStatus:"Pending"


  });

  const[Reciept,setReciept]=useState(null);


  const [vehicleData,vehicleerror, vehicleloading, vehicleAxiosFetch] = useAxios()
  const[userData,userError, userLoading, userAxiosFetech] = useAxios()
  const [users,setUsers]=useState([])
  const[driverData,driverError,driverLoading,driverAxiosFetech]= useAxios()
  const[driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [tripData,triperror, triploading, tripaxiosFetch] = useAxios()
  const [tripOptions, setTripOptions] = useState([]);
  const [expensesData,expenseserror, expensesloading, expensesaxiosFetch] = useAxios()
  const { user } = useAuthContext()
  const [name,setName]=useState('')
 
  useEffect(() => {
    const decodedToken = jwtDecode(user?.accessToken);
    setName(decodedToken?.UserInfo?.name);
  }, [user]);

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

  if (tripData ) {
    const options = tripData.map(hire => ({
      value: hire._id,
      label: `${hire.startPoint.city} - ${hire.endPoint}  (Start Date -${new Date(hire.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}) (Start time - ${hire.startTime}) (Driver - ${hire.driver.firstName})`,
    }));
    setTripOptions(options);
  }
}, [tripData]);


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




const handleExpenseChange = (e) => {
  const { name, value } = e.target;
  let updatedExpenseData = { ...expenseData };

  if (name === 'vehicle') {
    getTripData(value);
  }

 
      updatedExpenseData[name] = value;

      if (name === 'isReimbursement') {
        updatedExpenseData[name] = value === 'true'; // Convert 'true' string to true, 'false' string to false
      } else {
        updatedExpenseData[name] = value;
      }
      
    
  
  // Calculate total price for fuel if fuel details are being updated
  if (name === 'fuelQuantity' || name === 'fuelPricePerUnit') {
    const { fuelQuantity, fuelPricePerUnit } = updatedExpenseData;
    updatedExpenseData.totalFuelPrice = fuelQuantity * fuelPricePerUnit;
  }



  if (name === 'tripId') {
    const {tripId, wagepercentage} = updatedExpenseData;
    const selectedTrip = tripData.find(trip => trip._id === value);
    if (selectedTrip) {
      console.log(selectedTrip)
      updatedExpenseData.driverName = selectedTrip.driver._id
      updatedExpenseData.tripAmount = selectedTrip.finalTotal;
      updatedExpenseData.totalEarning = (selectedTrip.finalTotal/100.0)*wagepercentage;

    }
  }

  if (name === 'wagepercentage' || name === 'tripAmount') {
    const { wagepercentage, tripAmount } = updatedExpenseData;
    updatedExpenseData.totalEarning = (wagepercentage/100.0) *  tripAmount;
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

    if (expenseData.isReimbursement) {
      if (expenseData.status === 'Paid' && expenseData.reimbursementStatus !== 'Paid' && expenseData.reimbursementStatus !== 'Rejected') {
        alert("Reimbursement status must be 'Paid' or 'Rejected' when expense status is 'Paid'");
        return; // Stop form submission if validation fails
      } else if (expenseData.status === 'Approved' && expenseData.reimbursementStatus === 'Pending') {
        alert("Reimbursement status cannot be 'Pending' when expense status is 'Approved'");
        return; // Stop form submission if validation fails
      }
    }
    console.log(expenseData)
    const formData = {
      ...expenseData,
      recordedBy: name
     
    
  };
  console.log(formData)

  try {
    await expensesaxiosFetch({
      axiosInstance: axios,
      method: 'POST',
      url: '/expense/',
      requestConfig: {
        data: {
          ...formData
        }
      }
    });
    alert("Expense created successfully");
    onFormSubmit();
  } catch (error) {
    console.error("Error creating expense:", error);
    alert("Error creating expense: " + error.message);
  }
  
  };
  return (
    <div className="shadow-xl bg-white rounded flex flex-col items-center mt-8">
    <form onSubmit={handleSubmit} className="mt-6 px-8 pt-6 pb-8 mb-4 w-full">
      {/* Date */}
      <h2 className="font-bold text-2xl w-fit mt-5 mb-8">
            Add Expense
          </h2>
          <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">
        <label htmlFor="date" className="block  text-sm font-bold mb-2">Expense Date:</label>
        <input type="date" id="date" name="date" value={expenseData.date} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block  text-sm font-bold mb-2">Expense Time:</label>
        <input type="time" id="time" name="time" value={expenseData.time} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
      </div>
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
    
      
      {/* Trip ID */}
      <div className="mb-4">
        <label htmlFor="tripId" className="block  text-sm font-bold mb-2">Trip:</label>
        <select  id="tripId" name="tripId" value={expenseData.tripId} onChange={handleExpenseChange}  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" >
      
                <option value="">Select Trip</option>
                {tripOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block  text-sm font-bold mb-2">Expense Category:</label>
        <select id="category" name="category" value={expenseData.category} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black">
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
      {expenseData.category === 'Fuel' && (
        <div>
          {/* Fuel Type Radio Buttons */}
          <div className="grid grid-cols-2 gap-x-4"></div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Fuel Type:</label>
            <div>
              <input type="radio" id="petrol" name="fuelType" value="Petrol" checked={expenseData.fuelType === 'Petrol'} onChange={handleExpenseChange} className="mr-2" />
              <label htmlFor="petrol" className="mr-4">Petrol</label>

              <input type="radio" id="diesel" name="fuelType" value="Diesel" checked={expenseData.fuelType === 'Diesel'} onChange={handleExpenseChange} className="mr-2" />
              <label htmlFor="diesel" className="mr-4">Diesel</label>

              <input type="radio" id="electric" name="fuelType" value="Electric" checked={expenseData.fuelType === 'Electric'} onChange={handleExpenseChange} />
              <label htmlFor="electric">Electric</label>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4">
          <div className="mb-4">
            <label htmlFor="odometer" className="block  text-sm font-bold mb-2">Odometer/Mileage:</label>
            <input type="number" id="odometerReading" name="odometerReading" value={expenseData.odometerReading} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Fuel Quantity */}
          
          <div className="mb-4">
            <label htmlFor="fuelQuantity" className="block  text-sm font-bold mb-2">Fuel Quantity:</label>
            <input type="number" id="fuelQuantity" name="fuelQuantity" value={expenseData.fuelQuantity} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Fuel Price Per Unit */}
          <div className="mb-4">
            <label htmlFor="fuelPricePerUnit" className="block  text-sm font-bold mb-2">Fuel Price Per Unit:</label>
            <input type="number" id="fuelPricePerUnit" name="fuelPricePerUnit" value={expenseData.fuelPricePerUnit} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Total Price (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalPrice" className="block  text-sm font-bold mb-2">Total Price:</label>
            <input type="number" id="totalPrice" name="totalFuelPrice" value={expenseData.totalFuelPrice} readOnly className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
        </div>
        </div>
      )}

      {/* Maintenance and Repair Details */}
      {expenseData.category === 'Maintenance and Repairs' && (
        <div>
          {/* Maintenance Description */}
          <div className="mb-4">
            <label htmlFor="maintenanceDescription" className="block  text-sm font-bold mb-2">Maintenance Description:</label>
            <input type="text" id="maintenanceDescription" name="maintenanceDescription" value={expenseData.maintenanceDescription} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Maintenance Service Provider */}
          <div className="mb-4">
            <label htmlFor="serviceProvider" className="block  text-sm font-bold mb-2">Service Provider:</label>
            <input type="text" id="serviceProvider" name="serviceProvider" value={expenseData.serviceProvider} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          <div className="grid grid-cols-2 gap-x-4">
          {/* Maintenance Invoice Number */}
          <div className="mb-4">
            <label htmlFor="invoiceNumber" className="block  text-sm font-bold mb-2">Invoice Number:</label>
            <input type="text" id="invoiceNumber" name="invoiceNumber" value={expenseData.invoiceNumber} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Maintenance Cost */}
          <div className="mb-4">
            <label htmlFor="maintenanceCost" className="block  text-sm font-bold mb-2">Maintenance Cost:</label>
            <input type="number" id="maintenanceCost" name="maintenanceCost" value={expenseData.maintenanceCost} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
        </div>
        </div>
      )}

      {/* Insurance Details */}
      {expenseData.category === 'Insurance' && (
        <div>
          {/* Insurance Provider */}
          <div className="grid grid-cols-3 gap-x-4">
          <div className="mb-4">
            <label htmlFor="insuranceProvider" className="block  text-sm font-bold mb-2">Insurance Provider:</label>
            <input type="text" id="insuranceProvider" name="insuranceProvider" value={expenseData.insuranceProvider} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Policy Number */}
          <div className="mb-4">
            <label htmlFor="policyNumber" className="block  text-sm font-bold mb-2">Policy Number:</label>
            <input type="text" id="policyNumber" name="policyNumber" value={expenseData.policyNumber} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Premium Amount */}
          <div className="mb-4">
            <label htmlFor="premiumAmount" className="block  text-sm font-bold mb-2">Premium Amount:</label>
            <input type="number" id="premiumAmount" name="premiumAmount" value={expenseData.premiumAmount} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
        </div>
        </div>
      )}

      {/* Driver Wages Details */}
      {expenseData.category === 'Driver Wages' && (
        <div>
          {/* Driver Name */}
          <div className="mb-4">
            <label htmlFor="driverName" className="block  text-sm font-bold mb-2">Driver Name:</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
          id="driverName"
          name="driverName"
          value={expenseData.driverName}
          onChange={handleExpenseChange}
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
            <label htmlFor="wagepercentage" className="block  text-sm font-bold mb-2">Wage Percentage:</label>
            <input type="number" id="wagepercentage" name="wagepercentage" value={expenseData.wagepercentage} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Hourly Rate */}
          <div className="mb-4">
            <label htmlFor="tripAmount" className="block  text-sm font-bold mb-2">Trip Amount:</label>
            <input type="number" id="tripAmount" name="tripAmount" value={expenseData.tripAmount} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Total Earning (calculated dynamically) */}
          <div className="mb-4">
            <label htmlFor="totalEarning" className="block  text-sm font-bold mb-2">Total Earning:</label>
            <input type="number" id="totalEarning" name="totalEarning" value={expenseData.totalEarning} readOnly className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
        </div>
        </div>
      )}

      {/* Licensing Details */}
      {expenseData.category === 'Licensing and Permits' && (
  <div>
    {/* License Type */}
    <div className="grid grid-cols-2 gap-x-4">
    <div className="mb-4">
      <label htmlFor="licenseType" className="block  text-sm font-bold mb-2">License Type:</label>
      <select id="licenseType" name="licenseType" value={expenseData.licenseType} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black">
        <option value="Vehicle Registration">Vehicle Registration</option>
        <option value="Vehicle Emmission Testing">Vehicle Emission Testing</option>
        <option value="Taxi Permit">Taxi Permit</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    {/* License Cost */}
    <div className="mb-4">
      <label htmlFor="licenseCost" className="block  text-sm font-bold mb-2">License Cost:</label>
      <input type="number" id="licenseCost" name="licenseCost" value={expenseData.licenseCost} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
    </div>
    {/* Other Description */}
    {expenseData.licenseType === 'Other' && (
      <div className="mb-4">
        <label htmlFor="otherLicensingDescription" className="block  text-sm font-bold mb-2">Other Description:</label>
        <input type="text" id="otherLicensingDescription" name="otherLicensingDescription" value={expenseData.otherLicensingDescription} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
      </div>
    )}
  </div>
  </div>
)}

      {/* Other Details */}
      {(expenseData.category === 'Other' ||expenseData.category === 'Tolls and Parking' ||expenseData.category === 'Driver Hire Expense'  )&& (
        <div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="otherDescription" className="block  text-sm font-bold mb-2">Description:</label>
            <input type="text" id="otherDescription" name="otherDescription" value={expenseData.otherDescription} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="otherAmount" className="block  text-sm font-bold mb-2">Amount:</label>
            <input type="number" id="otherAmount" name="otherAmount" value={expenseData.otherAmount} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
          </div>
        </div>
      )}
      <div className="mb-4">
    <label htmlFor="isReimbursement" className="block  text-sm font-bold mb-2">Is Reimbursement:</label>
    <select
      id="isReimbursement"
      name="isReimbursement"
      value={expenseData.isReimbursement}
      onChange={handleExpenseChange}
      className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
    >
      <option value={false}>No</option>
      <option value={true}>Yes</option>
    </select>
  </div>
  {expenseData.isReimbursement && (
    <>
      <div className="mb-4">
        <label htmlFor="reimbursementAmount" className="block  text-sm font-bold mb-2">Reimbursement Amount:</label>
        <input
          type="number"
          id="reimbursementAmount"
          name="reimbursementAmount"
          value={expenseData.reimbursementAmount}
          onChange={handleExpenseChange}
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reimbursmentPerson" className="block  text-sm font-bold mb-2">
          Reimbursement Person:
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
          id="reimbursmentPerson"
          name="reimbursmentPerson"
          value={expenseData.reimbursmentPerson}
          onChange={handleExpenseChange}
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
        <label htmlFor="reimbursementStatus" className="block  text-sm font-bold mb-2">Reimbursement Status:</label>
        <select
          id="reimbursementStatus"
          name="reimbursementStatus"
          value={expenseData.reimbursementStatus}
          onChange={handleExpenseChange}
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
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
        <label htmlFor="status" className="block  text-sm font-bold mb-2">Expense Status:</label>
        <select id="status" name="status" value={expenseData.status} onChange={handleExpenseChange} required className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Paid">Paid</option>
          {/* Other status options */}
        </select>
      </div>
      {/* Notes */}
      <div className="mb-4">
        <label htmlFor="notes" className="block  text-sm font-bold mb-2">Notes:</label>
        <textarea id="notes" name="notes" value={expenseData.notes} onChange={handleExpenseChange} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" />
      </div>
      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
    </div>
  );
};
export default ExpenseForm;
