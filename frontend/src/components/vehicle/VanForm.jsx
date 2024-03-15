import React from 'react';

const VanForm = ({ formState, setFormState }) => {
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
      <div className='space-y-10'>
      <h1 className="text-lg font-bold">Add Van Details</h1>
      <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Van type:</label>
               <select className='mr-15  pl-2 pr-2' id="carType" name="vehicleType" value={formState.vehicleType} onChange={handleChange} >
                  <option value="van">Select</option>
                  <option value="miniBusVan">Mini Bus Van</option> 
                  <option value="miniVan">Mini Van</option> 
                  <option value="mpv">MPV</option>    
                </select>
      <div className='flex flex-row'>
      <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleRegister">Register Number:</label>
      <input className='mr-8 pl-2 pr-2 ' type="text" id="vehicleRegister" name="vehicleRegister" value={formState.vehicleRegister} onChange={handleChange}  />
  
      <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleModel">Model Number:</label>
      <input className='mr-8 pl-2 pr-2 ' type="text" id="vehicleModel" name="vehicleModel" value={formState.vehicleModel} onChange={handleChange}  />
  
      <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleManuYear">Year of Manufactured:</label>
      <input className='mr-8 pl-2 pr-2' type="text" id="vehicleManuYear" name="vehicleManuYear" value={formState.vehicleManuYear} onChange={handleChange}  />
      </div>  
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="engineCap">Engine Capacity:</label>
      <input className='mr-12 pl-2 pr-2' type="number" id="engineCap" name="engineCap" value={formState.engineCap} onChange={handleChange}   placeholder='0cc'/>
  
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
      <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={formState.lastMileage} onChange={handleChange}  />

      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
      <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={formState.vehicleGearSys} onChange={handleChange} >
                  <option value="">Select</option>
                  <option value="auto">Auto</option> 
                  <option value="manual">Manual</option>                
      </select>
      </div>
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleColour">Colour of Vehicle:</label>
      <input className='mr-12 pl-2 pr-2' type="text" id="vehicleColour" name="vehicleColour" value={formState.vehicleColour} onChange={handleChange}  />
      
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
      <select className='mr-12 pl-2 pr-2' id="airCon" name="airCon" value={formState.airCon} onChange={handleChange} >
                  <option value="">Select</option>
                  <option value="yes">Yes</option> 
                  <option value="no">No</option>                
      </select>
      </div>
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
      <input className='mr-12 pl-2 pr-2' type="number" id="numOfSeats" name="numOfSeats" value={formState.numOfSeats} onChange={handleChange} />
  
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lugSpace">Vehicle Luggage Space:</label>
      <input className='mr-12 pl-2 pr-2' type="number" id="lugSpace" name="lugSpace" value={formState.lugSpace} onChange={handleChange}  />
      </div>
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
      <select className='mr-12 pl-2 pr-2' id="gps" name="gps" value={formState.gps} onChange={handleChange} >
                  <option value="">Select</option>
                  <option value="available">Available</option> 
                  <option value="no">No</option>                
      </select>
      
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="licEndDate">Vehicle Licence End Date:</label>
      <input className='mr-12 pl-2 pr-2' type="date" id="licEndDate" name="licEndDate" value={formState.licEndDate} onChange={handleChange} />
  
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="insEndDate">Vehicle Insurance End Date:</label>
      <input className='mr-12 pl-2 pr-2' type="date" id="insEndDate" name="insEndDate" value={formState.insEndDate} onChange={handleChange}  />
      </div>
       
      <div> 
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleBookImage">Vehicle Book Image:</label>
      <input className='mr-12' type="file" id="vehicleBookImage" name="vehicleBookImage" accept="image/*" onChange={handleFileChange}  />
      </div>
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleLicenceImage">Updated Licence Image:</label>
      <input className='mr-12' type="file" id="vehicleLicenceImage" name="vehicleLicenceImage" accept="image/*" onChange={handleFileChange}  />
      </div>
  
      <div>
      <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleInsuImage">Updated Insurance Image:</label>
      <input className='mr-12' type="file" id="vehicleInsuImage" name="vehicleInsuImage" accept="image/*" onChange={handleFileChange}  />
      </div>
  
  </div>
    );
};

export default VanForm;