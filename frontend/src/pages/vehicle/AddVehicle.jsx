import { useState , useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        licStartDate: '',
        insEndDate: '',
        fridge: 'No',
        tv: 'No',
        vehicleWeight: '',
        cargoCapacity: '',
        cargoArea: '',
        trailerLength: '',
        passengerCabin: '',
        vehicleBookImage: null,
        vehicleLicenceImage: null,
        vehicleInsuImage: null, 
        statusVehicle:'Active'   
    }
    
    const [formState, setFormState] = useState(initialFormState);
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleOnlineStatus = () => {
          setLoading(navigator.onLine === false);
        };
    
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);
    
        
        return () => {
          window.removeEventListener('online', handleOnlineStatus);
          window.removeEventListener('offline', handleOnlineStatus);
        };
      }, []);

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

        try {
          const response = await axios.post(`http://localhost:3000/api/vehicle/`, formState)
          const newVehicle = await response.data;
          
          if(!newVehicle){
           setError("Couldn't add Vehicle.Please try again.")
          }
         
          else{
          toast.success('Vehicle added successfully!');
          resetForm();
          }
   
        } catch (err) {
           setError(err.response.data.message)
        }
     }

     


    return (
     <div className='m-0 p-0'>
        {loading ? (
          <p className="flex flex-col items-center justify-center h-screen text-center">Loading... Please check your internet connection.</p>
        ) : (

        <div className="place-content-center mt-8 bg-cover bg-center">

            <div className='flex flex-row justify-between'>
            <h1 className="text-2xl font-bold">Add Vehicle Details</h1>
            <button className='px-3 py-1 rounded-md bg-actionBlue text-white text-sm text-bold' onClick={() => navigate('/vehicles')}>Dashboard</button>
            </div>

            <form className="space-y-3 m-1 mt-5 p-4  pad shadow-xl bg-white rounded " onSubmit={handleSubmit}>
            <p className="text-sm text-red-600 leading-relaxed">
            - Before adding a vehicle, please ensure you have all the necessary information at hand. This includes vehicle details such as registration number, model, manufacturing year, and more.
            </p>
            <p className="text-sm text-red-600 leading-relaxed">
            - To add a vehicle, select the appropriate category from the dropdown menu. Once selected, the system will display the corresponding form where you can enter the vehicle details. 
           </p>
           <p className="text-sm text-red-600 leading-relaxed">
            - Ensure all fields are filled accurately before submitting.
           </p>
           <p className=" text-sm text-red-600 leading-relaxed">
            - If you have any questions or require assistance while adding a vehicle, feel free to reach out to our support team. We're here to help you every step of the way.
           </p>
           <div className="col-span-1 w-full flex flex-col mt-4 mb-4 ">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="category">Select Vehicle Category:</label>
                <select id="category" name="category" value={formState.category} onChange={handleCategoryChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="bus">Bus</option>
                    <option value="lorry">Lorry</option>
                    <option value="truck">Truck</option>
                </select>
            </div>   
            </form>
            {formState.category && (
                <form className="mx-1 mt-5 mb-10 px-8 pt-6 pb-8 shadow-xl bg-white rounded pad" onSubmit={handleSubmit}>
                    
                    {/* Render appropriate form based on selected category */}
                    {formState.category === 'car' && <CarForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'van' && <VanForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'bus' && <BusForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'lorry' && <LorryForm formState={formState} setFormState={setFormState} />}
                    {formState.category === 'truck' && <TruckForm formState={formState} setFormState={setFormState} />}

                    <div className='mt-10 flex flex-row justify-between'>
                        <div>
                            <input className='m-0' type="checkbox" required/>
                            <label className= 'ml-3 p-0 text-sm text-red-600 font-medium' htmlFor="vehicle1">I checked the above details before adding a vehicle to the system.</label>
                        </div>

                        <div className='m-0 pb-1'>
                            <button className=" mx-2 bg-actionRed py-2 px-6 rounded-md text-white font-bold mt-2" onClick={resetForm}>Reset</button>
                            <button className="mx-2 bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2" >Add vehicle</button>
                        </div>
                        
                    </div>
                    {error &&<p className='mt-3 p-3 font-medium text-sm text-white bg-actionBlue rounded-md pad'>{error}</p>}
                </form>      
            )}

                <ToastContainer />

        </div>
        )}
     </div>
    );
};

export default AddVehicle;