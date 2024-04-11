
import {UserTable,CreateUserForm} from "../../components/admin/"

const Users = () => {
  return (
    <div className="container mx-auto py-10 min-h-full">
      <UserTable/>
      <CreateUserForm/>
    </div>
  )
}

export default Users