
import React,{ useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { ReactToPrint } from 'react-to-print';
import { useNavigate} from 'react-router-dom'
import { ClockLoader } from "react-spinners";


import CarView from '../../components/vehicle/CarView'
import VanView from '../../components/vehicle/VanView'
import BusView from '../../components/vehicle/BusView'
import LorryView from '../../components/vehicle/LorryView'
import TruckView from '../../components/vehicle/TruckView'

const VehicleViewControl = () => {

    const { id } = useParams(); 
    const [data, setData] = useState(null);
    const [available, setAvailable] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const componentRef = React.createRef();
    const [searchTerm, setSearchTerm] = useState('');
   
    
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



  if (loading) {
    return (
      <div className="p-10 w-full flex items-center justify-center h-full bg-white">
        <ClockLoader
            color="#36d7b7"
            height={50}
            width={10}
          />
      </div>
    )
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

  const startDateString = '2024-05-07T00:00:00.000Z';

  const startDate = new Date(startDateString);

  const formattedStartDate = startDate.toLocaleDateString();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); 
  };


  let filteredAvailable = [];
  if (available) {
    filteredAvailable = available.filter((availability) => {
      
      if (searchTerm) {
        
        const searchDate = new Date(searchTerm);
       
        const startDate = new Date(availability.unavailableStartDate);
        const endDate = new Date(availability.unavailableEndDate);
       
        return (
          availability.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (startDate <= searchDate && searchDate <= endDate)
        );
      } else {
       
        return availability.status.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  }

  const isDateInRange = (startDate, endDate) => {
    const currentDate = new Date(); // Current date in local time zone
    console.log("Current date:", currentDate);
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
    console.log("Is in range:", startDate <= currentDate && currentDate <= endDate);
    return startDate <= currentDate && currentDate <= endDate;
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
        <div className="p-10 w-full flex items-center justify-center h-full bg-white">
          <ClockLoader color="#36d7b7" height={50} width={10} />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className='flex justify-end'>
            <input
              type="text"
              placeholder="Search by status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 2"
            />
            <input
              type="date"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3 mr-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline end-0 2"
            />
          </div>
          {filteredAvailable.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAvailable.map((availability, index) => (
          <div key={index} className={`p-4 rounded-md shadow-md ${isDateInRange(new Date(availability.unavailableStartDate), new Date(availability.unavailableEndDate)) ? 'bg-green-400' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-2">{availability.status}</h2>
            <p className="text-sm font-semibold text-gray-700 mb-4">Unavailable Start Date:<p className="text-lg font-bold text-black"> {formatDate(availability.unavailableStartDate)} </p></p>
            <p className="text-sm font-semibold text-gray-700 mb-4">Unavailable End Date: <p className="text-lg font-bold text-black"> {formatDate(availability.unavailableEndDate)} </p></p>
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
           <button className="mx-2 bg-actionBlue py-2 px-4 rounded-md text-white text-sm font-bold mt-2" onClick={() => navigate(`/vehicle/edit/${id}`)}>Update</button>
            <button className="mx-2 bg-actionBlue py-2 px-4 rounded-md text-white text-sm font-bold mt-2" type="button"  onClick={() => navigate(`/vehicle`)}>Cancel</button>    
          </div>
        </>
      )}
     

  </div>

  )

}

export default VehicleViewControl