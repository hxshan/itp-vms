import React from 'react';

const CarForm = ({ formState, setFormState }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFileChange = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];
        setFormState({ ...formState, [name]: file });
    };

    return (
    <div className='space-y-8'>
        <h1 className="text-xl font-bold">Add Car Details</h1>   
             
            <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Performance</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
            </div>
            
            <div className="col-span-1 w-full flex flex-col mb-4 ">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleType">Car Type:</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="carType" name="vehicleType" value={formState.vehicleType} onChange={handleChange}>
                <option value="car">Select</option>
                <option value="sadan">Sadan</option>
                <option value="hashback">Hashback</option>
                <option value="wagon">Wagon</option>
            </select>
            </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleRegister">Register Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleRegister" name="vehicleRegister" value={formState.vehicleRegister} onChange={handleChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleModel">Model Number:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleModel" name="vehicleModel" value={formState.vehicleModel} onChange={handleChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 "> 
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleManuYear">Year of Manufactured:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleManuYear" name="vehicleManuYear" value={formState.vehicleManuYear} onChange={handleChange} />
    </div>   
    <div>
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="engineCap">Engine Capacity:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="engineCap" name="engineCap" value={formState.engineCap} onChange={handleChange} placeholder='0cc' />
    </div>
    </div>  

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lastMileage">Last Mileage:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="lastMileage" name="lastMileage" value={formState.lastMileage} onChange={handleChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vehicleGearSys" name="vehicleGearSys" value={formState.vehicleGearSys} onChange={handleChange} >
                <option value="">Select</option>
                <option value="auto">Auto</option> 
                <option value="manual">Manual</option>                
    </select>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 w-full flex flex-col mb-4 ">
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="fuelType">Vehicle Fuel Type:</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fuelType" name="fuelType" value={formState.fuelType} onChange={handleChange} >
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
    <div className="col-span-1 w-full flex flex-col mb-4 ">      
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleColour">Colour of Vehicle:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="vehicleColour" name="vehicleColour" value={formState.vehicleColour} onChange={handleChange} />
    </div> 
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="airCon">Air Condition:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="airCon" name="airCon" value={formState.airCon} onChange={handleChange} >
                <option value="">Select</option>
                <option value="yes">Yes</option> 
                <option value="no">No</option>                
    </select>
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="numOfSeats">Number of Seats without Driver:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="numOfSeats" name="numOfSeats" value={formState.numOfSeats} onChange={handleChange} />
    </div>    
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lugSpace">Vehicle Luggage Space:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="lugSpace" name="lugSpace" value={formState.lugSpace} onChange={handleChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="gps">GPS :</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gps" name="gps" value={formState.gps} onChange={handleChange} >
                <option value="">Select</option>
                <option value="available">Available</option> 
                <option value="no">No</option>                
    </select>
    </div>
    </div>
    
    <div className='flex flex-row'>
            <h3 className='text-s font-bold'>Documentary</h3>
            <div className="border-b-2 ml-2 border-black w-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">    
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="licEndDate">Vehicle Licence End Date:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="licEndDate" name="licEndDate" value={formState.licEndDate} onChange={handleChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="insEndDate">Vehicle Insurance End Date:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" id="insEndDate" name="insEndDate" value={formState.insEndDate} onChange={handleChange} />
    </div>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 "> 
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleBookImage">Vehicle Book Image:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="vehicleBookImage" name="vehicleBookImage" accept="image/*" onChange={handleFileChange} />
    </div>

    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleLicenceImage">Updated Licence Image:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="vehicleLicenceImage" name="vehicleLicenceImage" accept="image/*" onChange={handleFileChange} />
    </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleInsuImage">Updated Insurance Image:</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="vehicleInsuImage" name="vehicleInsuImage" accept="image/*" onChange={handleFileChange} />
    </div>
    </div>  
    
    </div>

    
    );

   
};

export default CarForm;