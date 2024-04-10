import React from 'react'

const VanEditForm = ({ formData, handleInputChange }) => {
  return (
    <div className='space-y-8'>
        <h1 className="text-xl font-bold">Edit Van Details</h1>   


        <p className="text-sm text-red-600 leading-relaxed">
            - Vehicle category can't change because of security reasons.
            </p>
             
            <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Performance</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
            </div>

            <div className="col-span-1 w-full flex flex-col mb-4 ">     
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleType">Van type:</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vanType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} >
                  <option value="van">Select</option>
                  <option value="miniBusVan">Mini Bus Van</option> 
                  <option value="miniVan">Mini Van</option> 
                  <option value="mpv">MPV</option>    
            </select>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleRegister">Register Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleRegister" name="vehicleRegister" value={formData.vehicleRegister} onChange={handleInputChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleModel">Model Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 "> 
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleManuYear">Year of Manufactured:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleManuYear" name="vehicleManuYear" value={formData.vehicleManuYear} onChange={handleInputChange} />
    </div>   
    <div>
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="engineCap">Engine Capacity:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="engineCap" name="engineCap" value={formData.engineCap} onChange={handleInputChange} placeholder='0cc' />
    </div>
    </div>  

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lastMileage">Last Mileage:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="lastMileage" name="lastMileage" value={formData.lastMileage} onChange={handleInputChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vehicleGearSys" name="vehicleGearSys" value={formData.vehicleGearSys} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="auto">Auto</option> 
                <option value="manual">Manual</option>                
    </select>
    </div>
    </div>
     
    <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Features</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-x-4"> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">      
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleColour">Colour of Vehicle:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleColour" name="vehicleColour" value={formData.vehicleColour} onChange={handleInputChange} />
    </div> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="airCon">Air Condition:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="airCon" name="airCon" value={formData.airCon} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="yes">Yes</option> 
                <option value="no">No</option>                
    </select>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="numOfSeats">Number of Seats without Driver:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="numOfSeats" name="numOfSeats" value={formData.numOfSeats} onChange={handleInputChange} />
    </div>    
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lugSpace">Vehicle Luggage Space:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="lugSpace" name="lugSpace" value={formData.lugSpace} onChange={handleInputChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="gps">GPS :</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gps" name="gps" value={formData.gps} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="available">Available</option> 
                <option value="no">No</option>                
    </select>
    </div>
    </div> 

    </div>
  )
}

export default VanEditForm