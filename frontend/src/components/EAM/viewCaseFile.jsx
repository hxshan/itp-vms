import  { useRef } from 'react';
import axios  from 'axios';
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import ReactToPrint from 'react-to-print';



const ViewCaseFile = () => {


  const [caseFile, setCaseFile] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const cancel = () => {
    navigate('/emergency');
  };

  useEffect (() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/caseFiles/${id}`)
      .then((responce) => {
        setCaseFile(responce.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error fetching case file', error);
      });

  }, [id]);

  const ref = useRef(null);

 

  return(
    
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
     <BackButton />

      <div className="container mx-auto py-8">
        <div className='className="bg-white rounded-lg shadow-lg p-8"'>
        { loading ? (
          <Spinner />
        ) : (

         
        
        <div className="p-8">
           <div ref={ref} className='mx-10 my-5'>
          
              <h1 className="text-3xl font-semibold mb-8">Case File Details</h1>

                <div className="flex justify-between mb-8">
                  <div>
                    <p className="text-lg font-semibold mb-2">Case File ID:  {caseFile._id } </p>
                    <p className="text-lg font-semibold mb-2">Case Title: {caseFile.caseTitle} </p>
                    <p className="text-lg font-semibold mb-2">Location: {caseFile.location} </p>
                    <p className="text-lg font-semibold mb-2">Time of Incident: {new Date (caseFile.timeOfIncident).toLocaleDateString} </p>
                    </div>
                  <div>
                  <p className="text-lg font-semibold mb-2">Licence Plate: {caseFile.licencePlate} </p>
                    <p className="text-lg font-semibold mb-2">Current Condition: {caseFile.currentCondition} </p>
                    
                   
                    <p className="text-lg font-semibold mb-2">Status: {caseFile.status} </p>
                  </div>

                  
                </div>

          

          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Driver Details</h1>
              
                
                  <p className="text-lg font-semibold mb-2">Driver ID: {caseFile.driverId} </p>
                  <p className="text-lg font-semibold mb-2">Driver Name: {caseFile.driverName} </p>
                  <p className="text-lg font-semibold mb-2">Deiver Licence Number: {caseFile.driverLicenceNumber} </p>
                
              
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Incident Details</h1>
              
                  <p className="text-lg font-semibold mb-2">Severity: {caseFile.severity} </p>
                  <p className="text-lg font-semibold mb-2">Passenger Count: {caseFile.passengerCount} </p>
                  <p className="text-lg font-semibold mb-2">Incident Description: {caseFile.incidentDescription} </p>
                  <p className="text-lg font-semibold mb-2">Injures: {caseFile.injuriesDiscription} </p>
                  <p className="text-lg font-semibold mb-2">Licence Number: {caseFile.licenceNumber} </p>
                
              
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Emergency Details</h1>
              
                  <p className="text-lg font-semibold mb-2">Emergency Services Contacted: {caseFile.emergencyServicesContacted} </p>
                  <p className="text-lg font-semibold mb-2">Emergency Services Response Time: {caseFile.emergencyServicesResponseTime} </p>
                  <p className="text-lg font-semibold mb-2">Emergency Services Actions Taken: {caseFile.emergencyServicesActionsTaken} </p>
                 
                
              
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Witness Information / police Report</h1>
              
                  <p className="text-lg font-semibold mb-2">Witnesses Contact Information: {caseFile.witnessesContactInformation} </p>
                  <p className="text-lg font-semibold mb-2">Witnesses Statement: {caseFile.witnessesStatement} </p>
                  <p className="text-lg font-semibold mb-2">Photographic Evidence: {caseFile.photographicEvidence} </p>
                  <p className="text-lg font-semibold mb-2">Police Report: {caseFile.policeReport} </p>
               
                
              
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Insurance Details</h1>
              
                  <p className="text-lg font-semibold mb-2">Insurance Companies ContactInfo: {caseFile.insuranceCompaniesContactInfo} </p>
                  <p className="text-lg font-semibold mb-2">Insurance Status: {caseFile.insuranceStatus} </p>
                  <p className="text-lg font-semibold mb-2">Emergency Services Actions Taken: {caseFile.emergencyServicesActionsTaken} </p>
                 
                
              
          </div>

          </div>
          <div className='mr-[20px] mt-10 flex justify-between items-baseline'>
            < Link to={`/emergency/edit/${caseFile._id}`} className='px-4 py-2 bg-[#D4D800] text-white rounded-md mr-2'>Edit</Link>

            <ReactToPrint
              bodyClass='print-case-file'
              content={() => ref.current}
              trigger={() => (
                <button className='px-4 py-2 text-white bg-actionBlue hover:bg-gray-800 focus:outline-none rounded-md mr-4'>Print</button>
              )}
              />
           
            <button className='px-4 py-2 bg-[#A90000] text-white rounded-md' onClick={cancel}>Cancel</button>
          </div>
        </div>
        )}
      </div>
      
    </div>
  </div>
  );
};




export default ViewCaseFile;
   


