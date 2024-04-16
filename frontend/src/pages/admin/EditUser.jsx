import { EditUserDocuments, EditUserEmergencyForm, EditUserForm } from '@/components/admin'


const EditUser = () => {
  
  
  return (
    <div className="container mx-auto pb-10 min-h-full">
      <EditUserForm/>
      <EditUserEmergencyForm/>
      <EditUserDocuments/>
    </div>
  )
}

export default EditUser