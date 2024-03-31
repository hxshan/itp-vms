import { CreateRoleForm, RolesTable } from '@/components/admin'

const Roles = () => {
  return (
    <div className="container mx-auto py-10 min-h-full">
        <RolesTable/>
        <CreateRoleForm/>
    </div>
  )
}

export default Roles