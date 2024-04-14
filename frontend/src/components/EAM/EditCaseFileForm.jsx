import React from 'react';
import { useState } from 'react';
import axios from '@/api/axios';
import propTypes from 'prop-types';

const EditCaseFileForm = ({ setViewCaseFile, viewCaseFileData }) => {
      const [caseTitle, setCaseTitle] = useState(viewCaseFileData.caseTitle);
      const [location, setLocation] = useState(viewCaseFileData.location);
      const [timeOfIncident, setTimeOfIncident] = useState(viewCaseFileData.timeOfIncident);
      const [licencePlate, setLicencePlate] = useState(viewCaseFileData.licencePlate);
      const [currentCondition, setCurrentCondition] = useState(viewCaseFileData.currentCondition);
      const [passengerCount, setPassengerCount] = useState(viewCaseFileData.passengerCount);
      const [status, setStatus] = useState(viewCaseFileData.status);
      const [incidentDescription, setIncidentDescription] = useState(viewCaseFileData.incidentDescription);
      const [severity, setSeverity] = useState(viewCaseFileData.severity);
      const [injuriesDiscription, setInjuriesDiscription] = useState(viewCaseFileData.injuriesDiscription);
      const [driverLicenceNumber, setDriverLicenceNumber] = useState(viewCaseFileData.driverLicenceNumber || '');
      const [driverId, setDriverId] = useState(viewCaseFileData.driverId || '');
      const [driverName, setDriverName] = useState(viewCaseFileData.driverName || '');
      const [witnessesContactInformation, setWitnessesContactInformation] = useState(viewCaseFileData.witnessesContactInformation || '');
      const [witnessesStatement, setWitnessesStatement] = useState(viewCaseFileData.witnessesStatement || '');
      const [emergencyServicesContacted, setEmergencyServicesContacted] = useState(viewCaseFileData.emergencyServicesContacted || 'false');
      const [emergencyServicesResponseTime, setEmergencyServicesResponseTime] = useState(viewCaseFileData.emergencyServicesResponseTime || '');
      const [emergencyServicesActionsTaken, setEmergencyServicesActionsTaken] = useState(viewCaseFileData.emergencyServicesActionsTaken || '');
      const [photographicEvidence, setPhotographicEvidence] = useState(viewCaseFileData.photographicEvidence || '');
      const [insuranceCompaniesContactInfo, setInsuranceCompaniesContactInfo] = useState(viewCaseFileData.insuranceCompaniesContactInfo   || '');
      const [insuranceStatus, setInsuranceStatus] = useState(viewCaseFileData.insuranceStatus || 'pending');
      const [policeReport, setPoliceReport] = useState(viewCaseFileData.policeReport || '');

      EditCaseFileForm.propTypes = {
        setViewCaseFile: propTypes.func.isRequired,
        viewCaseFileData: propTypes.object.isRequired
      };

      const handleEdit =  async() => {
        const updatedCaseFile = {
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
          driverLicenceNumber,
          driverId,
          driverName,
          witnessesContactInformation,
          witnessesStatement,
          emergencyServicesContacted,
          emergencyServicesResponseTime,
          emergencyServicesActionsTaken,
          photographicEvidence,
          insuranceCompaniesContactInfo,
          insuranceStatus,
          policeReport
        };
          const confirm = window.confirm("Are you sure you want to submit this form?");
              if(confirm){
                try{
                  await
                    axios.put(`http://localhost:3000/api/caseFiles/${viewCaseFileData._id}`, updatedCaseFile);
                  
                } catch (error) {
                  console.log("Error updating case file", error);
                } finally {
                  setViewCaseFile(false);
                }                
              }

        };

        const cancel = () => {
          setViewCaseFile(false);
        };

        

        const handleImageChange = (e) => {
          const file = e.target.files[0];
          setPhotographicEvidence(file);
        }

        const handlePoliceReportUpload = (e) => {
          const file = e.target.files[0];
          setPoliceReport(file);
        }


    return (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form>
              <h1 className="text-2xl underline font-bold text-center mb-5">Edit Case File</h1>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Case Title</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={caseTitle}  name="caseTitle" onChange={(e) => setCaseTitle(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={location} name="location" onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Time of Incident</label>
                <input type="datetime-local" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={timeOfIncident} name="timeOfIncident" onChange={(e) => setTimeOfIncident(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Licence Plate</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={licencePlate} name="licencePlate" onChange={(e) => setLicencePlate(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Current Condition</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={currentCondition} name="currentCondition" onChange={(e) => setCurrentCondition(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Passenger Count</label>
                <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={passengerCount} name="passengerCount" onChange={(e) => setPassengerCount(e.target.value)} />
              </div>

              <div className="mb-4">
                <label htmlFor='status' className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <select value={status} name='status' onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Incident Description:</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={incidentDescription} name="incidentDescription" onChange={(e) => setIncidentDescription(e.target.value)} />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Severity</label>
                  <select value={severity} name='severity' onChange={(e) => setSeverity(e.target.value)}>
                  <option value="">Select Severity</option>
                  <option value="minor">minor</option>
                  <option value="moderate">moderate</option>
                  <option value="severe">severe</option>
                  </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Injuries Description</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={injuriesDiscription} name="injuriesDiscription" onChange={(e) => setInjuriesDiscription(e.target.value)} />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Driver ID: </label>
                <input type="text"className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={driverId} name="driverId" onChange={(e) => setDriverId(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Driver Name: </label>
                <input type="text" value={driverName} name="driverName" onChange={(e) => setDriverName(e.target.value)} />
              </div>

              <div className="mb-4">  
                <label className="block text-gray-700 text-sm font-bold mb-2">Driver Licence Number: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={driverLicenceNumber} name="driverLicenceNumber" onChange={(e) => setDriverLicenceNumber(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Witnesses Contact Information: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={witnessesContactInformation} name="witnessesContactInformation" onChange={(e) => setWitnessesContactInformation(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Witnesses Statement: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={witnessesStatement} name="witnessesStatement" onChange={(e) => setWitnessesStatement(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Services Contacted: </label>
                <select value={emergencyServicesContacted} name='emergencyServicesContacted' onChange={(e) => setEmergencyServicesContacted(e.target.value)}>
                <option value="">Select Emergency Services Contacted</option>
                <option value="true">Yes</option>
                <option value="false">No</option>

                </select>
                  

              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Services Response Time: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={emergencyServicesResponseTime} name="emergencyServicesResponseTime" onChange={(e) => setEmergencyServicesResponseTime(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Services Actions Taken: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={emergencyServicesActionsTaken} name="emergencyServicesActionsTaken" onChange={(e) => setEmergencyServicesActionsTaken(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo Evidence:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="photographicEvidence"  onChange={handleImageChange} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Insurance Companies Contact Information: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={insuranceCompaniesContactInfo} name="insuranceCompaniesContactInfo" onChange={(e) => setInsuranceCompaniesContactInfo(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Insurance Status: </label>
                <select value={insuranceStatus} name='insuranceStatus' onChange={(e) => setInsuranceStatus(e.target.value)}>
                <option value="">Select Insurance Status</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Police Report:</label>
                <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="policeReport" onChange={handlePoliceReportUpload} />
              </div>

              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              <div className="flex items-center justify-between">
              
              <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEdit}>
                Submit
              </button>

              <button type='button' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={cancel}> Cancel</button>
              
              </div>
            </form>
            
          </div>
    );
      }



export default EditCaseFileForm;



    
