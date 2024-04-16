import React from 'react'

const BusView = ({formData}) => {
 
  return (
   
    <div className='space-y-8 p-8'>
        <h1 className="text-xl font-bold">View Bus Details</h1>   
             
            <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Performance</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
            </div>
       

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleRegister">Register Number:</label>
    <p>{formData.vehicleRegister}</p>
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleModel">Model Number:</label>
    <p>{formData.vehicleModel}</p>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 "> 
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleManuYear">Year of Manufactured:</label>
    <p>{formData.vehicleManuYear}</p>
    </div>   
    <div>
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="engineCap">Engine Capacity:</label>
    <p>{formData.engineCap}</p>
    </div>
    </div>  

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lastMileage">Last Mileage:</label>
    <p>{formData.lastMileage}</p>
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
    <p>{formData.vehicleGearSys}</p>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lastMileage">Vehicle Fuel Type:</label>
    <p>{formData.fuelType}</p>
    </div>
    </div>
     
    <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Features</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-x-4"> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">      
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleColour">Colour of Vehicle:</label>
    <p>{formData.vehicleColour}</p>
    </div> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="airCon">Air Condition:</label>
    <p>{formData.airCon}</p>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="numOfSeats">Number of Seats without Driver:</label>
    <p>{formData.numOfSeats}</p>
    </div>    
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lugSpace">Vehicle Luggage Space:</label>
    <p>{formData.lugSpace}</p>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="gps">GPS :</label>
    <p>{formData.gps}</p>
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="fridge">Mini fridge :</label>
    <p>{formData.fridge}</p>
    </div>
    </div> 
    
    <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-1 w-full flex flex-col mb-4 ">    
        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="tv">TV :</label>
        <p>{formData.tv}</p>
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

export default BusView