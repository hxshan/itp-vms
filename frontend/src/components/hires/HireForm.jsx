import { useState } from 'react';
import PropTypes from 'prop-types';

import {validateFormFirstPage, validateFormSecondPage} from './Validation';

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
    cusName, cusEmail, cusMobile, cusNic
  }

  //Handle Submit
  const submit = () => {
  
    const confirm = window.confirm("Are you sure")
    if(confirm){
      setShowForm(false)
    }
    
  }

  const cancel = () => {
    setShowForm(false)
  }
  
  const handleNextStep = () => {
    
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
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };





  return (
    <div className="w-full h-full flex bg-gray-200 px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">

      <div className="w-full h-full bg-white px-3 py-5 xl:px-10">
        {/*Titile*/}
        <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
          <h1 className="text-2xl font-semibold xl:text-4xl">Add Hire</h1>
        </div>

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
                    >
                        <option value="">Select......</option>
                        <option value={"Car"}>Car</option>
                        <option value={"van"}>Van</option>
                        <option value={"Bus"}>Bus</option>
                        <option value={"Lorry"}>Lorry</option>
                    </select>

                    </div>

                    <div className="mb-10 flex justify-between align-baseline xl:flex-1">
                    <label htmlFor="vehicleSubcategory" 
                    className="block font-medium text-black mr-[10px] text-base">
                      Vehicle Subcategory
                    </label>

                    <select id="vehicleSubcategory" name="vehicleSubcategory" 
                    value={vehicleSubcategory} onChange={(e) => setVehicleSubcategory(e.target.value)} 
                    className='border-2 rounded border-black px-14'>
                        <option value="">Select......</option>
                        <option value={"Car"}>Car</option>
                        <option value={"van"}>Van</option>
                        <option value={"Bus"}>Bus</option>
                        <option value={"Lorry"}>Lorry</option>
                    </select>
                    </div>

              </div>
              

              <div className="mb-10 flex justify-start align-baseline">

                    <label htmlFor="airCondition" 
                    className="block font-medium text-black mr-[10px] text-base mr-8">
                      Air Condition
                    </label>

                    <input type="checkbox" id="airCondition" name="airCondition" 
                    checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} 
                    className=''/>

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
                    className='border-2 rounded border-black px-14'>
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
                  />

                </div>
                
              </div>

              <div  className='flex justify-between align-baseline xl:justify-start'>  

                <div className="mb-6 flex justify-start align-baseline xl:mr-16">

                  <label htmlFor="tripType" 
                  className="block font-medium text-black mr-[10px] text-base mr-8">
                    Round Trip
                  </label>

                  <input type="checkbox" id="roundtrip" name="roundtrip" 
                  checked={tripType} onChange={(e) => setTripType(e.target.checked)} 
                  className=''/>

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

            <div>
              <p>Start Date: {startDate}</p>
              <p>End Date: {endDate}</p>
              <p>Vehicle Type: {vehicleType}</p>
              <p>Vehicle Sub-Catagory: {vehicleSubcategory}</p>
              <p>Air Condition: {airCondition ? 'With Air Condition' : 'Without Air Condition'}</p>
              <p>No of Passengers: {passengerCount}</p>
              <p>Assigned Vehicle: {vehicle}</p>
              <p>Assigned Driver: {driver}</p>
              <p>Start Point: {startPoint}</p>
              <p>End Point: {endPoint}</p>
              <p>Round Trip: {tripType ? 'Yes' : 'No'}</p>
              <p>Distence: {distence}</p>
              <p>Customer Name: {cusName}</p>
              <p>Customer Email: {cusEmail}</p>
              <p>Customer Mobile: {cusMobile}</p>
              <p>Customer NIC: {cusNic}</p>
              </div>
          </div>
        )}

        <div className={`flex ali mt-8 px-4 justify-between`}>
          {step === 1 && (
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={cancel}>
            Cancel
          </button>
          )} 
          {step !== 1 && (
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={handlePrevStep}>
              Previous
            </button>
          )}
          {step !== 3 ? (
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none" onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none" onClick={submit}>
              Submit
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Form;