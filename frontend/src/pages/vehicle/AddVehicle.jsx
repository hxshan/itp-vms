import React, { useState } from 'react';

const AddVehicle = () => {
    const [category, setCategory] = useState('');

    const [vehicleType, setVehicleType] = useState('');
    const [vehicleRegister, setVehicleRegister] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleManuYear, setVehicleManuYear] = useState('');
    const [engineCap, setEngineCap] = useState('');
    const [lastMileage, setLastMileage] = useState('');
    const [vehicleColour, setVehicleColour] = useState('');
    const [vehicleGearSys, setVehicleGearSys] = useState('');
    const [airCon, setAirCon] = useState('');
    const [numOfSeats, setNumOfSeats] = useState('');
    const [lugSpace, setLugSpace] = useState('');
    const [gps, setGps] = useState('');
    const [licEndDate, setLicEndDate] = useState('');
    const [insEndDate, setInsEndDate] = useState('');
   


    const [fridge, setFridge] = useState('');
    const [tv, setTv] = useState('');

    const [vehicleWeight, setVehicleWeight] = useState('');
    const [cargoCapacity, setCargoCapacity] = useState('');
    const [cargoArea, setCargoArea] = useState('');

    const [trailerLength, setTrailerLength] = useState('');
    const [passengerCabin, setPassengerCabin] = useState('');


    const [vehicleBookImage, setVehicleBookImage] = useState(null);
    const [vehicleLicenceImage, setVehicleLicenceImage] = useState(null);
    const [vehicleInsuImage, setVehicleInsuImage] = useState(null);



    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    
    const handleVehicleBookImageChange = (event) => {
        const file = event.target.files[0];
        setVehicleBookImage(file);
    };
    const handleVehicleLicenceImageImageChange = (event) => {
        const file = event.target.files[0];
        setVehicleLicenceImage(file);
    };
    const handleVehicleInsuImageChange = (event) => {
        const file = event.target.files[0];
        setVehicleInsuImage(file);
    };


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('category', category);

        switch (category) {
            case 'car':
                formData.append('vehicleType', vehicleType);
                formData.append('vehicleRegister', vehicleRegister);
                formData.append('vehicleModel', vehicleModel);
                formData.append('vehicleManuYear', vehicleManuYear);
                formData.append('engineCap', engineCap);
                formData.append('lastMileage', lastMileage);
                formData.append('vehicleColour', vehicleColour);
                formData.append('vehicleGearSys', vehicleGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('lugSpace', lugSpace);
                formData.append('gps', gps);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('vehicleBookImage', vehicleBookImage);
                formData.append('vehicleLicenceImage', vehicleLicenceImage);
                formData.append('vehicleInsuImage', vehicleInsuImage);
                break;
            case 'van':
                formData.append('vehicleType', vehicleType);
                formData.append('vehicleRegister', vehicleRegister);
                formData.append('vehicleModel', vehicleModel);
                formData.append('vehicleManuYear', vehicleManuYear);
                formData.append('engineCap', engineCap);
                formData.append('lastMileage', lastMileage);
                formData.append('vehicleColour', vehicleColour);
                formData.append('vehicleGearSys', vehicleGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('lugSpace', lugSpace);
                formData.append('gps', gps);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('vehicleBookImage', vehicleBookImage);
                formData.append('vehicleLicenceImage', vehicleLicenceImage);
                formData.append('vehicleInsuImage', vehicleInsuImage);
                break;    
            case 'bus':
                formData.append('vehicleRegister', vehicleRegister);
                formData.append('vehicleModel', vehicleModel);
                formData.append('vehicleManuYear', vehicleManuYear);
                formData.append('engineCap', engineCap);
                formData.append('lastMileage', lastMileage);
                formData.append('vehicleColour', vehicleColour);
                formData.append('vehicleGearSys', vehicleGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('lugSpace', lugSpace);
                formData.append('gps', gps);
                formData.append('fridge', fridge);
                formData.append('tv', tv);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('vehicleBookImage', vehicleBookImage);
                formData.append('vehicleLicenceImage', vehicleLicenceImage);
                formData.append('vehicleInsuImage', vehicleInsuImage);
                break;
            case 'lorry':
                formData.append('vehicleType', vehicleType);
                formData.append('vehicleRegister', vehicleRegister);
                formData.append('vehicleModel', vehicleModel);
                formData.append('vehicleManuYear', vehicleManuYear);
                formData.append('engineCap', engineCap);
                formData.append('lastMileage', lastMileage);
                formData.append('vehicleWeight', vehicleWeight);
                formData.append('cargoCapacity', cargoCapacity);
                formData.append('cargoArea', cargoArea);
                formData.append('vehicleGearSys', vehicleGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('gps', gps);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('vehicleBookImage', vehicleBookImage);
                formData.append('vehicleLicenceImage', vehicleLicenceImage);
                formData.append('vehicleInsuImage', vehicleInsuImage);
                break;
            case 'truck':
                formData.append('vehicleType', vehicleType);
                formData.append('vehicleRegister', vehicleRegister);
                formData.append('vehicleModel', vehicleModel);
                formData.append('vehicleManuYear', vehicleManuYear);
                formData.append('engineCap', engineCap);
                formData.append('lastMileage', lastMileage);
                formData.append('vehicleWeight', vehicleWeight);
                formData.append('trailerLength', trailerLength);
                formData.append('cargoCapacity', cargoCapacity);             
                formData.append('vehicleGearSys', vehicleGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('gps', gps);
                formData.append('passengerCabin', passengerCabin);
                formData.append('fridge', fridge);
                formData.append('tv', tv);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('vehicleBookImage', vehicleBookImage);
                formData.append('vehicleLicenceImage', vehicleLicenceImage);
                formData.append('vehicleInsuImage', vehicleInsuImage);
                    break;    
            default:
                break;
        }

        fetch('/saveData', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.error('Failed to save data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    return (
            <div className="place-content-center m-8 bg-cover bg-center bg-white" >
                <h1 className="text-lg font-bold">Add Vehicle Details</h1>
                <form className="space-y-2 m-3 p-3  bg-slate-200 rounded-md pad">
                    <h3 className="m-0 p-0 text-sm text-red-600 font-medium">- Please select correct vehicle category before adding vehicle details.</h3>
                    <h3 className="m-0 p-0 text-sm text-red-600 font-medium">- After selecting a vehicle category type, the system will automatically display the vehicle details according to the respective category.</h3>
                    <h3 className="m-0 p-0 text-sm text-red-600 font-medium">- Please provide correct details to the system when you enter the details.</h3>
                    <label className='m-2 font-semibold text-base' htmlFor="category">Select Vehicle Category:</label>
                         <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                            <option value="">Select</option>
                            <option value="car">Car</option>
                            <option value="van">Van</option>
                            <option value="bus">Bus</option>
                            <option value="lorry">Lorry</option>
                            <option value="truck">Truck</option>
                         </select>
                </form>
                {category && (
                <form className=" m-3 p-3  bg-slate-200 rounded-md pad">
                    {category === 'car' && (
                        <div className='space-y-10'>
                            <h1 className="text-lg font-bold">Add Car Details</h1>
                            <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Car Type:</label>
                                     <select className='mr-15  pl-2 pr-2' id="carType" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
                                        <option value="car">Select</option>
                                        <option value="sadan">Sadan</option> 
                                        <option value="hashback">Hashback</option> 
                                        <option value="wagon">Wagon</option>    
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

                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
                            <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={lastMileage} onChange={(e) => setLastMileage(e.target.value)} />
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleColour">Colour of Vehicle:</label>
                            <input className='mr-12 pl-2 pr-2' type="text" id="vehicleColour" name="vehicleColour" value={vehicleColour} onChange={(e) => setVehicleColour(e.target.value)} />
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
                            <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={vehicleGearSys} onChange={(e) => setVehicleGearSys(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="auto">Auto</option> 
                                        <option value="manual">Manual</option>                
                            </select>

                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
                            <select className='mr-12 pl-2 pr-2' id="airCon" name="airCon" value={airCon} onChange={(e) => setAirCon(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option> 
                                        <option value="no">No</option>                
                            </select>
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
                            <input className='mr-12 pl-2 pr-2' type="number" id="numOfSeats" name="numOfSeats" value={numOfSeats} onChange={(e) => setNumOfSeats(e.target.value)} defaultValue={4}/>

                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lugSpace">Vehicle Luggage Space:</label>
                            <input className='mr-12 pl-2 pr-2' type="number" id="lugSpace" name="lugSpace" value={lugSpace} onChange={(e) => setLugSpace(e.target.value)} defaultValue={20}/>
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
                            <select className='mr-12 pl-2 pr-2' id="gps" name="gps" value={gps} onChange={(e) => setGps(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="available">Available</option> 
                                        <option value="no">No</option>                
                            </select>
                            
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
                    )}
                    {category === 'van' && (
                    <div className='space-y-10'>
                        <h1 className="text-lg font-bold">Add Van Details</h1>
                        <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Van type:</label>
                                 <select className='mr-15  pl-2 pr-2' id="carType" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
                                    <option value="van">Select</option>
                                    <option value="miniBusVan">Mini Bus Van</option> 
                                    <option value="miniVan">Mini Van</option> 
                                    <option value="mpv">MPV</option>    
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

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={lastMileage} onChange={(e) => setLastMileage(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleColour">Colour of Vehicle:</label>
                        <input className='mr-12 pl-2 pr-2' type="text" id="vehicleColour" name="vehicleColour" value={vehicleColour} onChange={(e) => setVehicleColour(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
                        <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={vehicleGearSys} onChange={(e) => setVehicleGearSys(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="auto">Auto</option> 
                                    <option value="manual">Manual</option>                
                        </select>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
                        <select className='mr-12 pl-2 pr-2' id="airCon" name="airCon" value={airCon} onChange={(e) => setAirCon(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option> 
                                    <option value="no">No</option>                
                        </select>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="numOfSeats" name="numOfSeats" value={numOfSeats} onChange={(e) => setNumOfSeats(e.target.value)} defaultValue={4}/>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lugSpace">Vehicle Luggage Space:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lugSpace" name="lugSpace" value={lugSpace} onChange={(e) => setLugSpace(e.target.value)} defaultValue={20}/>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
                        <select className='mr-12 pl-2 pr-2' id="gps" name="gps" value={gps} onChange={(e) => setGps(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="available">Available</option> 
                                    <option value="no">No</option>                
                        </select>
                        
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
                    )}
                    {category === 'bus' && (
                        <div className='space-y-10'>
                        <h1 className="text-lg font-bold">Add Bus Details</h1>
                    
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

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={lastMileage} onChange={(e) => setLastMileage(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleColour">Colour of Vehicle:</label>
                        <input className='mr-12 pl-2 pr-2' type="text" id="vehicleColour" name="vehicleColour" value={vehicleColour} onChange={(e) => setVehicleColour(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
                        <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={vehicleGearSys} onChange={(e) => setVehicleGearSys(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="auto">Auto</option> 
                                    <option value="manual">Manual</option>                
                        </select>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="airCon">Air Condition:</label>
                        <select className='mr-12 pl-2 pr-2' id="airCon" name="airCon" value={airCon} onChange={(e) => setAirCon(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option> 
                                    <option value="no">No</option>                
                        </select>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="numOfSeats">Number of Seats without Driver:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="numOfSeats" name="numOfSeats" value={numOfSeats} onChange={(e) => setNumOfSeats(e.target.value)} defaultValue={4}/>

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lugSpace">Vehicle Luggage Space:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lugSpace" name="lugSpace" value={lugSpace} onChange={(e) => setLugSpace(e.target.value)} defaultValue={20}/>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="gps">GPS :</label>
                        <select className='mr-12 pl-2 pr-2' id="gps" name="gps" value={gps} onChange={(e) => setGps(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="available">Available</option> 
                                    <option value="no">No</option>                
                        </select>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="fridge">Mini fridge :</label>
                        <select className='mr-12 pl-2 pr-2' id="fridge" name="fridge" value={fridge} onChange={(e) => setFridge(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="available">Available</option> 
                                    <option value="no">No</option>                
                        </select>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="tv">TV :</label>
                        <select className='mr-12 pl-2 pr-2' id="tv" name="tv" value={tv} onChange={(e) => setTv(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="available">Available</option> 
                                    <option value="no">No</option>                
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
                    )}
                    {category === 'lorry' && (
                        <div className='space-y-10'>
                        <h1 className="text-lg font-bold">Add Lorry Details</h1>
                        <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Car Type:</label>
                                 <select className='mr-15  pl-2 pr-2' id="carType" name="vehicleType" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
                                    <option value="lorry">Select</option>
                                    <option value="6wheels">6 Wheels</option> 
                                    <option value="10wheels">10 Wheels</option>     
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

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="lastMileage">Last Mileage:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="lastMileage" name="lastMileage" value={lastMileage} onChange={(e) => setLastMileage(e.target.value)} />
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleWeight">Vehicle Weight:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="vehicleWeight" name="vehicleWeight" value={vehicleWeight} onChange={(e) => setVehicleWeight(e.target.value)} />

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoCapacity">Cargo Capacity:</label>
                        <input className='mr-12 pl-2 pr-2' type="number" id="cargoCapacity" name="cargoCapacity" value={cargoCapacity} onChange={(e) => setCargoCapacity(e.target.value)} />

                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="cargoArea">Cargo Area:</label>
                        <select className='mr-12 pl-2 pr-2' id="cargoArea" name="cargoArea" value={cargoArea} onChange={(e) => setCargoArea(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="covered">Covered</option> 
                                    <option value="uncovered">Uncovered</option>                
                        </select>
                        </div>

                        <div>
                        <label className='ml-2 mr-2 font-semibold text-base' htmlFor="vehicleGearSys">Vehicle Transmisstion:</label>
                        <select className='mr-12 pl-2 pr-2' id="vehicleGearSys" name="vehicleGearSys" value={vehicleGearSys} onChange={(e) => setVehicleGearSys(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="auto">Auto</option> 
                                    <option value="manual">Manual</option>                
                        </select>

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
                                    <option value="available">Available</option> 
                                    <option value="no">No</option>                
                        </select>
                        
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
                    )}
                    {category === 'truck' && (
                        <div className='space-y-10'>
                        <h1 className="text-lg font-bold">Add Truck Details</h1>
                        <label className='m-2 font-semibold text-base' htmlFor="vehicleType">Car Type:</label>
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
                        
                    )}
                    
                    <div className='mt-10 flex flex-row justify-between'>
                    <div>
                    <input className='ml-2' type="checkbox" required/>
                    <label className= 'ml-3 text-sm text-red-600 font-medium' htmlFor="vehicle1">I checked the above details before adding a vehicle to the system.</label>
                    </div>
                    
                    <div>
                    <button className= "m-1 p-2 bg-black text-zinc-50 rounded-md" type="reset">Reset</button>
                    <button className= "m-1 p-2 bg-black text-zinc-50 rounded-md" type="button" onClick={handleSubmit}>Add vehicle</button>
                    </div>
                    </div>
                    </form>
                )}
            </div>
    );
};
    
export default AddVehicle;
        
