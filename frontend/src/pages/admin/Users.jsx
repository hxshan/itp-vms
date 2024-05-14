import { useState } from "react"
import {UserTable,CreateUserForm} from "../../components/admin/"

const Users = () => {
  const [reload,setReload]=useState(0)
  return (
    <div className="container mx-auto py-10 min-h-full">
      <UserTable reload={reload} setReload={setReload} />
      <h2 className="font-bold text-3xl mt-10 underline text-center w-full">Add New User</h2>
      <CreateUserForm reload={reload} setReload={setReload}/>
    </div>
  )
}

export default Users