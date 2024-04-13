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
      const [driverLicenceNumber, setDriverLicenceNumber] = useState(viewCaseFileData.driverLicenceNumber);
      const [driverId, setDriverId] = useState(viewCaseFileData.driverId);
      const [driverName, setDriverName] = useState(viewCaseFileData.driverName);
      const [witnessesContactInformation, setWitnessesContactInformation] = useState(viewCaseFileData.witnessesContactInformation);
      const [witnessesStatement, setWitnessesStatement] = useState(viewCaseFileData.witnessesStatement);
      const [emergencyServicesContacted, setEmergencyServicesContacted] = useState(viewCaseFileData.emergencyServicesContacted);
      const [emergencyServicesResponseTime, setEmergencyServicesResponseTime] = useState(viewCaseFileData.emergencyServicesResponseTime);
      const [emergencyServicesActionsTaken, setEmergencyServicesActionsTaken] = useState(viewCaseFileData.emergencyServicesActionsTaken);
      const [photographicEvidence, setPhotographicEvidence] = useState(viewCaseFileData.photographicEvidence);
      const [insuranceCompaniesContactInfo, setInsuranceCompaniesContactInfo] = useState(viewCaseFileData.insuranceCompaniesContactInfo);
      const [insuranceStatus, setInsuranceStatus] = useState(viewCaseFileData.insuranceStatus);
      const [policeReport, setPoliceReport] = useState(viewCaseFileData.policeReport);

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


    return (
          <div>
            <form>
              <h1 className="text-2xl underline font-bold text-center mb-5">Edit Case File</h1>

              <div>
                <label>Case Title</label>
                <input type="text" value={caseTitle}  name="caseTitle" onChange={(e) => setCaseTitle(e.target.value)} />
              </div>

              <div>
                <label>Location</label>
                <input type="text" value={location} name="location" onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label>Time of Incident</label>
                <input type="datetime-local" value={timeOfIncident} name="timeOfIncident" onChange={(e) => setTimeOfIncident(e.target.value)} />
              </div>

              <div>
                <label>Licence Plate</label>
                <input type="text" value={licencePlate} name="licencePlate" onChange={(e) => setLicencePlate(e.target.value)} />
              </div>

              <div>
                <label>Current Condition</label>
                <input type="text" value={currentCondition} name="currentCondition" onChange={(e) => setCurrentCondition(e.target.value)} />
              </div>

              <div>
                <label>Passenger Count</label>
                <input type="text" value={passengerCount} name="passengerCount" onChange={(e) => setPassengerCount(e.target.value)} />
              </div>

              <div>
                <label htmlFor='status'>Status</label>
                <select value={status} name='status' onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label>Incident Description:</label>
                <input type="text" value={incidentDescription} name="incidentDescription" onChange={(e) => setIncidentDescription(e.target.value)} />
              </div>
              
              <div>
                <label>Severity</label>
                  <select value={severity} name='severity' onChange={(e) => setSeverity(e.target.value)}>
                  <option value="">Select Severity</option>
                  <option value="minor">minor</option>
                  <option value="moderate">moderate</option>
                  <option value="severe">severe</option>
                  </select>
              </div>

              <div>
                <label>Injuries Description</label>
                <input type="text" value={injuriesDiscription} name="injuriesDiscription" onChange={(e) => setInjuriesDiscription(e.target.value)} />
              </div>
              
              <div>
                <label>Driver ID: </label>
                <input type="text" value={driverId} name="driverId" onChange={(e) => setDriverId(e.target.value)} />
              </div>

              <div>
                <label>Driver Name: </label>
                <input type="text" value={driverName} name="driverName" onChange={(e) => setDriverName(e.target.value)} />
              </div>

              <div>  
                <label>Driver Licence Number: </label>
                <input type="text" value={driverLicenceNumber} name="driverLicenceNumber" onChange={(e) => setDriverLicenceNumber(e.target.value)} />
              </div>

              <div>
                <label>Witnesses Contact Information: </label>
                <input type="text" value={witnessesContactInformation} name="witnessesContactInformation" onChange={(e) => setWitnessesContactInformation(e.target.value)} />
              </div>

              <div>
                <label>Witnesses Statement: </label>
                <input type="text" value={witnessesStatement} name="witnessesStatement" onChange={(e) => setWitnessesStatement(e.target.value)} />
              </div>

              <div>
                <label>Emergency Services Contacted: </label>
                <input type='checkbox' value={emergencyServicesContacted} name="emergencyServicesContacted" onChange={(e) => setEmergencyServicesContacted(e.target.value)} />
                  

              </div>

              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              <button type='button' onClick={handleEdit}>
                Submit
              </button>

              <button type='button' onClick={cancel}> Cancel</button>
            </form>
          </div>
    );
      }



export default EditCaseFileForm;



    
