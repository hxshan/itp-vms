import React from 'react';
import EditCaseFileForm from './EditCaseFileForm';
import { useState } from 'react';
import propTypes from 'prop-types';

const ViewCaseFile = ({ setViewCaseFile, viewCaseFileData }) => {
  ViewCaseFile.propTypes = {
    setViewCaseFile: propTypes.func.isRequired,
    viewCaseFileData: propTypes.object.isRequired
  };

  const cancel = () => {
    setViewCaseFile(false);
  };

  const [showEditCaseFileForm, setShowEditCaseFileForm] = useState(false);
  const editCaseFile = () => {
    setShowEditCaseFileForm(true);
  };

  return(
    <div>
      {showEditCaseFileForm ? (
        <EditCaseFileForm setViewCaseFile={setViewCaseFile} viewCaseFileData={viewCaseFileData} />
      ):(

      <div className=" absolute bg-white border-2 border-[#0E6300] w-[75%] mb-6 top-11 right-11 xl:top-5">
        <div className=' xl:flex xl:flex-col justify-between mx-10 my-5'>
          <div className='mr-[20px]'>
              <h1 className='text-2xl underline font-bold mb-6'>Case File Details</h1>
                <div className=' xl:flex justify-between'>
                  <div>
                    <p className='className= text-lg font-semibold leading-8'>Case File ID:  {viewCaseFileData._id } </p>
                    <p className='className= text-lg font-semibold leading-8'>Case Title: {viewCaseFileData.caseTitle} </p>
                    <p className='className= text-lg font-semibold leading-8'>Location: {viewCaseFileData.location} </p>
                    <p className='className= text-lg font-semibold leading-8'>Time of Incident: {viewCaseFileData.timeOfIncident} </p>
                    </div>
                  <div>
                  <p className='className= text-lg font-semibold leading-8'>Licence Plate: {viewCaseFileData.licencePlate} </p>
                    <p className='className= text-lg font-semibold leading-8'>Current Condition: {viewCaseFileData.currentCondition} </p>
                    
                   
                    <p className='className= text-lg font-semibold leading-8'>Status: {viewCaseFileData.status} </p>
                  </div>

                  
                </div>

          </div>

          <div className='mr-[20px] mt-10'>
            <h1 className='text-2xl underline font-semibold text-center mb-5'>Driver Details</h1>
              
                
                  <p className='className= text-lg font-semibold leading-8'>Driver ID: {viewCaseFileData.driverId} </p>
                  <p className='className= text-lg font-semibold leading-8'>Driver Name: {viewCaseFileData.driverName} </p>
                  <p className='className= text-lg font-semibold leading-8'>Deiver Licence Number: {viewCaseFileData.driverLicenceNumber} </p>
                
              
          </div>

          <div className='mr-[20px] mt-10'>
            <h1 className='text-2xl underline font-semibold text-center mb-5'>Incident Details</h1>
              
                  <p className='className= text-lg font-semibold leading-8'>Severity: {viewCaseFileData.severity} </p>
                  <p className='className= text-lg font-semibold leading-8'>Passenger Count: {viewCaseFileData.passengerCount} </p>
                  <p className='className= text-lg font-semibold leading-8'>Incident Description: {viewCaseFileData.incidentDescription} </p>
                  <p className='className= text-lg font-semibold leading-8'>Injures: {viewCaseFileData.injuriesDiscription} </p>
                  <p className='className= text-lg font-semibold leading-8'>Licence Number: {viewCaseFileData.licenceNumber} </p>
                
              
          </div>

          <div className='mr-[20px] mt-10'>
            <h1 className='text-2xl underline font-semibold text-center mb-5'>Emergency Details</h1>
              
                  <p className='className= text-lg font-semibold leading-8'>Emergency Services Contacted: {viewCaseFileData.emergencyServicesContacted} </p>
                  <p className='className= text-lg font-semibold leading-8'>Emergency Services Response Time: {viewCaseFileData.emergencyServicesResponseTime} </p>
                  <p className='className= text-lg font-semibold leading-8'>Emergency Services Actions Taken: {viewCaseFileData.emergencyServicesActionsTaken} </p>
                 
                
              
          </div>

          <div className='mr-[20px] mt-10'>
            <h1 className='text-2xl underline font-semibold text-center mb-5'>Witness Information / plice Report</h1>
              
                  <p className='className= text-lg font-semibold leading-8'>Witnesses Contact Information: {viewCaseFileData.witnessesContactInformation} </p>
                  <p className='className= text-lg font-semibold leading-8'>Witnesses Statement: {viewCaseFileData.witnessesStatement} </p>
                  <p className='className= text-lg font-semibold leading-8'>Photographic Evidence: {viewCaseFileData.photographicEvidence} </p>
                  <p className='className= text-lg font-semibold leading-8'>Police Report: {viewCaseFileData.policeReport} </p>
               
                
              
          </div>

          <div className='mr-[20px] mt-10'>
            <h1 className='text-2xl underline font-semibold text-center mb-5'>Insurance Details</h1>
              
                  <p className='className= text-lg font-semibold leading-8'>Insurance Companies ContactInfo: {viewCaseFileData.insuranceCompaniesContactInfo} </p>
                  <p className='className= text-lg font-semibold leading-8'>Insurance Status: {viewCaseFileData.insuranceStatus} </p>
                  <p className='className= text-lg font-semibold leading-8'>Emergency Services Actions Taken: {viewCaseFileData.emergencyServicesActionsTaken} </p>
                 
                
              
          </div>


          <div className='mr-[20px] mt-10 flex justify-between items-baseline'>
            <button className='px-4 py-2 bg-[#D4D800] text-white rounded-md mr-2' onClick={editCaseFile}>Edit</button>
            <button className='px-4 py-2 bg-[#A90000] text-white rounded-md' onClick={cancel}>Cancel</button>
          </div>
        </div>
      </div>
      )}
    </div>
  )



}

export default ViewCaseFile;
   


