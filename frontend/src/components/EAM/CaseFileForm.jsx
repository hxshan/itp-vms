import  { useState } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";


const CaseFileForm = ({setShowCaseFileForm}) => {

  CaseFileForm.propTypes = {
      showCaseFileForm : PropTypes.bool.isRequired,
      setShowCaseFileForm : PropTypes.func.isRequired,
  };




  const [caseTitle, setCaseTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfIncident, setTimeOfIncident] = useState("");
  const [vin, setVin] = useState("");
  const [licencePlate, setLicencePlate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [injuries, setInjuries] = useState("");
  const [status, setStatus] = useState("incomplete");

  const [response , error, loading, axiosFetch] = useAxios();

  const  formData = {
    caseTitle,
    location,
    timeOfIncident,
    vin,
    licencePlate,
    currentCondition,
    passengerCount,
    description,
    severity,
    injuries,
    status 
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Are you sure you want to submit this form?");
    if(confirm){
      setShowCaseFileForm(false);

      await axiosFetch({
        axiosInstance: axios,
        method: "POST",
        url: "/caseFiles/create",
        requestConfig: {
          data:{
            ...formData
          }
        }
      });

      navigate("/emergency") ;

      if(error){
        console.error('Error submitting form:', error);
      }

    }
  }
  

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    
    axios.post("http://localhost:3000/api/casefile", formData)
      .then(Response => {
        console.log('Form submitted successfully:', Response.data);
        handleReset();
      
      })
      
      .catch(error =>{
        console.error('Error submitting form:', error);
      });
  };

  const handleReset = () => {
    // Reset form data
    setFormData({
      caseType: "",
      date: "",
      time: "",
      location: "",
      driverID: "",
      vehicleNo: "",
      description: "",
    });
  };*/

  return (
    <div className="w-full h-full flex bg-gray-200 px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">
      <div className="w-full h-full bg-white px-3 py-5 xl:px-10">
        <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000]">
          <h1 className="ext-2xl font-semibold xl:text-4xl">Create Case File</h1>
        </div>

        <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="text-lg font-semibold">Case Title</label>
            <input
              type="text"
              name="caseTitle"
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Time of Incident</label>
            <input
              type="datetime-local"
              name="timeOfIncident"
              value={timeOfIncident}
              onChange={(e) => setTimeOfIncident(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">VIN</label>
            <input
              type="text"
              name="vin"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Licence Plate</label>
            <input
              type="text"
              name="licencePlate"
              value={licencePlate}
              onChange={(e) => setLicencePlate(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Current Condition</label>
            <input
              type="text"
              name="currentCondition"
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Passenger Count</label>
          <input
            type="number"
            name="passengerCount"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            className="border border-gray-300 rounded-md p-1 w-full"
          />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Serverity</label>
            <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required className="border border-gray-300 rounded-md p-1 w-full">
            <option value="">Select Severity</option>
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            </select>
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Injuries</label>
            <textarea
              name="injuries"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            />
          </div>

          <div className="w-full">
            <label className="text-lg font-semibold">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="border border-gray-300 rounded-md p-1 w-full">
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            </select>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CaseFileForm;
