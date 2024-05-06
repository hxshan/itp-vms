
// validation.js

const validateForm = (formData) => {
  const errors = {};

  // Check if required fields are filled
  if (!formData.selectedDriver) {
    errors.caseTitle = "Case Title is required";
  }

  if (!formData.location) {
    errors.location = "Location is required";
  }

  if (!formData.location) {
    errors.location = "Location is required";
  }




  // Add more validation rules for other fields as needed

  return errors;
};

export default validateForm;