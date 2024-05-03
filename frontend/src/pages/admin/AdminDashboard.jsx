
import { DriverTable } from "@/components/employee"
import {UserTable,CreateUserForm, DashboardHero} from "../../components/admin/"
const AdminDashboard = () => {
//<CreateUserForm/> <DriverTable/>
  return (
  
    <div className="container mx-auto pb-10 min-h-full">
      <h1 className="text-2xl font-bold underline mt-4 mb-8">Dashboard</h1>
      <DashboardHero/>
        
     </div>

  )
}

export default AdminDashboard