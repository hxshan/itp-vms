import { useState } from 'react';
import PropTypes from 'prop-types';

const Form = ({setShowForm }) => { 
  const [step, setStep] = useState(1);

  Form.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
  };

  const submit = () => {
    setShowForm(false)
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleSubcategory, setVehicleSubcategory] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [airCondition, setAirCondition] = useState(false);
  const [vehicle, setVehicle] = useState('')
  const [driver, setDriver] = useState('')



  return (
    <div className="w-full h-full flex bg-gray-200 px-[20px] py-[20px] justify-center items-center">

      <div className="w-full h-full bg-white px-3">
        {/*Titile*/}
        <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
          <h1 className="text-2xl font-semibold">Add Hire</h1>
        </div>

        {/* Form */}
        {step === 1 && (
          <div className="mt-10  w-full border-2 border-black pt-5 px-4">

            {/* Date Section */}
            <div className='flex flex-col justify-between align-baseline mt-3'> 

              <div className="mb-8 flex justify-between items-baseline">
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

                <div className="mb-8 flex justify-between items-baseline">

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
            <div> 

              <div className="mb-8 flex justify-between items-baseline ">

                <label htmlFor="vehicleType" 
                className="block font-medium text-black mr-[10px] text-base">
                  Vehicle Type
                </label>

                <select id="vehicleType" name="vehicleType" 
                value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} 
                className='border-2 rounded border-black px-5 '
                >
                    <option value={"Car"}>Car</option>
                    <option value={"van"}>Van</option>
                    <option value={"Bus"}>Bus</option>
                    <option value={"Lorry"}>Lorry</option>
                </select>

              </div>

              <div className="mb-8 flex justify-between items-baseline">
                <label htmlFor="vehicleSubcategory" 
                className="block font-medium text-black mr-[10px] text-base">
                  Vehicle Subcategory
                </label>
                
                <select id="vehicleSubcategory" name="vehicleSubcategory" 
                value={vehicleSubcategory} onChange={(e) => setVehicleSubcategory(e.target.value)} 
                className='border-2 rounded border-black px-5'>
                    {/* Options for vehicle subcategories */}
                </select>
              </div>

              <div className="mb-8 flex justify-start items-baseline">

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

              <div className="mb-8 flex justify-between items-baseline ">

                <label htmlFor="passengerCount" 
                className="block font-medium text-black mr-[5px] text-base">
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

        {step === 2 && (
          <div className="mt-8 px-4">
            <div>
              <label htmlFor='Select Vehicle' className="ml-2 block text-sm font-medium text-gray-700">Select Vehical</label>
              <select id="avalableVehicle" name="avalableVehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} >
                        <option value={"Car"}>Car</option>
                        <option value={"van"}>Van</option>
                        <option value={"Bus"}>Bus</option>
                        <option value={"Lorry"}>Lorry</option>
                    </select>
            </div>

            <div>
              <label htmlFor='Select Driver' className="ml-2 block text-sm font-medium text-gray-700">Select Driver</label>
              <select id="driver" name="driver" value={vehicle} onChange={(e) => setDriver(e.target.value)} >
                        <option value={"Car"}>Car</option>
                        <option value={"van"}>Van</option>
                        <option value={"Bus"}>Bus</option>
                        <option value={"Lorry"}>Lorry</option>
              </select>
            </div>

          </div>
        )}

        {step === 3 && (
          <div className="mt-8 px-4">
            <h2 className="text-lg font-semibold mb-4">Step 3: Experience</h2>
            {/* Form fields for step 3 */}
          </div>
        )}

        <div className={`flex ali mt-8 px-4 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
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
