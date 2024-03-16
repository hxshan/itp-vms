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
  
    <div className="container mx-auto py-10">
        <CreateUserForm/>
        <EmployeeTable  data={users} isLoading={userIsLoading}/>
     </div>

  )
}

export default AdminDashboard