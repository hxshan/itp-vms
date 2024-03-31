import {useState} from "react";
import CaseFileForm from "@/components/EAM/CaseFileForm";


const EAMDashboard = () => {
    const [showForm , setShowForm] = useState(false);

    const handleSubmit = (formData) => {
        
        console.log('Form submitted:', formData);
        
        setShowForm(false);
      };

      return (
        <div className="container">
          <h1>Emergency Management Dashboard</h1>
          <button onClick={() => setShowForm(!showForm)}>Create Form</button>
          {showForm && <CaseFileForm onSubmit={handleSubmit} />}
          
        </div>
      ); 
    
};

export default EAMDashboard;

