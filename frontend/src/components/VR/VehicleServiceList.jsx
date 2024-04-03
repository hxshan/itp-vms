import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { data } from './data'
import { Kilometer_based } from './Kilometer_based';
import { Time_based } from './Time_based';



export const VehicleServiceList = () => {

    const [selectedService, setSelectedService] = useState('time'); // Default to time-based service

    const handleServiceChange = (serviceType) => {
        setSelectedService(serviceType);
    };
  

    return (
        <div className="w-full flex flex-col items-center max-h-0.5 ">
            <h1 className='font-bold text-3xl'>Vehicle Service Reminder</h1>
            <div className="flex p-5 items-center  w-[800px] justify-evenly md:">
                    <div className="">
                        <button onClick={(e)=>setSelectedService('time')} className={`rounded-lg px-4 py-2 font-semibold ${selectedService === 'time' ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white' }`}>
                            Time Based Service
                        </button>
                    </div>
                    <div className="">
                        <button onClick={(e)=>setSelectedService('kilometer')} className={`rounded-lg px-4 py-2 font-semibold ${selectedService === 'kilometer' ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white' }`}>
                            Kilometer Based Service
                        </button>
                    </div>
                </div>
                {selectedService === 'kilometer' && <Kilometer_based/>}
            {selectedService === 'time' && <Time_based/>}
           
        </div>


    )
}
