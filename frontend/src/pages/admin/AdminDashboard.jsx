
import {UserTable,CreateUserForm} from "../../components/admin/"
const AdminDashboard = () => {

//console.log(users)
//
  return (
  
    <div className="container mx-auto pb-10 min-h-full">
      <h1 className="text-2xl font-bold underline mt-4 mb-8">Dashboard</h1>
      <CreateUserForm/>
      <UserTable/>
     </div>

  )
}

export default AdminDashboard