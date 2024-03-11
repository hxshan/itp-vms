import React, { useState } from 'react';

const AddVehicle = () => {
    const [category, setCategory] = useState('');

    const [carType, setCarType] = useState('');
    const [carRegister, setCarRegister] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carManuYear, setCarManuYear] = useState('');
    const [engineCap, setEngineCap] = useState('');
    const [carColour, setCarColour] = useState('');
    const [carGearSys, setCarGearSys] = useState('');
    const [airCon, setAirCon] = useState('');
    const [numOfSeats, setNumOfSeats] = useState('');
    const [lugSpace, setLugSpace] = useState('');
    const [gps, setGps] = useState('');
    const [licEndDate, setLicEndDate] = useState('');
    const [insEndDate, setInsEndDate] = useState('');
   
    
    const [vanModel, setVanModel] = useState('');
    const [vanMake, setVanMake] = useState('');
    const [vanYear, setVanYear] = useState('');


    const [busCapacity, setBusCapacity] = useState('');
    const [busMake, setBusMake] = useState('');
    const [busYear, setBusYear] = useState('');

    const [lorryWeight, setLorryWeight] = useState('');
    const [lorryMake, setLorryMake] = useState('');
    const [lorryYear, setLorryYear] = useState('');

    const [carBookImage, setCarBookImage] = useState(null);
    const [carLicenceImage, setCarLicenceImage] = useState(null);
    const [carInsuImage, setCarInsuImage] = useState(null);

    const [vanDocImage, setvanDocImage] = useState(null);
    const [busImage, setBusImage] = useState(null);
    const [lorryImage, setLorryImage] = useState(null);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    
    const handleCarBookImageChange = (event) => {
        const file = event.target.files[0];
        setCarBookImage(file);
    };
    const handleCarLicenceImageImageChange = (event) => {
        const file = event.target.files[0];
        setCarLicenceImage(file);
    };
    const handleCarInsuImageChange = (event) => {
        const file = event.target.files[0];
        setCarInsuImage(file);
    };



    const handleVarDocImageChange = (event) => {
        const file = event.target.files[0];
        setvanDocImage(file);
    };




    const handleBusImageChange = (event) => {
        const file = event.target.files[0];
        setBusImage(file);
    };




    const handleLorryImageChange = (event) => {
        const file = event.target.files[0];
        setLorryImage(file);
    };



    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('category', category);

        switch (category) {
            case 'car':
                formData.append('carType', carType);
                formData.append('carRegister', carRegister);
                formData.append('carModel', carModel);
                formData.append('carManuYear', carManuYear);
                formData.append('engineCap', engineCap);
                formData.append('carColour', carColour);
                formData.append('carGearSys', carGearSys);
                formData.append('airCon', airCon);
                formData.append('numOfSeats', numOfSeats);
                formData.append('lugSpace', lugSpace);
                formData.append('gps', gps);
                formData.append('licEndDate', licEndDate);
                formData.append('insEndDate', insEndDate);
                formData.append('carBookImage', carBookImage);
                formData.append('carLicenceImage', carLicenceImage);
                formData.append('carInsuImage', carInsuImage);
                break;
            case 'van':
                formData.append('vanModel', vanModel);
                formData.append('vanMake', vanMake);
                formData.append('vanYear', vanYear);
                formData.append('vanDocImage', vanDocImage);
                break;    
            case 'bus':
                formData.append('busCapacity', busCapacity);
                formData.append('busMake', busMake);
                formData.append('busYear', busYear);
                formData.append('busImage', busImage);
                break;
            case 'lorry':
                formData.append('lorryWeight', lorryWeight);
                formData.append('lorryMake', lorryMake);
                formData.append('lorryYear', lorryYear);
                formData.append('lorryImage', lorryImage);
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
                    <label className='m-2 font-semibold text-base' htmlFor="category">Select Category:</label>
                         <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                            <option value="">Select</option>
                            <option value="car">Car</option>
                            <option value="van">Van</option>
                            <option value="bus">Bus</option>
                            <option value="lorry">Lorry</option>
                         </select>
                </form>
                {category && (
                <form className=" m-3 p-3  bg-slate-200 rounded-md pad">
                    {category === 'car' && (
                        <div className='space-y-10'>
                            <h1 className="text-lg font-bold">Add Car Details</h1>
                            <label className='m-2 font-semibold text-base' htmlFor="carType">Vehicle Transmisstion:</label>
                                     <select className='mr-15  pl-2 pr-2' id="carType" name="carType" value={carType} onChange={(e) => setCarType(e.target.value)} >
                                        <option value="car">Select</option>
                                        <option value="sadan">Sadan</option> 
                                        <option value="hashback">Hashback</option> 
                                        <option value="wagon">Wagon</option>    
                                      </select>
                            <div className='flex flex-row'>
                            <label className='ml-2 mr-1 font-semibold text-base' htmlFor="carRegister">Register Number:</label>
                            <input className='mr-8 pl-2 pr-2 ' type="text" id="carRegister" name="carRegister" value={carRegister} onChange={(e) => setCarRegister(e.target.value)} />

                            <label className='ml-2 mr-1 font-semibold text-base' htmlFor="carModel">Model Number:</label>
                            <input className='mr-8 pl-2 pr-2 ' type="text" id="carModel" name="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} />

                            <label className='ml-2 mr-1 font-semibold text-base' htmlFor="carManuYear">Year of Manufactured:</label>
                            <input className='mr-8 pl-2 pr-2' type="text" id="carManuYear" name="carManuYear" value={carManuYear} onChange={(e) => setCarManuYear(e.target.value)} />
                            </div>  

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="engineCap">Engine Capacity:</label>
                            <input className='mr-12 pl-2 pr-2' type="number" id="engineCap" name="engineCap" value={engineCap} onChange={(e) => setEngineCap(e.target.value)} defaultValue={1000} placeholder='   0cc'/>

                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="carColour">Colour of Vehicle:</label>
                            <input className='mr-12 pl-2 pr-2' type="tecarColourxt" id="carColour" name="carColour" value={carColour} onChange={(e) => setCarColour(e.target.value)} />
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="carGearSys">Vehicle Transmisstion:</label>
                            <select className='mr-12 pl-2 pr-2' id="carGearSys" name="carGearSys" value={carGearSys} onChange={(e) => setCarGearSys(e.target.value)}>
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
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="carBookImage">Vehicle Book Image:</label>
                            <input className='mr-12' type="file" id="carBookImage" name="carBookImage" accept="image/*" onChange={handleCarBookImageChange} />
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="carLicenceImage">Updated Licence Image:</label>
                            <input className='mr-12' type="file" id="carLicenceImage" name="carLicenceImage" accept="image/*" onChange={handleCarLicenceImageImageChange} />
                            </div>

                            <div>
                            <label className='ml-2 mr-2 font-semibold text-base' htmlFor="carInsuImage">Updated Insurance Image:</label>
                            <input className='mr-12' type="file" id="carInsuImage" name="carInsuImage" accept="image/*" onChange={handleCarInsuImageChange} />
                            </div>

                        </div>
                    )}
                    {category === 'van' && (
                        <div>
                            <label htmlFor="vanModel">Van Model:</label>
                            <input type="text" id="vanModel" name="vanModel" value={vanModel} onChange={(e) => setVanModel(e.target.value)} />
                            <label htmlFor="vanMake">Van Make:</label>
                            <input type="text" id="vanMake" name="vanMake" value={vanMake} onChange={(e) => setVanMake(e.target.value)} />
                            <label htmlFor="vanYear">Van Year:</label>
                            <input type="text" id="vanYear" name="vanYear" value={vanYear} onChange={(e) => setVanYear(e.target.value)} />
                            <label htmlFor="vanDocImage">Van Documents Image:</label>
                            <input type="file" id="vanDocImage" name="vanDocImage" accept="image/*" onChange={handleVarDocImageChange} />
                        </div>
                    )}
                    {category === 'bus' && (
                        <div>
                            <label htmlFor="busCapacity">Bus Capacity:</label>
                            <input type="number" id="busCapacity" name="busCapacity" value={busCapacity} onChange={(e) => setBusCapacity(e.target.value)} />
                            <label htmlFor="busMake">Bus Make:</label>
                            <input type="text" id="busMake" name="busMake" value={busMake} onChange={(e) => setBusMake(e.target.value)} />
                            <label htmlFor="busYear">Bus Year:</label>
                            <input type="text" id="busYear" name="busYear" value={busYear} onChange={(e) => setBusYear(e.target.value)} />
                            <label htmlFor="busImage">Bus Image:</label>
                            <input type="file" id="busImage" name="busImage" accept="image/*" onChange={handleBusImageChange} />
                        </div>
                    )}
                    {category === 'lorry' && (
                        <div>
                            <label htmlFor="lorryWeight">Lorry Weight:</label>
                            <input type="number" id="lorryWeight" name="lorryWeight" value={lorryWeight} onChange={(e) => setLorryWeight(e.target.value)} />
                            <label htmlFor="lorryMake">Lorry Make:</label>
                            <input type="text" id="lorryMake" name="lorryMake" value={lorryMake} onChange={(e) => setLorryMake(e.target.value)} />
                            <label htmlFor="lorryYear">Lorry Year:</label>
                            <input type="text" id="lorryYear" name="lorryYear" value={lorryYear} onChange={(e) => setLorryYear(e.target.value)} />
                            <label htmlFor="lorryImage">Lorry Image:</label>
                            <input type="file" id="lorryImage" name="lorryImage" accept="image/*" onChange={handleLorryImageChange} />
                        </div>
                    )}
                    
                    <div className='mt-10 flex flex-row justify-between'>
                    <div>
                    <input className='ml-2' type="checkbox" required/>
                    <label className= 'ml-3 text-sm text-red-600 font-medium' for="vehicle1">I checked the above details before adding a vehicle to the system.</label>
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
        
