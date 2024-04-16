
import React,{ useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { ReactToPrint } from 'react-to-print';
import { useNavigate} from 'react-router-dom'

import CarView from '../../components/vehicle/CarView'
import VanView from '../../components/vehicle/VanView'
import BusView from '../../components/vehicle/BusView'
import LorryView from '../../components/vehicle/LorryView'
import TruckView from '../../components/vehicle/TruckView'

const VehicleViewControl = () => {

    const { id } = useParams(); 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const componentRef = React.createRef();
    
    const [formData, setFormData] = useState({
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
      fridge: 'No',
      tv: 'No',
      vehicleWeight: '',
      cargoCapacity: '',
      cargoArea: '',
      trailerLength: '',
      passengerCabin: '',
      licStartDate: '',
      insEndDate: '',
      statusVehicle: ''
       
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

  const renderFormComponent = () => {
    switch (formData.category) {
      case 'car':
        return <CarView formData={formData} />;
      case 'van':
        return <VanView formData={formData} />;
      case 'bus':
        return <BusView formData={formData} />;
      case 'lorry':
        return <LorryView formData={formData} />;
      case 'truck':
        return <TruckView formData={formData} />;
      default:
        return null;
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };


  return (
    <div className="space-y-3 m-1 mt-5 mb-10 p-4  pad shadow-xl bg-white rounded">
      <ToastContainer />  
      
      {data && (
        <>
             <div ref={componentRef}>
             {renderFormComponent()} 
             </div>       
            
          <div className="flex flex-row justify-end">
            
            <ReactToPrint
                    trigger={() => (
                        <button
                            className="mx-2 bg-actionRed py-2 px-4 rounded-md text-white text-sm font-bold mt-2"
                        >
                            Generate a Report
                        </button>
                    )}
                    content={() => componentRef.current}
                />
            <button className="mx-2 bg-actionBlue py-2 px-4 rounded-md text-white text-sm font-bold mt-2" type="button" onClick={handleCancel}>Cancel</button>
                
          </div>
        </>
      )}
    </div>
  )
}

export default VehicleViewControl