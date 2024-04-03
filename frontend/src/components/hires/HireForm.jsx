import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {validateFormFirstPage, validateFormSecondPage} from './Validation';
import axios from '@/api/axios';

const Form = ({setShowForm }) => { 
  const [step, setStep] = useState(1);

  Form.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
  };


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleSubcategory, setVehicleSubcategory] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [airCondition, setAirCondition] = useState(false);
  const [vehicle, setVehicle] = useState('')
  const [driver, setDriver] = useState('')
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [tripType, setTripType] = useState(false)
  const [distence, setSetDistence] = useState()
  const [cusName, setCusName] = useState('')
  const [cusEmail, setCusEmail] = useState('')
  const [cusMobile, setCusMobile] = useState('')
  const [cusNic, setCusNic] = useState('')
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const [advancedPayment, setAdvancedPayment] = useState(0)



  const formData = {
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
    distence,
    cusName, cusEmail, cusMobile, cusNic,
    estimatedTotal,
    finalTotal: null,
    advancedPayment,
    hireStatus: "Pending"
  }

  //Handle Submit
  const submit = () => {
  
    const confirm = window.confirm("Are you sure")
    if(confirm){
      setShowForm(false)

      axios.post('http://localhost:3000/api/hire/add', formData)
    }
    
  }

  const cancel = () => {
    setShowForm(false)
  }
  
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
        setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };


//Retreve data
useEffect(() => {

  fetchVehicleData();
}, [])

const [vehcleTypes, setVehcleTypes] = useState(["Car", "Van", "Lorry" , "Bus"])
const [vehcleSubTypes, setVehcleSubTypes] = useState(["Maruti" , "C200"])

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

/*
{vehcleTypes.map(type) => (
  <option key={type.id} value={type.name}>{type.name}</option>
)}
*/

//Calculate total
const vehicleRates = {
  Car: { baseRate: 8000, additionalRate: 100 },
  Van: { baseRate: 10000, additionalRate: 110 },
  Bus: { baseRate: 15000, additionalRate: 150 },
  Lorry: { baseRate: 15000, additionalRate: 180 }
};

const calculateEstimatedFare= () => {
  let estimatedFare = 0
  let advancedPay = 0

  if (!vehicleType || !distence) {
    console.log("Vehicle type or distance not selected");
    return { estimatedFare: 0, advancedPay: 0 };
  }

  console.log("Calculating estimated fare...");
  const { baseRate, additionalRate } = vehicleRates[vehicleType];
  let estimatedDistence = distence

  if(tripType === true) {
    estimatedDistence = estimatedDistence * 2
    
  }

  const baseDistance = 100;
  const additionalDistance = Math.max(estimatedDistence - baseDistance, 0);

  estimatedFare = baseRate + additionalDistance * additionalRate;
  advancedPay = estimatedFare * 0.1;

  return { estimatedFare, advancedPay };

}

useEffect(() => {
  if (step === 4) {
    const { estimatedFare, advancedPay } = calculateEstimatedFare();
    setEstimatedTotal(estimatedFare);
    setAdvancedPayment(advancedPay);
  }
}, [step, vehicleType, distence, tripType]);


  return (
    <div className="w-full h-full flex bg-gray-200 px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">

      <div className="w-full h-full bg-white px-3 py-5 xl:px-10">
        {/*Titile*/}
        <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
          <h1 className="text-2xl font-semibold xl:text-4xl">Add Hire</h1>
        </div>

        <form>
          {/* Form */}
          {step === 1 && (
            <div className="mt-10  w-full border-2 border-black pt-5 px-4 xl:px-12 xl:py-10">

              {/* Date Section */}
              <div className='flex flex-col justify-between align-baseline mt-3 xl:flex-row'> 

                <div className="mb-10 flex justify-between align-baseline xl:flex-1 xl:mr-14">
                      <label htmlFor="startDate" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Start Date
                      </label>

                      <input type="date" id="startDate" 
                        name="startDate" value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className='border-2 rounded border-black px-5'
                        required
                      />
                  </div>

                  <div className="mb-10 flex justify-between align-baseline flex-1">

                      <label htmlFor="endDate" 
                      className="block font-medium text-black mr-[10px] text-base">
                        End Date
                      </label>

                      <input type="date" id="endDate" 
                        name="endDate" value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className='border-2 rounded border-black px-5'
                        required
                        />
                  </div>

              </div>

              {/* Vehicle Section */}
              <div className='flex flex-col justify-between align-baseline '> 

                <div className='flex flex-col justify-between align-baseline xl:flex-row'>
                  <div className="mb-10 flex justify-between align-baseline xl:flex-1 xl:mr-14">

                      <label htmlFor="vehicleType" 
                      className="block font-medium text-black mr-[10px] text-base">
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

                      <div className="mb-10 flex justify-between align-baseline xl:flex-1">
                      <label htmlFor="vehicleSubcategory" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Vehicle Subcategory
                      </label>

                      <select id="vehicleSubcategory" name="vehicleSubcategory" 
                      value={vehicleSubcategory} onChange={(e) => setVehicleSubcategory(e.target.value)} 
                      className='border-2 rounded border-black px-14' required>
                          <option value="">Select......</option>
                          {vehcleSubTypes.map((type) => (
                            <option key={type.id} value={type}>{type}</option>
                          ))}
                      </select>
                      </div>

                </div>
                

                <div className="mb-10 flex justify-start align-baseline">

                      <label htmlFor="airCondition" 
                      className="block font-medium text-black text-base mr-8">
                        Air Condition
                      </label>

                      <input type="checkbox" id="airCondition" name="airCondition" 
                      checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} 
                      className=''
                      required
                      />

                  </div>

              </div>


              {/* Passenger Count */}
              <div>

                <div className="mb-10 flex justify-between align-baseline xl:justify-start">

                  <label htmlFor="passengerCount" 
                  className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                    No of Passengers
                  </label>

                  <input type="number" id="passengerCount" name="passengerCount" 
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)} 
                  className='border-2 rounded border-black'
                  required
                  />

                </div> 

              </div>     

            </div>
          )}

            {/*Section 2 */}
          {step === 2 && (
            
            <div className="mt-5 px-2">
              {/* Vehicle and driver section */}
              <div className='flex justify-between align-baseline mb-5 '>
                  <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:mr-14 xl:flex-row">

                    <label htmlFor="AssignVehicle" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Select Vehicle
                    </label>

                    <select id="vehicle" name="vehicle" 
                      value={vehicle} onChange={(e) => setVehicle(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                        <option value="">Select Vehicle</option>
                        <option value={"CHJ-2233"}>CHJ-2233</option>
                        <option value={"CHJ-2233"}>CHJ-2233</option>

                    </select>

                  </div>

                  <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:flex-row">
                    <label htmlFor="assignDriver" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Select Driver
                    </label>

                    <select id="driverList" name="driverList" 
                      value={driver} onChange={(e) => setDriver(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                        <option value="">Select Driver</option>
                        <option value={"Chamara"}>Chamara</option>
                        <option value={"Chanchala"}>Chanchala</option>
                        <option value={"Danny"}>Danny</option>
                        <option value={"Jonny"}>Jonny</option>
                    </select>
                  </div>

              </div>

              {/* Trip details */}
              <div className=' border-b-2 border-black xl:flex xl:flex-col xl:justify-between xl:align-baseline'>

                <div className='flex justify-between align-baseline mb-5'>
                  <div className=" flex flex-col justify-between align-baseline mr-2 xl:flex-row xl:flex-1 xl:mr-14">

                    <label htmlFor="startPoint" 
                    className="block font-medium text-black  text-base xl:mr-7">
                      Starting Point
                    </label>

                    <input type="text" id="startPoint" name="startPoint" 
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)} 
                    placeholder='From'
                    className='border-2 rounded border-black px-4'
                    required
                    />

                  </div> 

                  <div className=" flex flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                    <label htmlFor="endPoint" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      End Point
                    </label>

                    <input type="text" id="endPoint" name="endPoint" 
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)} 
                    placeholder='To'
                    className='border-2 rounded border-black px-4'
                    required
                    />

                  </div>
                  
                </div>

                <div  className='flex justify-between align-baseline xl:justify-start'>  

                  <div className="mb-6 flex justify-start align-baseline xl:mr-16">

                    <label htmlFor="tripType" 
                    className="block font-medium text-black text-base mr-8">
                      Round Trip
                    </label>

                    <input type="checkbox" id="roundtrip" name="roundtrip" 
                    checked={tripType} onChange={(e) => setTripType(e.target.checked)} 
                    className=''
                    required
                    />

                    </div>

                    <div className="mb-6 flex justify-between align-baseline xl:justify-start">

                    <label htmlFor="distence" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      Distence
                    </label>

                    <input type="number" id="distence" name="distence" 
                    value={distence}
                    onChange={(e) => setSetDistence(e.target.value)} 
                    placeholder='Estimate Distence'
                    className='border-2 rounded border-black px-4'
                    required
                    />

                  </div>

                </div>
                

                

              </div>

              {/* Customer Details */}
              <div className='mt-7'> 
                <div className=''> 
                  <div className="mb-7 flex justify-start align-baseline xl:justify-start">

                    <label htmlFor="cusName" 
                    className="block mr-7 font-medium text-black text-base ">
                      Name
                    </label>

                    <input type="text" id="cusName" name="cusName" 
                    value={cusName}
                    onChange={(e) => setCusName(e.target.value)} 
                    placeholder='Customer Name'
                    className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                    required
                    />

                  </div>

                  <div className="mb-7 flex jjustify-start align-baseline xl:justify-start">

                    <label htmlFor="cusEmail" 
                    className="block font-medium text-black mr-7 text-base xl:mr-7">
                      Email
                    </label>

                    <input type="email" id="cusEmail" name="cusEmail" 
                    value={cusEmail}
                    onChange={(e) => setCusEmail(e.target.value)} 
                    placeholder='Customer Email'
                    className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                    required
                    />

                  </div>

                </div>

                <div className='flex justify-between'>

                  <div className="mb-5  flex flex-col justify-between align-baseline xl:flex-row xl:flex-1 xl:mr-14">

                    <label htmlFor="cusMobile" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      Mobile
                    </label>

                    <input type="tel" id="cusMobile" name="cusMobile" 
                    value={cusMobile}
                    onChange={(e) => setCusMobile(e.target.value)} 
                    placeholder='Customer Mobile No'
                    className='border-2 px-2 rounded border-black xl:px-4'
                    required
                    />

                  </div>

                  <div className="mb-5  flex flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                    <label htmlFor="cusNic" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      Nic
                    </label>

                    <input type="text" id="cusNic" name="cusNic" 
                    value={cusNic}
                    onChange={(e) => setCusNic(e.target.value)} 
                    placeholder='Customer NIC'
                    className='border-2 px-2 rounded border-black xl:px-4
                    required
                    '
                    />

                  </div> 
                  
                </div>
              </div>
              


            </div>
          )}

            {/* Confirmation */}
          {step === 3 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Confirmation</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {startDate}</p>
                  <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {endDate}</p>
                  <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp; {vehicleType}</p>
                  <p className=' text-lg font-semibold leading-8'>Vehicle Sub-Catagory : &nbsp;&nbsp; {vehicleSubcategory}</p>
                  <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {airCondition ? 'With Air Condition' : 'Without Air Condition'}</p>
                  <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {passengerCount}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {driver}</p>

                </div>

                <div className='mr-[20px]'>

                  <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp;{startPoint}</p>
                  <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {endPoint}</p>
                  <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {tripType ? 'Yes' : 'No'}</p>
                  <p className=' text-lg font-semibold leading-8'>Distence : &nbsp;&nbsp; {distence}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {cusName}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {cusEmail}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {cusMobile}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {cusNic}</p>

                </div>
                
                </div>
            </div>
          )}

            {/* Receipt */}
          {step === 4 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Receipt</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Estimated Distence : &nbsp;&nbsp; {distence}</p>          
                  <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp; {estimatedTotal}</p>
                </div>

                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Vehicle Fare(perKm) : &nbsp;&nbsp; </p>
                  <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp; {advancedPayment}</p>

                </div>
                
                </div>
            </div>
          )}

          <div className={`flex ali mt-8 px-4 justify-between`}>
            {step === 1 && (
              <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={cancel}>
              Cancel
            </button>
            )} 
            {step !== 1 && (
              <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={handlePrevStep}>
                Previous
              </button>
            )}
            {step !== 4 ? (
              <button type='button' className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none" onClick={handleNextStep}>
                Next
              </button>
            ) : (
              <button type='submit' className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none" onClick={submit}>
                Submit
              </button>
            )}
            
          </div>

        </form>
        
      </div>
    </div>
  );
};

export default Form;
