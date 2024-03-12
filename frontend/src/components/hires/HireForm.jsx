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



  return (
    <div className="w-full h-full flex bg-gray-200 px-[50px] py-[20px] justify-center items-center">
      <div className="w-full h-[80vh] bg-white">
        <div className="text-center pt-[10px] pb-[6px] border-b-2">
          <h1 className="text-2xl font-semibold">Add Hire</h1>
        </div>

        {step === 1 && (
          <div className="mt-8 px-4">
            <h2 className="text-lg font-semibold mb-4">Step 1: Personal Information</h2>
            
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className="mb-4">
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select id="vehicleType" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
                        <option value={"Car"}>Car</option>
                        <option value={"van"}>Van</option>
                        <option value={"Bus"}>Bus</option>
                        <option value={"Lorry"}>Lorry</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="vehicleSubcategory" className="block text-sm font-medium text-gray-700">Vehicle Subcategory</label>
                    <select id="vehicleSubcategory" name="vehicleSubcategory" value={vehicleSubcategory} onChange={(e) => setVehicleSubcategory(e.target.value)} >
                    {/* Options for vehicle subcategories */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-700">Number of Passengers</label>
                    <input type="number" id="passengerCount" name="passengerCount" value={passengerCount} onChange={(e) => setPassengerCount(e.target.value)} />
                </div>

                <div className="mb-4">
                    <input type="checkbox" id="airCondition" name="airCondition" checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} />
                    <label htmlFor="airCondition" className="ml-2 block text-sm font-medium text-gray-700">Air Condition</label>
                </div>

          </div>
        )}

        {step === 2 && (
          <div className="mt-8 px-4">
            <h2 className="text-lg font-semibold mb-4">Step 2: Education</h2>
            {/* Form fields for step 2 */}
          </div>
        )}

        {step === 3 && (
          <div className="mt-8 px-4">
            <h2 className="text-lg font-semibold mb-4">Step 3: Experience</h2>
            {/* Form fields for step 3 */}
          </div>
        )}

        <div className="flex justify-between mt-8 px-4">
          {step !== 1 && (
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4" onClick={handlePrevStep}>
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
