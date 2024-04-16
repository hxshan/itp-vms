// CaseFileValidation.js

export const validateCaseType = (caseType) => {
    if (!caseType) {
      alert("please select a case type");
      return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };
// Validation function for case title
export const validateCaseTitle = (caseTitle) => {
    if (!caseTitle) {
      alert("Case title is required");
      return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };
  
  // Validation function for location
  export const validateLocation = (location) => {
    if (!location) {
        alert("Location is required");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };
  
  // Add more validation functions for other input fields as needed
  export const validatetimeOfIncident = (timeOfIncident) => {
    if (!timeOfIncident) {
        alert("time of incident is required");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validatelicencePlate = (licencePlate) => {
    if (!licencePlate) {
        alert("Licence Plate is required");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validatecurrentCondition = (currentCondition) => {
    if (!currentCondition) {
        alert("Current Condition is required");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validatepassengerCount = (passengerCount) => {
    if (!passengerCount) {
        alert("Current Condition is required");
        return false;
    }else if(passengerCount <= 0){
        alert("Passenger count cannot be negative");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validateincidentDescription = (incidentDescription) => {
    if (!incidentDescription) {
        alert("Incident Description is required");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validateseverity = (severity) => {
    if (!severity) {
        alert("Please select severity level");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validateinjuriesDiscription = (injuriesDiscription) => {
    if (!injuriesDiscription) {
        alert("Please enter injuries discription");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  export const validatestatus = (status) => {
    if (!status) {
        alert("please select status");
        return false;
    }
    // Add more validation rules as needed
    return null; // Return null if validation passes
  };

  
  