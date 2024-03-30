import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CarForm } from '../../components/vehicle/';
import { VanForm } from '../../components/vehicle/';
import { BusForm } from '../../components/vehicle/';
import { LorryForm } from '../../components/vehicle/';
import { TruckForm } from '../../components/vehicle/';

const AddVehicle = () => {
    const initialFormState= {
        category: '',
        vehicleType: '',
        vehicleRegister: '',
        vehicleModel: '',
        vehicleManuYear: '',
        engineCap: '',
        lastMileage: '',
        vehicleColour: '',
        vehicleGearSys: '',
        airCon: '',
        numOfSeats: '',
        lugSpace: '',
        gps: '',
        licEndDate: '',
        insEndDate: '',
        fridge: '',
        tv: '',
        vehicleWeight: '',
        cargoCapacity: '',
        cargoArea: '',
        trailerLength: '',
        passengerCabin: '',
        vehicleBookImage: null,
        vehicleLicenceImage: null,
        vehicleInsuImage: null
    }
    
    const [formState, setFormState] = useState(initialFormState);
    const [error,setError] = useState('')
    const navigate = useNavigate;

    const handleCategoryChange = (event) => {
        setFormState({ ...formState,initialFormState, category: event.target.value });
    };

    const resetForm = () => {
        setFormState(initialFormState);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        console.log(formState)

        try {
          const response = await axios.post(`http://165.22.213.22:3000/api/vehicle/`, formState)
          const newVehicle = await response.data;
          console.log(newVehicle);
          
          if(!newVehicle){
           setError("Couldn't register user.Please try again.")
          }
         
          navigate('/add_vehicle');
   
        } catch (err) {
           setError(err.response.data.message)
        }
     }

    return (
        <div className="place-content-center m-8 bg-cover bg-center bg-white">
            <h1 className="text-lg font-bold">Add Vehicle Details</h1>
            

            <form className="space-y-2 m-3 p-3  bg-slate-200 rounded-md pad" onSubmit={handleSubmit}>
            <p class="text-sm text-red-600 leading-relaxed">
            - Before adding a vehicle, please ensure you have all the necessary information at hand. This includes vehicle details such as registration number, model, manufacturing year, and more.
            </p>
            <p class="text-sm text-red-600 leading-relaxed">
            - To add a vehicle, select the appropriate category from the dropdown menu. Once selected, the system will display the corresponding form where you can enter the vehicle details. 
           </p>
           <p class="text-sm text-red-600 leading-relaxed">
            - Ensure all fields are filled accurately before submitting.
           </p>
           <p class="text-sm text-red-600 leading-relaxed">
            - If you have any questions or require assistance while adding a vehicle, feel free to reach out to our support team. We're here to help you every step of the way.
           </p>
                <label className='m-2 font-semibold text-base' htmlFor="category">Select Vehicle Category:</label>
                <select id="category" name="category" value={formState.category} onChange={handleCategoryChange}>
                    <option value="">Select</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="bus">Bus</option>
                    <option value="lorry">Lorry</option>
                    <option value="truck">Truck</option>
                </select>
            </form>
            {formState.category && (
                <form className="m-3 p-3  bg-slate-200 rounded-md pad" onSubmit={handleSubmit}>
                    {error &&<p className='mb-3 p-3 font-medium text-sm text-black bg-red-400 rounded-md pad'>{error}</p>}
                    {/* Render appropriate form based on selected category */}
                    {formState.category === 'car' && <CarForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'van' && <VanForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'bus' && <BusForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'lorry' && <LorryForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'truck' && <TruckForm formState={formState} setFormState={setFormState} />}

                    <div className='mt-10 flex flex-row justify-between'>
                        <div>
                            <input className='ml-2' type="checkbox" required/>
                            <label className= 'ml-3 text-sm text-red-600 font-medium' htmlFor="vehicle1">I checked the above details before adding a vehicle to the system.</label>
                        </div>

                        <div>
                            <button className= "m-1 p-2 bg-black text-zinc-50 rounded-md" onClick={resetForm}>Reset</button>
                            <button className= "m-1 p-2 bg-black text-zinc-50 rounded-md" type="submit" >Add vehicle</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddVehicle;