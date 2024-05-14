import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom'
import CarEditForm from '../../components/vehicle/CarEditForm'
import VanEditForm from '../../components/vehicle/VanEditForm'
import BusEditForm from '../../components/vehicle/BusEditForm'
import LorryEditForm from '../../components/vehicle/LorryEditForm'
import TruckEditForm from '../../components/vehicle/TruckEditForm'


const VehicleDetailsControl = () => {

const { id } = useParams(); 
const [data, setData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const [formData, setFormData] = useState({
  category: '',
  vehicleType: '',
  vehicleRegister: '',
  vehicleModel: '',
  fuelType: '',
  vehicleManuYear: '',
  engineCap: '',
  lastMileage: '',
  vehicleColour: '',
  vehicleGearSys: '',
  airCon: '',
  numOfSeats: '',
  lugSpace: '',
  gps: '',
  fridge: 'No',
  tv: 'No',
  vehicleWeight: '',
  cargoCapacity: '',
  cargoArea: '',
  trailerLength: '',
  passengerCabin: '',
   
});

useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/vehicle/${id}`);
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching vehicle data:', error);
        toast.error('Failed to fetch vehicle data. Please try again later.');
      } finally {
        setLoading(false);
      }
};


fetchData();
}, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Unexpected Error has occurred!</p>;
  }


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderFormComponent = () => {
    switch (formData.category) {
      case 'car':
        return <CarEditForm formData={formData} handleInputChange={handleInputChange} />;
      case 'van':
        return <VanEditForm formData={formData} handleInputChange={handleInputChange} />;
      case 'bus':
        return <BusEditForm formData={formData} handleInputChange={handleInputChange} />;
      case 'lorry':
        return <LorryEditForm formData={formData} handleInputChange={handleInputChange} />;
      case 'truck':
        return <TruckEditForm formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };


  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
  
    // Destructure formData
    const { vehicleModel, vehicleRegister } = formData;
  
    // Check if vehicleType and vehicleRegister are provided
    if (!vehicleModel) {
      toast.error('Please provide vehicle model.');
      return;
    }
  
    if (!vehicleRegister) {
      toast.error('Please provide vehicle register.');
      return;
    }
  
    // Check if vehicle type or register has changed
    const vehicleTypeChanged = vehicleModel !== data.vehicleModel;
    const vehicleRegisterChanged = vehicleRegister !== data.vehicleRegister;
  
    try {
      // If vehicle type or register has changed, perform existence check
      if (vehicleTypeChanged || vehicleRegisterChanged) {
        const response = await axios.get(`/vehicle/check?vehicleType=${vehicleModel}&vehicleRegister=${vehicleRegister}`);
        if (response.data.exists) {
          toast.error('Vehicle type and register already exist in the database.');
          return;
        }
      }
  
      // If everything is valid, proceed with the update
      if (window.confirm("Are you sure you want to update the following vehicle?")) {
        await axios.patch(`/vehicle/${id}`, formData);
        alert('Vehicle updated successfully!');
        navigate(`/vehicle/view/${id}`)
        setData(formData);
      }
    } catch (error) {

      console.error('Error updating vehicle:', error);
      toast.error('Failed to update vehicle. Please try again later.');

    }
  };
  


  return (
    <div className="space-y-3 m-1 mt-5 mb-10 p-4  pad shadow-xl bg-white rounded ">
      <ToastContainer />
      {data && (
        <>
          <form onSubmit={handleUpdateVehicle}>
            
             {renderFormComponent()} 
            <div className="flex flex-row justify-end">
            <button className="mx-2 bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2" type="submit">Update</button>
            </div> 
            
          </form>
          <div className="flex flex-row justify-start">
            <button className="mx-2 bg-actionRed py-2 px-4 rounded-md text-white text-sm font-bold mt-2" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>

  )
}

export default VehicleDetailsControl