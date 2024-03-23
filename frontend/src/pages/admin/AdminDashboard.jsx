import useAxiosGet from "@/hooks/useAxiosGet"
import {EmployeeTable,CreateUserForm, CreateRoleForm} from "../../components/admin/"
import { useEffect, useState } from "react"


const AdminDashboard = () => {

//console.log(users)
//
  return (
  
    <div className="container mx-auto pb-10 min-h-full">
      <h1 className="text-2xl font-bold underline mt-4 mb-8">Dashboard</h1>
      <CreateUserForm/>
      <EmployeeTable/>
     </div>

  )
}

export default AdminDashboard