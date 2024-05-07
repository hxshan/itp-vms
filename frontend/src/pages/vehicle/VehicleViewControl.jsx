
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
    const [available, setAvailable] = useState(null);
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

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/vehicle/availability/${id}`);
          setAvailable(response.data);
        } catch (error) {
          setError(error);
          console.error('Error getting data', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);


  const startDateString = '2024-05-07T00:00:00.000Z';

  const startDate = new Date(startDateString);

  const formattedStartDate = startDate.toLocaleDateString();


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

    <div className='space-y-8 p-8 mb-5'>

    <h1 className="text-xl font-bold">Availability Schedule</h1> 

    <div>
      {loading ? (
          <div>Loading...</div>
      ) : error ? (
          <div>Error: {error.message}</div>
      ) : (
       <>
      {available && available.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {available
            .filter(availability => new Date(availability.unavailableEndDate) >= new Date())
            .map((availability, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-2">{availability.status}</h2>
                <p>Unavailable Start Date: {new Date(availability.unavailableStartDate).toLocaleDateString()}</p>
                <p>Unavailable End Date: {new Date(availability.unavailableEndDate).toLocaleDateString()}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>No availability data available.</p>
      )}
     </>
      )}
     </div>
      
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