import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'


const TopBar = () => {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  return (
    <div className='w-screen h-[80px] text-sm fixed top-0 left-0 shadow-md bg-white flex items-center justify-end'>
      {user && 
        <>
          <p>{user?.email}</p>  
          <button className='bg-black text-white px-4 py-2' onClick={()=>logout()}>Logout</button>
        </>
      }
    </div>
  )
}

export default TopBar