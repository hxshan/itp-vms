import useAxiosGet from "@/hooks/useAxiosGet"
import {EmployeeTable,CreateUserForm} from "../../components/admin/"
import { useEffect, useState } from "react"


const AdminDashboard = () => {
    const [users,setUsers]=useState([])
    const {data:userData,error:userErr,isLoading:userIsLoading,refetch:userRefetch} = useAxiosGet('/user/getall')

    useEffect(()=>{
      if(userData !=null)
        setUsers(userData)
      else
        setUsers([])

      
    },[userData])
//console.log(users)
//
  return (
  
    <div className="container mx-auto pb-10 min-h-full">
      <h1 className="text-2xl font-bold underline mt-4 mb-8">Dashboard</h1>
      <EmployeeTable  data={users} isLoading={userIsLoading}/>
     </div>

  )
}

export default AdminDashboard