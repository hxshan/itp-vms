// validation.js
export const validate = (formData) => {
    const errors = {};
  
    if (!formData.caseType) {
      errors.caseType = 'Case type is required'
      alert("Please select a case type");
    }
  
    if (!formData.date) {
      errors.date = 'Date is required';
      alert("Date is required"); 
    }
  
    if (!formData.time) {
      errors.time = 'Time is required';
      alert('Time is required');
    }
  
    if (!formData.location) {
      errors.location = 'Location is required';
      alert('Location is required');
    }
  
    
  
    return errors;
  };
  