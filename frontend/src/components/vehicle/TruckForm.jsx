import React from 'react'

const TruckForm = ({vehicleType,vehicleRegister,vehicleModel,vehicleManuYear,engineCap,lastMileage,vehicleWeight,cargoCapacity,trailerLength,vehicleGearSys,airCon,numOfSeats,gps,passengerCabin,fridge,tv,licEndDate,insEndDate,handleVehicleBookImageChange,handleVehicleLicenceImageImageChange,handleVehicleInsuImageChange}) => {
  return (
    <div className='space-y-10'>
                        <h1 className="text-lg font-bold">Add Truck Details</h1>
                        <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Truck Type:</label>
                                 <select className='mr-15  pl-2 pr-2' id="carType" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
                                    <option value="truck">Select</option>
                                    <option value="6wheels">6 Wheels</option> 
                                    <option value="10wheels">10 Wheels</option> 
                                    <option value="14wheels">14 Wheels</option>     
                                  </select>
                        <div className='flex flex-row'>
                        <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleRegister">Register Number:</label>
                        <input className='mr-8 pl-2 pr-2 ' type="text" id="vehicleRegister" name="vehicleRegister" value={vehicleRegister} onChange={(e) => setVehicleRegister(e.target.value)} />

                        <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleModel">Model Number:</label>
                        <input className='mr-8 pl-2 pr-2 ' type="text" id="vehicleModel" name="vehicleModel" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />

                        <label className='ml-2 mr-1 font-semibold text-base' htmlFor="vehicleManuYear">Year of Manufactured:</label>
                        <input className='mr-8 pl-2 pr-2' type="text" id="vehicleManuYear" name="vehicleManuYear" value={vehicleManuYear} onChange={(e) => setVehicleManuYear(e.target.value)} />
                        </div>  

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="engineCap">Engine Capacity:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="engineCap" name="engineCap" value={engineCap} onChange={(e) => setEngineCap(e.target.value)} defaultValue={1000} placeholder='0cc'/>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
                        <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={vehicleGearSys} onChange={(e) => setVehicleGearSys(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="auto">Auto</option> 
                                    <option value="manual">Manual</option>                
                        </select>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={lastMileage} onChange={(e) => setLastMileage(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleWeight">Vehicle Weight:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="vehicleWeight" name="vehicleWeight" value={vehicleWeight} onChange={(e) => setVehicleWeight(e.target.value)} />

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="trailerLength">Max trailer length:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="trailerLength" name="trailerLength" value={trailerLength} onChange={(e) => setTrailerLength(e.target.value)} />

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoCapacity">Cargo Capacity:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="cargoCapacity" name="cargoCapacity" value={cargoCapacity} onChange={(e) => setCargoCapacity(e.target.value)} />
                        </div>    

                        <div>                 
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
                        <select className='mr-12 pl-2 pr-2' id="airCon" name="airCon" value={airCon} onChange={(e) => setAirCon(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option> 
                                    <option value="no">No</option>                
                        </select>
                        
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="numOfSeats" name="numOfSeats" value={numOfSeats} onChange={(e) => setNumOfSeats(e.target.value)} defaultValue={4}/>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
                        <select className='mr-12 pl-2 pr-2' id="gps" name="gps" value={gps} onChange={(e) => setGps(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="no">No</option> 
                                    <option value="available">Available</option> 
                        </select>
                        </div>

                        <div>   
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="passengerCabin">Passenger Cabin:</label>
                        <select className='mr-12 pl-2 pr-2' id="passengerCabin" name="passengerCabin" value={passengerCabin} onChange={(e) => setPassengerCabin(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="no">No</option> 
                                    <option value="available">Available</option>                
                        </select>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="fridge">Mini fridge :</label>
                        <select className='mr-12 pl-2 pr-2' id="fridge" name="fridge" value={fridge} onChange={(e) => setFridge(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="no">No</option> 
                                    <option value="available">Available</option>                                                  
                        </select>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="tv">TV :</label>
                        <select className='mr-12 pl-2 pr-2' id="tv" name="tv" value={tv} onChange={(e) => setTv(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="no">No</option> 
                                    <option value="available">Available</option>  
                        </select>
                        </div>
                        
                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="licEndDate">Vehicle Licence End Date:</label>
                        <input className='mr-12 pl-2 pr-2' type="date" id="licEndDate" name="licEndDate" value={licEndDate} onChange={(e) => setLicEndDate(e.target.value)} />

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="insEndDate">Vehicle Insurance End Date:</label>
                        <input className='mr-12 pl-2 pr-2' type="date" id="insEndDate" name="insEndDate" value={insEndDate} onChange={(e) => setInsEndDate(e.target.value)} />
                        </div>
                         
                        <div> 
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleBookImage">Vehicle Book Image:</label>
                        <input className='mr-12' type="file" id="vehicleBookImage" name="vehicleBookImage" accept="image/*" onChange={handleVehicleBookImageChange} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleLicenceImage">Updated Licence Image:</label>
                        <input className='mr-12' type="file" id="vehicleLicenceImage" name="vehicleLicenceImage" accept="image/*" onChange={handleVehicleLicenceImageImageChange} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleInsuImage">Updated Insurance Image:</label>
                        <input className='mr-12' type="file" id="vehicleInsuImage" name="vehicleInsuImage" accept="image/*" onChange={handleVehicleInsuImageChange} />
                        </div>

    </div>
  )
}

export default TruckForm