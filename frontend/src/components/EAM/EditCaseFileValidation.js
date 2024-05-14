import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// validation.js

const validateForm = (formData) => {
  const errors = {};

  // Check if required fields are filled
if(formData. insuranceCompaniesContactInfo < 10){
  errors.insuranceCompaniesContactInfo = 'Please enter a valid insurance  contact number';
  toast.error('Please enter a valid insurance contact number');
}




  // Add more validation rules for other fields as needed

  return errors;
};

export default validateForm;