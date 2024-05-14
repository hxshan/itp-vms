import React from 'react'
import AllVehicles from "../../components/vehicle/AllVehicle"
import { useNavigate} from 'react-router-dom'


const VehReport = () => {

  const navigate = useNavigate();

  return (

    <div className='mt-10 justify-end'>

    <div className='flex flex-row justify-end'>
    <button className='mx-1 px-4 py-2 rounded-md bg-actionRed text-white text-sm font-bold mb-5' onClick={() => navigate('vehsum')}>More</button>
    <button className='mx-1 px-4 py-2 rounded-md bg-actionBlue text-white text-sm font-bold mb-5' onClick={() => navigate('/vehicle')}>Dashboard</button>
    </div>

    <AllVehicles />
    </div>
  )
}

export default VehReport