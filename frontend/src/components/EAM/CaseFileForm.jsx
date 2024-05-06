import  { useState } from "react";
import axios from "@/api/axios";
import {
  validateCaseType,
  validateCaseTitle,
  validateLocation,
  validatetimeOfIncident,
  validatelicencePlate,
  validatecurrentCondition,
  validatepassengerCount,
  validateincidentDescription,
  validateseverity,
  validateinjuriesDiscription,
  validatestatus,
} from "./CaseFileValidation"


import { useNavigate } from "react-router-dom";


const CaseFileForm = () => {
  const [formData, setFormData] = useState({
    caseType: "",
    caseTitle: "",
    location: "",
    timeOfIncident: "",
    licencePlate: "",
    currentCondition: "",
    passengerCount: 1,
    incidentDescription: "",
    severity: "",
    injuriesDiscription: "",
    status: "",
  });
 







 
  const navigate = useNavigate();

  const [error, setError] = useState(null);

 


  /*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Are you sure you want to submit this form?");
    if(confirm){
     try{

      await axiosFetch({
        axiosInstance: axios,
        method: "POST",
        url: "/caseFiles/create",
        data: {setformData}
        
      });

      

      if(error){
        console.error('Error submitting form:', error);
      }else{
        console.log('Form submitted successfully:', response.data);

        navigate("/emergency") ;
      }

    }catch(error){
      console.error('Error submitting form:', error);
    }
  }
}*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "caseType" || name === "severity" || name === "status"){
      setFormData((prevFormData) =>({
        ...prevFormData,
        [name]: value,
      }));
    }else{
    setFormData({ ...formData, [name]: value });
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

  const caseTypeError = validateCaseType(formData.caseType);
  const caseTitleError = validateCaseTitle(formData.caseTitle);
  const locationError = validateLocation(formData.location);
  const timeOfIncidentError = validatetimeOfIncident(formData.timeOfIncident);
  const licencePlateError = validatelicencePlate(formData.licencePlate);
  const currentConditionError = validatecurrentCondition(formData.currentCondition);
  const passengerCountError = validatepassengerCount(formData.passengerCount);
  const incidentDescriptionError = validateincidentDescription(formData.incidentDescription);
  const severityError = validateseverity(formData.severity);
  const injuriesDiscriptionError = validateinjuriesDiscription(formData.injuriesDiscription);
  const statusError = validatestatus(formData.status);

    if(
      caseTypeError ||
      caseTitleError ||
      locationError ||
      timeOfIncidentError ||
      licencePlateError ||
      currentConditionError ||
      passengerCountError ||
      incidentDescriptionError ||
      severityError ||
      injuriesDiscriptionError ||
      statusError
    ){
      setError("Please fix the errors in the form before submitting.");
    }else{
    const confirm = window.confirm("Are you sure you want to submit this form?");
   
    if(confirm)
    axios.post("http://localhost:3000/api/caseFiles/create", formData)
      .then(Response => {


        console.log('Form submitted successfully:', Response);

        
        navigate("/emergency") ;
      
      })
      
      .catch(error =>{
        console.error('Error submitting form:', error);
        setError("Failed to submit form. Please try again.");
        
      });
  }
  };
 

  const handleReset = () => {
    setFormData({
    caseType: "",
    caseTitle: "",
    location: "",
    timeOfIncident: "",
    licencePlate: "",
    currentCondition: "",
    passengerCount: 1,
    incidentDescription: "",
    severity: "",
    injuriesDiscription: "",
    status: "",
  });
  };

 

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200 px-4 py-8 xl:px-10 xl:py-20">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md px-8 py-6">
      <h1 className="text-3xl font-semibold mb-6">Create Case File</h1>
      <form>
      <div className="mb-4">
          <label htmlFor="caseType" className="block text-lg font-semibold mb-2">Case Type</label>
          <select id="caseType" name="caseType" value={formData.caseType} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
            <option value="">Select Incident Type</option>
            <option value="accident">Accident</option>
            <option value="emergency">Emergency</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="caseTitle" className="block text-lg font-semibold mb-2">Case Title</label>
          <input
            type="text"
            id="caseTitle"
            name="caseTitle"
            value={formData.caseTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-lg font-semibold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="timeOfIncident" className="block text-lg font-semibold mb-2">Time of Incident</label>
          <input
            type="datetime-local"
            id="timeOfIncident"
            name="timeOfIncident"
            value={formData.timeOfIncident}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="licencePlate" className="block text-lg font-semibold mb-2">Licence Plate</label>
          <input
            type="text"
            id="licencePlate"
            name="licencePlate"
            value={formData.licencePlate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currentCondition" className="block text-lg font-semibold mb-2">Current Condition</label>
          <input
            type="text"
            id="currentCondition"
            name="currentCondition"
            value={formData.currentCondition}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="passengerCount" className="block text-lg font-semibold mb-2">Passenger Count</label>
          <input
            type="number"
            id="passengerCount"
            name="passengerCount"
            value={formData.passengerCount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold mb-2"> Incident Description</label>
          <textarea
            id="description"
            name="incidentDescription"
            value={formData.incidentDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="severity" className="block text-lg font-semibold mb-2">Severity</label>
          <select id="severity" name="severity" value={formData.severity} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
            <option value="">Select Severity</option>
            <option value="minor">minor</option>
            <option value="moderate">moderate</option>
            <option value="severe">severe</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="injuries" className="block text-lg font-semibold mb-2">Injuries</label>
          <input
            type="text"
            id="injuries"
            name="injuriesDiscription"
            value={formData.injuriesDiscription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-lg font-semibold mb-2">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        {/* Repeat similar structure for other input fields */}
        <div className="mb-4"> 
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reset
        </button>
      </form>
    </div>
  </div>
  );
};

export default CaseFileForm;
