
import axios from '@/api/axios';
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';

import useAxios from '@/hooks/useAxios';
import Swal from 'sweetalert2';



const ViewAlert = () => {

const [alertDetails, setalertDetails] = useState({
    driver:'',
    hire:'',
    caseFile:'',
    vehicle:''
})
  
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [CaseFiles, error, loading, axiosDataFetch] = useAxios();

   const [alertData, alertError, alertLoading, alertAxiosFetch] = useAxios();

  const cancel = () => {
    navigate('/emergency/alertTable');
  };

  const fetchCaseFile = () => {
    axiosDataFetch({
      axiosInstance: axios,
     method: "GET",
     url: `/caseFiles/driverAlerts/${id}`,
    })
  };


  useEffect(() => {
    fetchCaseFile();
    console.log(fetchCaseFile)
  }, []);

  useEffect(() => {
    if (CaseFiles && CaseFiles.driver && CaseFiles.hire && CaseFiles.vehicle) {
      setalertDetails({
        driver: CaseFiles.driver._id,
        vehicle: CaseFiles.vehicle,
        hire: CaseFiles.hire._id,
        caseFile: CaseFiles._id,
      });
    }
  }, [CaseFiles]);

  // useEffect (() => {
  //   setLoading(true);
  //   axios
  //     .get(`http://localhost:3000/api/caseFiles/${id}`)
  //     .then((responce) => {
  //       setCaseFile(responce.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log('Error fetching case file', error);
  //     });

  // }, []);
  const handleSend = async (e) => {

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to send the alert?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!'
    });
        
    if(result.isConfirmed){
        e.preventDefault();
       
        alertAxiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/alert/send',
            requestConfig:{
                data:{
                    ...alertDetails
                } 
            }

        });
        console.log(alertDetails)
        console.log("successfuly created");
        Swal.fire({
            icon: 'success',
            title: 'Alert Sent Successfully',
            showConfirmButton: false,
            timer: 1500
          }); 
        
    
    
  }else(error) =>{
    console.error('Error sending alert:', error);

  }
};
 

 if(loading){
  return(
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <Spinner />
  </div>
  )
 }
 if(CaseFiles && Object.keys(CaseFiles).length !== 0){
  console.log('CaseFiles in JSX:', CaseFiles);
  return(
    
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-8">Case File Details</h1>
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-lg font-semibold mb-2">Case Type: {CaseFiles.caseType}</p>
             
              <p className="text-lg font-semibold mb-2">Case Title: {CaseFiles.caseTitle}</p>
              <p className="text-lg font-semibold mb-2">Location: {CaseFiles.location}</p>
              <p className="text-lg font-semibold mb-2">Time of Incident: {CaseFiles.timeOfIncident.split('T')[0]}</p>
            </div>
            <div>
            <p className="text-lg font-semibold mb-2">Vehicle Type: {CaseFiles.hire?.vehicleType}</p>
              <p className="text-lg font-semibold mb-2">Licence Plate: {CaseFiles.licencePlate}</p>
             
              <p className="text-lg font-semibold mb-2">Status: {CaseFiles.status}</p>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Driver Details</h1>
            <p className="text-lg font-semibold mb-2">Driver Name: {CaseFiles.driver?.firstName  ||'N/A'} {CaseFiles.driver?.lastName  ||'N/A'}</p>
            <p className="text-lg font-semibold mb-2">Driver Licence Number: {CaseFiles.driver?.licenceNumber||'N/A'}</p>
          </div>
          <div className="p-8">
              <h1 className="text-3xl font-semibold mb-8">Hire Details</h1>
              <p className="text-lg font-semibold mb-2">Customer name: {CaseFiles.hire?.cusName || 'N/A'}</p>
              <p className="text-lg font-semibold mb-2">Customer Mobile: {CaseFiles.hire?.cusMobile || 'N/A'}</p>
              <p className="text-lg font-semibold mb-2">Start Date: {new Date(CaseFiles.hire?.startDate).toLocaleDateString() || 'N/A'}</p>
              <p className="text-lg font-semibold mb-2">End Date: {new Date(CaseFiles.hire?.endDate).toLocaleDateString() || 'N/A'}</p>
            </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Incident Details</h1>
            <p className="text-lg font-semibold mb-2">Severity: {CaseFiles.severity}</p>
            <p className="text-lg font-semibold mb-2">Passenger Count: {CaseFiles.passengerCount}</p>
            <p className="text-lg font-semibold mb-2">Incident Description: {CaseFiles.incidentDescription}</p>
            
          </div>
        
         
          
        </div>
        <div className="mr-[20px] mt-10 flex justify-between items-baseline">
          <button className="px-4 py-2 bg-[#D4D800] text-white rounded-md mr-2" onClick={handleSend}>
            Send Alert
          </button>
         
         
          <button className="px-4 py-2 bg-[#A90000] text-white rounded-md" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
};




export default ViewAlert;
   


