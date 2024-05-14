import React, { useState } from 'react';
import Component1 from '../../components/vehicle/HireSummury';
import Component2 from '../../components/vehicle/MaintainSummary';
import Component3 from '../../components/vehicle/ContractSummary';
import Component4 from '../../components/vehicle/ServiceSummary';
import { useNavigate } from 'react-router-dom';


const VehicleSummary = () => {
  const [activeComponent, setActiveComponent] = useState(<Component1 />);
  const navigate = useNavigate();

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return(
    <div className='mt-10 justify-end'>
      
      <div className='flex flex-row justify-end'>
      <button className='mx-2 px-3 py-1 rounded-md bg-actionRed text-white text-sm text-bold' onClick={() => handleButtonClick(<Component1 />)}>Hire Summary</button>
      <button className='mx-2 px-3 py-1 rounded-md bg-actionRed text-white text-sm text-bold' onClick={() => handleButtonClick(<Component2 />)}>Maintaince Summary</button>
      <button className='mx-2 px-3 py-1 rounded-md bg-actionRed text-white text-sm text-bold' onClick={() => handleButtonClick(<Component3 />)}>Contract Summary</button>
      <button className='mx-2 px-3 py-1 rounded-md bg-actionRed text-white text-sm text-bold' onClick={() => handleButtonClick(<Component4 />)}>Service Summary</button>
      <button className='mx-2 px-3 py-1 rounded-md bg-actionBlue text-white text-sm text-bold' onClick={() => navigate('/vehicle')}>Dashboard</button>
      </div>

      <div>
        {activeComponent}
      </div>
    </div>
  )
  
}

export default VehicleSummary;
