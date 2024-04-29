import { useState , useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddcustomVehicle = () => {
  
    const initialFormState= {
        category: '',
        vehicleType: '',
        vehicleRegister: '',
        vehicleModel: '',
        vehicleManuYear: '',
        fuelType: '',
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const resetForm = () => {
        setFormState(initialFormState);
        setError('');
    };

    const handleFileChange = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];
        setFormState({ ...formState, [name]: file });
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
            <h1 className="text-2xl font-bold">Add Custom Vehicle Details</h1>
              <div>
               <button className='mx-1 px-3 py-1 rounded-md bg-actionBlue text-white text-sm text-bold' onClick={() => navigate('/vehicle/add')}>Add Pre Vehicle</button>
               <button className='mx-1 px-3 py-1 rounded-md bg-actionBlue text-white text-sm text-bold' onClick={() => navigate('/')}>Dashboard</button>
              </div>
            </div>
            <form className="space-y-3 m-1 mb-10 mt-5 p-4  pad shadow-xl bg-white rounded " onSubmit={handleSubmit}>
            
                <div className="col-span-1 w-full flex flex-col mb-4 ">    
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="category">Vehicle Category:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="category" name="category" value={formState.category} onChange={handleChange} />
                </div>
                <div className="col-span-1 w-full flex flex-col mb-4 ">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleType">
                 Vehicle Type:
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5" 
            id="vehicleType" 
            type="text" 
            value={formState.vehicleType} 
            onChange={handleChange} 
            name="vehicleType" 
            />
            </div>
            
            <div className='flex flex-row '>
            <h3 className='text-s font-bold mb-5'>Performance</h3>
            <div className="border-b-2 ml-2 border-black w-full mb-6"></div>
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
                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="fuelType">Vehicle Fuel Type:</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fuelType" name="fuelType" value={formState.fuelType} onChange={handleChange} >
                                    <option value="">Select</option>
                                    <option value="petrol">Petrol</option> 
                                    <option value="diesel">Diesel</option>                
                                    <option value="electric">Electric</option>                
                                    <option value="hybrid">Hybrid</option>                
                        </select>
                        </div>
                        <div className="col-span-1 w-full flex flex-col mb-4 ">
                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleWeight">Vehicle Weight:</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="vehicleWeight" name="vehicleWeight" value={formState.vehicleWeight} onChange={handleChange} />
                        </div>
    </div>

    <div className="grid grid-cols-2 gap-x-4">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
        <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="cargoCapacity">Cargo Capacity:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="cargoCapacity" name="cargoCapacity" value={formState.cargoCapacity} onChange={handleChange} />
    </div>
    <div className="col-span-1 w-full flex flex-col mb-4 ">
        <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="trailerLength">Max trailer length:</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="trailerLength" name="trailerLength" value={formState.trailerLength} onChange={handleChange} />
    </div>
    </div>
    <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 w-full flex flex-col mb-4 ">
      <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="cargoArea">Cargo Area:</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cargoArea" name="cargoArea" value={formState.cargoArea} onChange={handleChange} >
                  <option value="">Select</option>
                  <option value="covered">Covered</option> 
                  <option value="uncovered">Uncovered</option>                
      </select>
      </div>
    </div>

    <div className='flex flex-row'> 
            <h3 className='text-s font-bold mb-5'>Features</h3>
            <div className="border-b-2 ml-2 border-black w-full mb-6"></div>
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
    <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="fridge">Mini fridge :</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fridge" name="fridge" value={formState.fridge} onChange={handleChange} >
                        <option value="">Select</option>
                        <option value="no">No</option> 
                        <option value="available">Available</option>                                                  
    </select>
    </div>  
    <div className="col-span-1 w-full flex flex-col mb-4 ">
        <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="tv">TV :</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tv" name="tv" value={formState.tv} onChange={handleChange} >
                <option value="">Select</option>
                <option value="no">No</option> 
                <option value="available">Available</option>  
            </select>
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
    <div className="col-span-1 w-full flex flex-col mb-4 ">   
    <label className='block text-gray-700 text-md font-bold mb-2' htmlFor="passengerCabin">Passenger Cabin:</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passengerCabin" name="passengerCabin" value={formState.passengerCabin} onChange={handleChange} >
                <option value="">Select</option>
                <option value="no">No</option> 
                <option value="available">Available</option>                
    </select>
    </div>
    </div>
    
    <div className='flex flex-row'>
            <h3 className='text-s font-bold mb-5'>Documentary</h3>
            <div className="border-b-2 ml-2 border-black w-full mb-6"></div>
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

    <div className="grid grid-cols-2 gap-x-4 ">
    <div className="col-span-1 w-full flex flex-col mb-4 ">
    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="vehicleInsuImage">Updated Insurance Image:</label>
    <input className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" id="vehicleInsuImage" name="vehicleInsuImage" accept="image/*" onChange={handleFileChange} />
    </div>
    </div>  




    <div className='mt-10 flex flex-row justify-between'>
                        <div>
                            <input className='m-0' type="checkbox" required/>
                            <label className= 'ml-3 p-0 text-sm text-red-600 font-medium' htmlFor="vehicle1">I checked the above details before adding a vehicle to the system.</label>
                        </div>

                        <div className='m-0 pb-1'>
                            <button className=" mx-2 bg-actionRed py-1 px-6 rounded-md text-white font-bold mt-2" onClick={resetForm}>Reset</button>
                            <button className="mx-2 bg-actionBlue py-1 px-6 rounded-md text-white font-bold mt-2" >Add vehicle</button>
                        </div>
                        
                    </div>
        {error &&<p className='mt-3 p-3 font-medium text-sm text-white bg-actionBlue rounded-md pad'>{error}</p>}
    </form>
    </div>

    )}
   </div>
  )
}

export default AddcustomVehicle