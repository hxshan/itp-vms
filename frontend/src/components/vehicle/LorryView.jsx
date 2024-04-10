import React from 'react'

const LorryView = ({formData}) => {
  return (
    <div className='space-y-8'>
      <h1 className="text-xl font-bold">View Lorry Details</h1>
      <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Performance</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
            </div>
               <div className="col-span-1 w-full flex flex-col mb-4 ">
               <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleType">Lorry Type:</label>
               <p>{formData.vehicleType}</p>
                </div>

      <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">  
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleRegister">Register Number:</label>
      <p>{formData.vehicleRegister}</p>
      </div>
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleModel">Model Number:</label>
      <p>{formData.vehicleModel}</p>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4">  
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleManuYear">Year of Manufactured:</label>
      <p>{formData.vehicleManuYear}</p>
      </div> 
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="engineCap">Engine Capacity:</label>
      <p>{formData.engineCap}</p>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4">
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
      <p>{formData.lastMileage}</p>
      </div>
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
      <p>{formData.vehicleGearSys}</p>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleWeight">Vehicle Weight:</label>
      <p>{formData.vehicleWeight}</p>
      </div>
      <div className="col-span-1 w-full flex flex-col mb-4 ">   
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoCapacity">Cargo Capacity:</label>
      <p>{formData.cargoCapacity}</p>
      </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoArea">Cargo Area:</label>
      <p>{formData.cargoArea}</p>
      </div>
      </div>

      
      <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Features</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4">
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
      <p>{formData.airCon}</p>
      </div>
      
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
      <p>{formData.numOfSeats}</p>
      </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">  
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
      <p>{formData.gps}</p>
      </div>
      </div>
        
      <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Documentary</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="licEndDate">Vehicle Licence End Date:</label>
    <p>{new Date(formData.licEndDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</p>
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="insEndDate">Vehicle Insurance End Date:</label>
    <p>{new Date(formData.insEndDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</p>
    </div>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="licEndDate">Vehicle Status:</label>
    <div className='m-0 bg-green-400 py-2 px-4 rounded-md'>
        <div className='text-green-800 text-sm font-bold'>{formData.statusVehicle}</div>
    </div>
    </div>
    </div>
    
    </div>   
  )
}

export default LorryView