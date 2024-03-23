import { CreateRoleForm, RolesTable } from '@/components/admin'
import React from 'react'

const Roles = () => {
  return (
    <div className="container mx-auto pb-10 min-h-full">
        <h1 className="text-2xl font-bold underline mt-4 mb-8">Manage User Roles</h1>
        <CreateRoleForm/>
        <RolesTable/>
   </div>
  )
}

export default Roles