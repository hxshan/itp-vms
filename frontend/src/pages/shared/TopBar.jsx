import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import React from 'react'

const TopBar = () => {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  return (
    <div className='w-screen h-[80px] fixed top-0 left-0 shadow-md bg-slate-500 flex justify-end'>
      {user && 
        <>
          <p>User Email</p>  
          <button className='bg-black text-white px-4 py-2' onClick={()=>logout()}>Logout</button>
        </>

      }
    </div>
  )
}

export default TopBar