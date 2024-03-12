import React, { useState } from 'react';
import {CarForm} from '../../components/vehicle/'
import {VanForm} from '../../components/vehicle/'
import {BusForm} from '../../components/vehicle/'
import {LorryForm} from '../../components/vehicle/'
import {TruckForm} from '../../components/vehicle/'

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
                        <CarForm />
                    )}
                    {category === 'van' && (
                        <VanForm />
                    )}
                    {category === 'bus' && (
                        <BusForm />
                    )}
                    {category === 'lorry' && (
                        <LorryForm />
                    )}
                    {category === 'truck' && (
                        <TruckForm />
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
        
