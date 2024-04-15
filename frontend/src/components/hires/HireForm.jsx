import { useEffect, useState } from 'react';
import {validateFormFirstPage, validateFormSecondPage, validateFormtthirddPage} from './Validation';
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios'
import {useNavigate} from "react-router-dom";

import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';


const Form = () => { 
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [airCondition, setAirCondition] = useState(false);
  const [vehicle, setVehicle] = useState('')
  const [driver, setDriver] = useState('')
  const [startPointNo, setStartPointNo] = useState('')
  const [startPointStreet, setStartPointSteet] = useState('')
  const [startPointCity, setStartPointCity] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [startTime, setStartTime] = useState('')
  const [tripType, setTripType] = useState(false)
  const [estimatedDistance, setEstimatedDistance] = useState('')
  const [cusName, setCusName] = useState('')
  const [cusEmail, setCusEmail] = useState('')
  const [cusMobile, setCusMobile] = useState('')
  const [cusNic, setCusNic] = useState('')
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const [advancedPayment, setAdvancedPayment] = useState(0)

  const [response, error, loading, axiosFetch] = useAxios()

  const formData = {
    startDate,
    endDate,
    vehicleType,
    airCondition,
    passengerCount,
    vehicle,
    driver,
    startPointNo,
    startPointStreet,
    startPointCity,
    endPoint,
    startTime,
    tripType,
    estimatedDistance,
    cusName, cusEmail, cusMobile, cusNic,
    estimatedTotal,
    finalTotal: null,
    advancedPayment,
    hireStatus: "Pending"
  }
  

  //Handle Submit
  const submit =async (e) => {

    e.preventDefault(tripType) 
  
    const confirm = window.confirm("Are you sure")
    if(confirm){
      await axiosFetch({
        axiosInstance:axios,
        method:'POST',
        url:'/hire/add',
        requestConfig:{
          data:{
            ...formData
          }
        }
      })

      if(error){
        alert(error)
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Hire added successfully!',
          timer: 1500,
          showConfirmButton: false
      }).then(() => {
          navigate('/hires', { replace: true, state: { forceRefresh: true } });
      });
      }

      //axios.post('http://localhost:3000/api/hire/add', formData)
    }
    
  }

  //Fetch Vehicle Data
  const [vehiclesData, vehiclesError, vehiclesLoading, axiosFetchVehicles] = useAxios()

  const [vehcleTypes, setVehcleTypes] = useState(["Car", "Van" , "Bus", "Plane"])
  

  const fetchVehicleDetails = async () => {
    axiosFetchVehicles({
          axiosInstance: axios,
          method: "GET",
          url: "/vehicle/",
      });
  };

  if(vehiclesError){
    return(
      <p>Can not Vehicle Fetch Data</p>
    )
  }

  //Filter Vehicles
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  
  const filterVehicles = () => {
    console.log("Filter Vehicles")

    console.log("Selected Vehicle : " + vehicleType)
    const selectedVehicles = vehiclesData.vehicles.filter((vehicle) => vehicle.category.toLowerCase() === vehicleType.toLowerCase());
    console.log(selectedVehicles)

    setFilteredVehicles(selectedVehicles); 
    if(selectedVehicles.length === 0 ){
      console.log("No vehicles Available")
      alert("No vehicles Available")
    }

    if(vehiclesError){
    return(
      <p>Can not Fetch Data</p>
    )
  }


  }

  // Fetch user data
  /*
  const [RoleData, RoleError, RoleLoading, axiosFetchRoles] = useAxios()

  const fetchRoleDetails = async () => {
    console.log('Fetching Role data')
    axiosFetchRoles({
          axiosInstance: axios,
          method: "GET",
          url: "/role/",
      });
  };

  if(RoleError){
    return(
      <p>Can not Fetch Role Data</p>
    )
  }
  const driverRoleId = RoleData ?.find(role => role.name.toLowerCase() === 'driver')?._id
  console.log(driverRoleId)
*/
  //Fetch Drivers
  const [DriversData, DriversError, DriversLoading, axiosFetchDrivers] = useAxios()
  //const [availableDrivers, setavailableDrivers] = useState(["Chamara" , "Jonny", "Danny", "Chanchala"])

  const filterDrivers = () => {
    console.log('Filter Drivers')
    axiosFetchDrivers({
      axiosInstance: axios,
      method: "GET",
      url: "/user/drivers",
  });
  }

  if(DriversError) {
    <p>Can not Fetch Driver Data</p>
  }

  console.log(DriversData)

  // Handle Cancel button
  const cancel = () => {
    navigate('/hires')
  }
  
  //Handle Steps
  const handleNextStep = (e) => {
    e.preventDefault()

    let errors = {};
    if(step == 1) {
      
      errors = validateFormFirstPage(formData)
      if(Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    }

    if(step == 2) {
      errors = validateFormSecondPage(formData)
      if(Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    }

    if(step == 3) {
      errors = validateFormtthirddPage(formData)
      if(Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    }

    if(step == 4) {
      setStep(step + 1);
  }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };




/*
const fetchVehicleData = async () => {
  try {
    const response = await axios.get()
    setVehcleTypes(response.data);
    setVehcleSubTypes(response.data);
  }
  catch(error) {
    console.error("Error Fetching Data from database: " , error)
  }
}
*/
/*
{vehcleTypes.map(type) => (
  <option key={type.id} value={type.name}>{type.name}</option>
)}
*/

//Fetch Vehicle Rates
const [vehicleRates, Verror, Vloading, VaxiosFetch] = useAxios();


  const fetchVehicleRates = async () => {
    VaxiosFetch({
          axiosInstance: axios,
          method: "GET",
          url: "/hire/rates",
      });
  };
    
  if(Verror){
    return(
      <p>Can not Fetch Data</p>
    )
  }
    

/*
    useEffect(() => {
        const fetchVehicleRates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/hire/rates');
                setVehicleRates(response.data);
            } catch (error) {
                console.error('Error fetching vehicle rates:', error);
            }
        };

        fetchVehicleRates();
    }, []);*/

    //Calculate total Fare
    const calculateEstimatedFare = async () => {
      try {
          if (!vehicleType || !estimatedDistance) {
              console.log("Vehicle type or estimatedDistance not selected");
              return { estimatedFare: 0, advancedPay: 0 };
          }
          
  
          console.log("Calculating estimated fare...");
  
          // Fetch vehicle rates from the backend
          //const response = await axios.get('http://localhost:3000/api/hire/rates');
          //const vehicleRates = response.data;

          
  
          // Find the rate for the selected vehicle type
          console.log("Selected Vehicle : " + vehicleType)
          const selectedVehicleRate = vehicleRates.find(rate => rate.vehicleCatagory.toLowerCase() === vehicleType.toLowerCase());
          console.log(selectedVehicleRate)
  
          if (!selectedVehicleRate) {
              console.log("Rate not found for the selected vehicle type");
              return { estimatedFare: 0, advancedPay: 0 };
          }
  
          const { baseDistence, baseRate, additionalRate,acBaseRate, acAdditionalRate } = selectedVehicleRate;
          let estimatedFare = airCondition ? acBaseRate : baseRate
          let advancedPay = 0;
  
          let estimatedDistence = estimatedDistance;
  
          if (tripType) {
              estimatedDistence *= 2;
          }
  
          const baseDistance = baseDistence;
          const additionalDistance = Math.max(estimatedDistence - baseDistance, 0);
  
          estimatedFare += additionalDistance * (airCondition ? acAdditionalRate : additionalRate);
          advancedPay = estimatedFare * 0.1;
  
          estimatedFare = parseFloat(estimatedFare.toFixed(2));
          advancedPay = Math.round(advancedPay);

          console.log("Catogory : " + selectedVehicleRate.vehicleCatagory)
          console.log("Estimated Fare : " + estimatedFare)
          console.log("Advanced Payment: " + advancedPay)
          console.log("Base estimatedDistance : " +  baseDistance)
  
          return { estimatedFare, advancedPay, additionalRate, estimatedDistence };
      } catch (error) {
          console.error('Error calculating estimated fare:', error);
          return { estimatedFare: 0, advancedPay: 0 };
      }
  };
  

  useEffect(() => {
    if (step === 5) {
      const calculateFare = async () => {
        const { estimatedFare, advancedPay } = await calculateEstimatedFare();
        setEstimatedTotal(estimatedFare);
        setAdvancedPayment(advancedPay);
      };
      calculateFare();
    }
  }, [step, vehicleType, estimatedDistance, tripType, airCondition]);

  useEffect(() => {
      fetchVehicleRates();
      //fetchRoleDetails()
      filterDrivers()

      console.log("Vehicle Rates")
      console.log(vehicleRates)
    },[])

    useEffect(() => {
      fetchVehicleDetails()
      console.log('vehiclesData')
      console.log(vehiclesData)
    }, [])

    useEffect(() => {
      if(step === 2) {
        filterVehicles()
      }
    }, [step, vehicleType])

    if (loading || vehiclesLoading|| DriversLoading || Vloading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="sweet-loading">
            <ClipLoader color="#10971D" loading={true}  size={50} />
          </div>
        </div>
      );
    }
  

    return (
      <div >
          <form className="w-full h-full bg-white px-3 py-5 xl:px-10">
            {/* Form */}
            {step === 1 && (
              <div className="mt-10 w-full border-2 border-black pt-5 px-4 xl:px-12 xl:py-10">
  
                {/* Date Section */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'> 
  
                  <div className="mb-5">
                    <label htmlFor="startDate" className="block font-medium text-black text-base mb-2">
                      Start Date
                    </label>
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="endDate" className="block font-medium text-black text-base mb-2">
                      End Date
                    </label>
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                </div>
  
                {/* Vehicle Section */}

                  <div className="mb-5">
                    <label htmlFor="vehicleType" className="block font-medium text-black text-base mb-2">
                      Vehicle Type
                    </label>
                    <select id="vehicleType" name="vehicleType" 
                      value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                          <option value="">Select......</option>
                          {vehcleTypes.map((type) => (
                            <option key={type.id} value={type}>{type}</option>
                          ))}
                      </select>
                  </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mt-5'> 

                  <div className="mb-5">
                    <label htmlFor="airCondition" className="block font-medium text-black text-base mb-2">
                      Air Condition
                    </label>
                    <input type="checkbox" id="airCondition" name="airCondition" checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} className='' required />
                  </div>

                  {/* Passenger Count */}
                  <div className='mb-5'>
                    <label htmlFor="passengerCount" className="block font-medium text-black text-base mb-2">
                      No of Passengers
                    </label>
                    <input type="number" id="passengerCount" name="passengerCount" value={passengerCount} onChange={(e) => setPassengerCount(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
  
                </div>
  
                
              </div>
            )}
  
            {/*Section 2 */}
            {step === 2 && (
              
              <div className="mt-5 px-2">
  
                {/* Vehicle and driver section */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8'>
  
                  <div className="mb-5">
                    <label htmlFor="vehicle" className="block font-medium text-black text-base mb-2">
                      Select Vehicle
                    </label>
                    <select id="vehicle" name="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className='border-2 rounded border-black px-5 w-full' required>
                      <option value="">Select Vehicle</option>
                      {filteredVehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle._id}>{vehicle.vehicleRegister}</option>
                      ))}
                    </select>
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="driver" className="block font-medium text-black text-base mb-2">
                      Select Driver
                    </label>
                    <select id="driver" name="driver" value={driver} onChange={(e) => setDriver(e.target.value)} className='border-2 rounded border-black px-5 w-full' required>
                      <option value="">Select Driver</option>
                      {DriversData.map((driver) => (
                        <option key={driver.id} value={driver._id}>{driver.firstName} {driver.lastName}</option>
                      ))}
                    </select>
                  </div>
  
                </div>
  
                {/* Trip details */}
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
  
                  <div className="mb-5">
                    <label htmlFor="startPointNo" className="block font-medium text-black text-base mb-2">
                      Start Point No
                    </label>
                    <input type="text" id="startPointNo" name="startPointNo" value={startPointNo} onChange={(e) => setStartPointNo(e.target.value)} placeholder='House Number' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startPointStreet" className="block font-medium text-black text-base mb-2">
                      Start Point Street
                    </label>
                    <input type="text" id="startPointStreet" name="startPointStreet" value={startPointStreet} onChange={(e) => setStartPointSteet(e.target.value)} placeholder='Street' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startPointCity" className="block font-medium text-black text-base mb-2">
                      Start Point City
                    </label>
                    <input type="text" id="startPointCity" name="startPointCity" value={startPointCity} onChange={(e) => setStartPointCity(e.target.value)} placeholder='City' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8'>
                  <div className="mb-5">
                    <label htmlFor="endPoint" className="block font-medium text-black text-base mb-2">
                      End Point
                    </label>
                    <input type="text" id="endPoint" name="endPoint" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} placeholder='Destination' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="startTime" className="block font-medium text-black text-base mb-2">
                      Start Time
                    </label>
                    <input type="time" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className='border-2 rounded border-black px-5 w-full' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="tripType" className="block font-medium text-black text-base mb-2">
                      Round Trip
                    </label>
                    <input type="checkbox" id="tripType" name="tripType" checked={tripType} onChange={(e) => setTripType(e.target.checked)} className='' required />
                  </div>
  
                  <div className="mb-5">
                    <label htmlFor="estimatedDistance" className="block font-medium text-black text-base mb-2">
                      Estimated Distance
                    </label>
                    <input type="number" id="estimatedDistance" name="estimatedDistance" value={estimatedDistance} onChange={(e) => setEstimatedDistance(e.target.value)} placeholder='Estimate Distance' className='border-2 rounded border-black px-5 w-full' required />
                  </div>
                </div>
  
              </div>
            )}
  
            {step === 3 && (
                <div className='mt-7'> 
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
  
                        <div className="mb-5">
                            <label htmlFor="cusName" className="block font-medium text-black text-base mb-2">
                                Name
                            </label>
                            <input type="text" id="cusName" name="cusName" value={cusName} onChange={(e) => setCusName(e.target.value)} placeholder='Customer Name' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusEmail" className="block font-medium text-black text-base mb-2">
                                Email
                            </label>
                            <input type="email" id="cusEmail" name="cusEmail" value={cusEmail} onChange={(e) => setCusEmail(e.target.value)} placeholder='Customer Email' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusMobile" className="block font-medium text-black text-base mb-2">
                                Mobile
                            </label>
                            <input type="tel" id="cusMobile" name="cusMobile" value={cusMobile} onChange={(e) => setCusMobile(e.target.value)} placeholder='Customer Mobile No' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                        <div className="mb-5">
                            <label htmlFor="cusNic" className="block font-medium text-black text-base mb-2">
                                Nic
                            </label>
                            <input type="text" id="cusNic" name="cusNic" value={cusNic} onChange={(e) => setCusNic(e.target.value)} placeholder='Customer NIC' className='border-2 rounded border-black px-5 w-full' required />
                        </div>
  
                    </div>
                </div>
            )}
  
            {/* Confirmation */}
          {step === 4 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Confirmation</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {startDate}</p>
                  <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {endDate}</p>
                  <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp; {vehicleType}</p>
                  <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {airCondition ? 'With Air Condition' : 'Without Air Condition'}</p>
                  <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {passengerCount}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle Model : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {driver}</p>

                </div>

                <div className='mr-[20px]'>

                  <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp;{startPointNo} {startPointStreet} {startPointCity}</p>
                  <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {endPoint}</p>
                  <p className=' text-lg font-semibold leading-8'>Start Time : &nbsp;&nbsp; {startTime}</p>
                  <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {tripType ? 'Yes' : 'No'}</p>
                  <p className=' text-lg font-semibold leading-8'>Estimated Distance : &nbsp;&nbsp; {estimatedDistance}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {cusName}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {cusEmail}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {cusMobile}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {cusNic}</p>

                </div>
                
                </div>
            </div>
          )}

          {/* Receipt */}
          {step === 5 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Receipt</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Estimated distance : &nbsp;&nbsp;{estimatedDistance} Km</p>          
                  <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp;Rs. {estimatedTotal}</p>
                </div>

                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Vehicle Fare(perKm) : &nbsp;&nbsp;Rs. </p>
                  <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp;Rs. {advancedPayment}</p>

                </div>
                
                </div>
            </div>
          )}
  
            <div className="flex mt-8 px-4 justify-between">
              {step === 1 && (
                <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4" onClick={cancel}>
                  Cancel
                </button>
              )}
              {step !== 1 && (
                <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4" onClick={handlePrevStep}>
                  Previous
                </button>
              )}
              {step !== 5 ? (
                <button type='button' className="px-4 py-2 text-white bg-actionBlue rounded-md hover:bg-gray-800 focus:outline-none" onClick={handleNextStep}>
                  Next
                </button>
              ) : (
                <button type='submit' className="px-4 py-2 text-white bg-actionGreen rounded-md hover:bg-green-600 focus:outline-none" onClick={submit}>
                  Submit
                </button>
              )}
            </div>
          </form>
      </div>
  );
  
  
};

export default Form;
