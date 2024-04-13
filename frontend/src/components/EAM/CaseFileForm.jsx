import  { useState } from "react";
import axios from "@/api/axios";


import { useNavigate } from "react-router-dom";


const CaseFileForm = () => {

 




  const [caseTitle, setCaseTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfIncident, setTimeOfIncident] = useState("");
  const [licencePlate, setLicencePlate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [incidentDescription, setincidentDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [injuriesDiscription, setInjuriesDiscription] = useState("");
  const [status, setStatus] = useState("incomplete");


 
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const  formData = {
    caseTitle,
    location,
    timeOfIncident,
    
    licencePlate,
    currentCondition,
    passengerCount,
    incidentDescription,
    severity,
    injuriesDiscription,
    status
  };


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
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

 

  const handleReset = () => {
    setCaseTitle("");
    setLocation("");
    setTimeOfIncident("");
    setLicencePlate("");
    setCurrentCondition("");
    setPassengerCount(1);
    setincidentDescription("");
    setSeverity("");
    setInjuriesDiscription("");
    setStatus("incomplete");
  };

 

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-200 px-4 py-8 xl:px-10 xl:py-20">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md px-8 py-6">
      <h1 className="text-3xl font-semibold mb-6">Create Case File</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="caseTitle" className="block text-lg font-semibold mb-2">Case Title</label>
          <input
            type="text"
            id="caseTitle"
            name="caseTitle"
            value={caseTitle}
            onChange={(e) => setCaseTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-lg font-semibold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
        </div>

        <div className="mb-4">
          <label htmlFor="timeOfIncident" className="block text-lg font-semibold mb-2">Time of Incident</label>
          <input
            type="datetime-local"
            id="timeOfIncident"
            name="timeOfIncident"
            value={timeOfIncident}
            onChange={(e) => setTimeOfIncident(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="licencePlate" className="block text-lg font-semibold mb-2">Licence Plate</label>
          <input
            type="text"
            id="licencePlate"
            name="licencePlate"
            value={licencePlate}
            onChange={(e) => setLicencePlate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currentCondition" className="block text-lg font-semibold mb-2">Current Condition</label>
          <input
            type="text"
            id="currentCondition"
            name="currentCondition"
            value={currentCondition}
            onChange={(e) => setCurrentCondition(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="passengerCount" className="block text-lg font-semibold mb-2">Passenger Count</label>
          <input
            type="number"
            id="passengerCount"
            name="passengerCount"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={incidentDescription}
            onChange={(e) => setincidentDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="severity" className="block text-lg font-semibold mb-2">Severity</label>
          <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
            <option value="">Select Severity</option>
            <option value="minor">Low</option>
            <option value="moderate">Medium</option>
            <option value="severe">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="injuries" className="block text-lg font-semibold mb-2">Injuries</label>
          <input
            type="text"
            id="injuries"
            name="injuries"
            value={injuriesDiscription}
            onChange={(e) => setInjuriesDiscription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-lg font-semibold mb-2">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
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
