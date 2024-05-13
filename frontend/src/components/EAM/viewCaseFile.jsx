import  { useRef } from 'react';
import axios from '@/api/axios';
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import ReactToPrint from 'react-to-print';
import useAxios from '@/hooks/useAxios';



const ViewCaseFile = () => {


  
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [CaseFiles, error, loading, axiosDataFetch] = useAxios();



  const cancel = () => {
    navigate('/emergency');
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
  }, []);

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

  const ref = useRef(null);

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
    <BackButton />
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="p-8" ref={ref}>
          <h1 className="text-3xl font-semibold mb-8">Case File Details</h1>
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-lg font-semibold mb-2">Case Type: {CaseFiles.caseType}</p>
              <p className="text-lg font-semibold mb-2">Case File ID: {CaseFiles._id}</p>
              <p className="text-lg font-semibold mb-2">Case Title: {CaseFiles.caseTitle}</p>
              <p className="text-lg font-semibold mb-2">Location: {CaseFiles.location}</p>
              <p className="text-lg font-semibold mb-2">Time of Incident: {CaseFiles.timeOfIncident.split('T')[0]}</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Licence Plate: {CaseFiles.licencePlate}</p>
              <p className="text-lg font-semibold mb-2">Current Condition: {CaseFiles.currentCondition}</p>
              <p className="text-lg font-semibold mb-2">Status: {CaseFiles.status}</p>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Driver Details</h1>
            <p className="text-lg font-semibold mb-2">Driver Name: {CaseFiles.driver?.firstName||'N/A'}</p>
            <p className="text-lg font-semibold mb-2">Driver Licence Number: {CaseFiles.driver?.licenceNumber||'N/A'}</p>
          </div>
          <div className="p-8">
              <h1 className="text-3xl font-semibold mb-8">Hire Details</h1>
              <p className="text-lg font-semibold mb-2">Hire ID: {CaseFiles.hire?.hireId || 'N/A'}</p>
              <p className="text-lg font-semibold mb-2">Start Date: {CaseFiles.hire?.startDate || 'N/A'}</p>
              <p className="text-lg font-semibold mb-2">End Date: {CaseFiles.hire?.endDate || 'N/A'}</p>
            </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Incident Details</h1>
            <p className="text-lg font-semibold mb-2">Severity: {CaseFiles.severity}</p>
            <p className="text-lg font-semibold mb-2">Passenger Count: {CaseFiles.passengerCount}</p>
            <p className="text-lg font-semibold mb-2">Incident Description: {CaseFiles.incidentDescription}</p>
            <p className="text-lg font-semibold mb-2">Injures: {CaseFiles.injuriesDiscription}</p>
            <p className="text-lg font-semibold mb-2">Licence Number: {CaseFiles.licenceNumber}</p>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Emergency Details</h1>
            <p className="text-lg font-semibold mb-2">Emergency Services Contacted: {CaseFiles.emergencyServicesContacted}</p>
            <p className="text-lg font-semibold mb-2">Emergency Services Response Time: {CaseFiles.emergencyServicesResponseTime}</p>
            <p className="text-lg font-semibold mb-2">Emergency Services Actions Taken: {CaseFiles.emergencyServicesActionsTaken}</p>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Witness Information / Police Report</h1>
            <p className="text-lg font-semibold mb-2">Witnesses Contact Information: {CaseFiles.witnessesContactInformation}</p>
            <p className="text-lg font-semibold mb-2">Witnesses Statement: {CaseFiles.witnessesStatement}</p>
            <p className="text-lg font-semibold mb-2">Photographic Evidence: {CaseFiles.photographicEvidence}</p>
            <p className="text-lg font-semibold mb-2">Police Report: {CaseFiles.policeReport}</p>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-semibold mb-8">Insurance Details</h1>
            <p className="text-lg font-semibold mb-2">Insurance Companies ContactInfo: {CaseFiles.insuranceCompaniesContactInfo}</p>
            <p className="text-lg font-semibold mb-2">Insurance Status: {CaseFiles.insuranceStatus}</p>
            <p className="text-lg font-semibold mb-2">Emergency Services Actions Taken: {CaseFiles.emergencyServicesActionsTaken}</p>
          </div>
        </div>
        <div className="mr-[20px] mt-10 flex justify-between items-baseline">
          <Link to={`/emergency/edit/${CaseFiles._id}`} className="px-4 py-2 bg-[#D4D800] text-white rounded-md mr-2">
            Edit
          </Link>
          <ReactToPrint
            bodyClass="print-case-file"
            content={() => ref.current}
            trigger={() => (
              <button className="px-4 py-2 text-white bg-actionBlue hover:bg-gray-800 focus:outline-none rounded-md mr-4">
                Print
              </button>
            )}
          />
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




export default ViewCaseFile;
   


