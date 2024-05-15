import { CreateRoleForm, RolesTable } from '@/components/admin'
import { useAuthContext } from "@/hooks/useAuthContext";

const Roles = () => {
  const { user } = useAuthContext()
  return (
    <div className="container mx-auto py-10 min-h-full">
        <RolesTable/>
        {user?.permissions?.userPermissions.Create ===true &&
        <CreateRoleForm/>
        }
    </div>
  )
}

export default Roles