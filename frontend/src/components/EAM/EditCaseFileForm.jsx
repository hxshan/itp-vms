import { useEffect } from "react";
import { useState } from "react";
import axios from "@/api/axios";

import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/EAM/Spinner";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCaseFileForm = () => {
  const [caseTitle, setCaseTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfIncident, setTimeOfIncident] = useState("");
  const [licencePlate, setLicencePlate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [passengerCount, setPassengerCount] = useState();
  const [status, setStatus] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [injuriesDiscription, setInjuriesDiscription] = useState("");
  
  
  const [witnessesStatement, setWitnessesStatement] = useState("");
  const [emergencyServicesContacted, setEmergencyServicesContacted] =
    useState("");
  const [emergencyServicesResponseTime, setEmergencyServicesResponseTime] =
    useState("");
  const [emergencyServicesActionsTaken, setEmergencyServicesActionsTaken] =
    useState("");
  const [photographicEvidence, setPhotographicEvidence] = useState("");
  const [insuranceCompaniesContactInfo, setInsuranceCompaniesContactInfo] =
    useState("");
  const [insuranceStatus, setInsuranceStatus] = useState("");
  const [policeReport, setPoliceReport] = useState("");
  const [isDriverFault, setIsDriverFault] = useState("");



  const [driversData, driverError, isLoading, axiosFetch] = useAxios();
  const [CaseFiles, error, Loading, axiosDataFetch] = useAxios();

  const [driver, setDriver] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");
  const [step, setStep] = useState(1);
  

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDrivers = () => {
    axiosFetch({
      axiosInstance: axios,
     method: "GET",
     url: '/user/drivers',
    })

  }

  const fetchCaseFiles = () => {
    axiosDataFetch({
      axiosInstance: axios,
     method: "GET",
     url: `/caseFiles/driverAlerts/${id}`,
    })

  }

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  // /useEffect(() => {
  //   setLoading(true);
  //   axios.get(`http://localhost:3000/api/caseFiles/${id}`).then((response) => {
  //     const data = response.data;
  //     setCaseTitle(data.caseTitle);
  //     setLocation(data.location);
  //     setTimeOfIncident(data.timeOfIncident);
  //     setLicencePlate(data.licencePlate);
  //     setCurrentCondition(data.currentCondition);
  //     setPassengerCount(data.passengerCount);
  //     setStatus(data.status);
  //     setIncidentDescription(data.incidentDescription);
  //     setSeverity(data.severity);
  //     setInjuriesDiscription(data.injuriesDiscription);
  //     setDriverLicenceNumber(data.driverLicenceNumber);
  //     setDriverId(data.driverId);
  //     setDriverName(data.driverName);
  //     setWitnessesContactInformation(data.witnessesContactInformation);
  //     setWitnessesStatement(data.witnessesStatement);
  //     setEmergencyServicesContacted(data.emergencyServicesContacted);
  //     setEmergencyServicesResponseTime(data.emergencyServicesResponseTime);
  //     setEmergencyServicesActionsTaken(data.emergencyServicesActionsTaken);
  //     setInsuranceCompaniesContactInfo(data.insuranceCompaniesContactInfo);
  //     setInsuranceStatus(data.insuranceStatus);
  //     setPoliceReport(data.policeReport);
  //     setIsDriverFault(data.isDriverFault);
  //     setLoading(false);
  //   });
  // }, [id]);

  useEffect(() => {
    fetchDrivers();
    fetchCaseFiles();
  }, []);

  useEffect(() => {
    if(driversData && driversData.length > 0){
      setDriver(driversData);
    }
    if(CaseFiles && Object.keys(CaseFiles).length !== 0){
      setCaseTitle(CaseFiles.caseTitle);
      setLocation(CaseFiles.location);
      setTimeOfIncident(CaseFiles.timeOfIncident.split("T")[0]);
      setLicencePlate(CaseFiles.licencePlate);
      setCurrentCondition(CaseFiles.currentCondition);
      setPassengerCount(CaseFiles.passengerCount);
      setStatus(CaseFiles.status);
      setIncidentDescription(CaseFiles.incidentDescription);
      setSeverity(CaseFiles.severity);
      setInjuriesDiscription(CaseFiles.injuriesDiscription);
      setSelectedDriver(CaseFiles.driver?.firstName);
      
      setWitnessesStatement(CaseFiles.witnessesStatement);
      setEmergencyServicesContacted(CaseFiles.emergencyServicesContacted);
      setEmergencyServicesResponseTime(CaseFiles.emergencyServicesResponseTime);
      setEmergencyServicesActionsTaken(CaseFiles.emergencyServicesActionsTaken);
      setInsuranceCompaniesContactInfo(CaseFiles.insuranceCompaniesContactInfo);
      setInsuranceStatus(CaseFiles.insuranceStatus);
      setPoliceReport(CaseFiles.policeReport);
      setIsDriverFault(CaseFiles.isDriverFault);

    }

    console.log(CaseFiles);
    console.log(error);


  }, [driversData, CaseFiles]);
  

  const handleEdit = async () => {

    const resutl = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to submit this form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    });

    if (resutl.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("photographicEvidence", photographicEvidence);
        formData.append("policeReport", policeReport);

        axiosDataFetch({
          axiosInstance: axios,
         method: "PUT",
         url: `/caseFiles/${id}`,
         requestConfig:{
          data:{
            caseTitle,
            location,
            timeOfIncident,
            licencePlate,
            currentCondition,
            passengerCount,
            status,
            incidentDescription,
            severity,
            injuriesDiscription,
            selectedDriver,
            witnessesStatement,
            emergencyServicesContacted,
            emergencyServicesResponseTime,
            emergencyServicesActionsTaken,
            photographicEvidence,
            insuranceCompaniesContactInfo,
            insuranceStatus,
            policeReport,
            isDriverFault,
          }
        }
        });
        Swal.fire({
          icon: "success",
          title: "Case file updated successfully",
          timer: 1400,
          showConfirmButton: false
        
        })

      } catch (error) {
        console.log("Error updating case file", error);
      } finally {
       
        navigate("/emergency");
      }
    }
    
  };

  

  const cancel = () => {
    navigate("/emergency");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhotographicEvidence(file);
  };

  const handlePoliceReportUpload = (e) => {
    const file = e.target.files[0];
    setPoliceReport(file);
  };



if(isLoading || Loading){
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Spinner />
    </div>
  )

}
if(CaseFiles && Object.keys(CaseFiles).length !== 0){

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl underline font-bold text-center mb-5">
        Edit Case File
      </h1>

      {step ===1 && (

      <form onSubmit={handleNext}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Case Title
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={caseTitle}
            name="caseTitle"
            onChange={(e) => setCaseTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Time of Incident
          </label>
          <input
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={timeOfIncident }
            name="timeOfIncident"
            onChange={(e) => setTimeOfIncident(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Licence Plate
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={licencePlate}
            name="licencePlate"
            onChange={(e) => setLicencePlate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Current Condition
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentCondition}
            name="currentCondition"
            onChange={(e) => setCurrentCondition(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passenger Count
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={passengerCount}
            name="passengerCount"
            onChange={(e) => setPassengerCount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <select
            value={status}
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
        </form>
      )}
        {step === 2 && (
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Incident Description:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={incidentDescription}
            name="incidentDescription"
            onChange={(e) => setIncidentDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Severity
          </label>
          <select
            value={severity}
            name="severity"
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">Select Severity</option>
            <option value="minor">minor</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Injuries Description
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={injuriesDiscription}
            name="injuriesDiscription"
            onChange={(e) => setInjuriesDiscription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Driver:{" "}
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSelectedDriver(e.target.value)}
          value={selectedDriver}
          >
          <option value="">Select Driver</option> 
          {driver.map((driver) => {
            return <option key={driver._id} value={driver._id}>{driver.firstName} {driver.lastName}</option>
          })}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Is Driver at Fault:
            <input
              
              type="checkbox"
              checked={isDriverFault}
              onChange={(e) => setIsDriverFault(e.target.checked)}
            />
          </label>
        </div>

        

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Witnesses Statement:{" "}
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={witnessesStatement}
            name="witnessesStatement"
            onChange={(e) => setWitnessesStatement(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Emergency Services Contacted:{" "}
          </label>
          <select
            value={emergencyServicesContacted}
            name="emergencyServicesContacted"
            onChange={(e) => setEmergencyServicesContacted(e.target.value)}
          >
            <option value="">Select Emergency Services Contacted</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Emergency Services Response Time:{" "}
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={emergencyServicesResponseTime}
            name="emergencyServicesResponseTime"
            onChange={(e) => setEmergencyServicesResponseTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Emergency Services Actions Taken:{" "}
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={emergencyServicesActionsTaken}
            name="emergencyServicesActionsTaken"
            onChange={(e) => setEmergencyServicesActionsTaken(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo Evidence:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="photographicEvidence"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Insurance Companies Contact Information:{" "}
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={insuranceCompaniesContactInfo}
            name="insuranceCompaniesContactInfo"
            onChange={(e) => setInsuranceCompaniesContactInfo(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Insurance Status:{" "}
          </label>
          <select
            value={insuranceStatus}
            name="insuranceStatus"
            onChange={(e) => setInsuranceStatus(e.target.value)}
          >
            <option value="">Select Insurance Status</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Police Report:
          </label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="policeReport"
            onChange={handlePoliceReportUpload}
          />
        </div>

        <div className="flex items-center justify-between">
        <button type="button" onClick={handlePrevious}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Back
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleEdit}
          >
            Submit
          </button>

          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={cancel}
          >
            {" "}
            Cancel
          </button>
        </div>
      </form>
    )}
    </div>
  );
}
};

export default EditCaseFileForm;
