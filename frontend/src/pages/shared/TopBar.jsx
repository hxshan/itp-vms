import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import user_profile from '../../assets/user_profile.png'
import { useEffect, useState } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'

const TopBar = () => {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const [menuOpen,setMenuOpen] = useState(false)

  useEffect(()=>{
    setMenuOpen(false)
  },[])
  //
  return (
    <div className='w-screen h-[80px] text-sm fixed top-0 left-0 shadow-md bg-white flex items-center justify-end'>
      {user && 
        <div className='relative flex w-fit gap-4 mr-8 items-center'>
          <p>{user?.email.split('@')[0]}</p>
           <button className='w-10 h-10' onClick={()=>setMenuOpen(!menuOpen)}>
              <img src={user_profile} alt="profile image" />
           </button>
          <div className={`fixed ${!menuOpen?'opacity-0':''} h-fit bg-white shadow-md border-black w-40 top-[80px] transition ease-in-out rounded-b-md right-1`} onMouseLeave={()=>setMenuOpen(false)}>
            <button className='relative text-black w-full px-4 py-2 border-b-2 border-gray-200' onClick={()=>logout()}>View Profile</button>
            <button className='relative text-black w-full px-4 py-2' onClick={()=>logout()}>Logout</button>
          </div>
        </div>
      }
    </div>
  )
}

export default TopBar