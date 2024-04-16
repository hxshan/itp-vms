
import {UserTable,CreateUserForm} from "../../components/admin/"

const Users = () => {
  return (
    <div className="container mx-auto py-10 min-h-full">
      <UserTable/>
      <h2 className="font-bold text-2xl w-fit mt-10 underline">Add New User</h2>
      <CreateUserForm/>
    </div>
  )
}

export default Users