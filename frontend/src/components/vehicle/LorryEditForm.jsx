import React from 'react'

const LorryEditForm = ({ formData, handleInputChange }) => {
  return (
    <div className='space-y-8'>
    <h1 className="text-xl font-bold">Add Lorry Details</h1>
    <div className='flex flex-row'>
          <h3 className='text-s font-bold'>Performance</h3>
          <div className="border-b-2 ml-2 border-black w-full"></div>
          </div>
             <div className="col-span-1 w-full flex flex-col mb-4 ">
             <label className="block  text-md font-bold mb-2" htmlFor="vehicleType">Lorry Type:</label>
             <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="lorryType" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} >
                <option value="lorry">Select</option>
                <option value="6 Wheels">6 Wheels</option> 
                <option value="10 Wheels">10 Wheels</option>     
              </select>
              </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">  
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleRegister">Register Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="text" id="vehicleRegister" name="vehicleRegister" value={formData.vehicleRegister} onChange={handleInputChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleModel">Model Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="text" id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">  
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleManuYear">Year of Manufactured:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="text" id="vehicleManuYear" name="vehicleManuYear" value={formData.vehicleManuYear} onChange={handleInputChange} />
    </div> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="engineCap">Engine Capacity:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="number" id="engineCap" name="engineCap" value={formData.engineCap} onChange={handleInputChange} placeholder='0cc' />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div>
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="number" id="lastMileage" name="lastMileage" value={formData.lastMileage} onChange={handleInputChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="vehicleGearSys" name="vehicleGearSys" value={formData.vehicleGearSys} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="auto">Auto</option> 
                <option value="manual">Manual</option>                
    </select>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleWeight">Vehicle Weight:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="number" id="vehicleWeight" name="vehicleWeight" value={formData.vehicleWeight} onChange={handleInputChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">   
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoCapacity">Cargo Capacity:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="number" id="cargoCapacity" name="cargoCapacity" value={formData.cargoCapacity} onChange={handleInputChange} />
    </div>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoArea">Cargo Area:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="cargoArea" name="cargoArea" value={formData.cargoArea} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="covered">Covered</option> 
                <option value="uncovered">Uncovered</option>                
    </select>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 w-full flex flex-col mb-4 ">
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Vehicle Fuel Type:</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleInputChange} >
                                    <option value="">Select</option>
                                    <option value="petrol">Petrol</option> 
                                    <option value="diesel">Diesel</option>                
                                    <option value="electric">Electric</option>                
                                    <option value="hybrid">Hybrid</option>                
                        </select>
                        </div>
    </div>

    
    <div className='flex flex-row'>
          <h3 className='text-s font-bold'>Features</h3>
          <div className="border-b-2 ml-2 border-black w-full"></div>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4">
    <div>
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="airCon" name="airCon" value={formData.airCon} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="yes">Yes</option> 
                <option value="no">No</option>                
    </select>
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" type="number" id="numOfSeats" name="numOfSeats" value={formData.numOfSeats} onChange={handleInputChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">  
    <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline dark:bg-black" id="gps" name="gps" value={formData.gps} onChange={handleInputChange} >
                <option value="">Select</option>
                <option value="available">Available</option> 
                <option value="no">No</option>                
    </select>
    </div>
    </div>
      
  </div>   
  )
}

export default LorryEditForm