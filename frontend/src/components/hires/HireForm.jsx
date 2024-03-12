import { useState } from 'react';
import PropTypes from 'prop-types';

const Form = ({ showForm, setShowForm }) => { 
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

  return (
    <div className="w-full h-full flex bg-gray-200 px-[50px] py-[20px] justify-center items-center">
      <div className="w-full h-[80vh] bg-white">
        <div className="text-center pt-[10px] pb-[6px] border-b-2">
          <h1 className="text-2xl font-semibold">Add Hire</h1>
        </div>

        {step === 1 && (
          <div className="mt-8 px-4">
            <h2 className="text-lg font-semibold mb-4">Step 1: Personal Information</h2>
            {/* Form fields for step 1 */}
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
