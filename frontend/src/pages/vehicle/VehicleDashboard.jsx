import useAxiosGet from "@/hooks/useAxiosGet"
import {EmployeeTable,CreateUserForm} from "../../components/admin"
import { useEffect, useState } from "react"
import { Navbar } from "../shared"

const VehicleDashboard = () => {

    const columns =["Name ","Email","IDK foreal","something","Actions"]
    const [users,setUsers]=useState([])
    const {data:userData,error:userErr,isLoading:userIsLoading,refetch:userRefetch} = useAxiosGet('/user/getall')

    useEffect(()=>{
      if(userData !=null)
        setUsers(userData)
    },[userData])

//<EmployeeTable columns={columns} data={data}/>
    console.log(userData)
  return (
  
    <div className="container mx-auto py-10">
        <CreateUserForm />
        <EmployeeTable columns={columns} data={users} isLoading={userIsLoading}/>
     </div>

  )
}

export default VehicleDashboard