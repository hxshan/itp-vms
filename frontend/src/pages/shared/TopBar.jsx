import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import user_profile from '../../assets/user_profile.png'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import { IoMoon } from "react-icons/io5"
import { IoSunny } from "react-icons/io5";

const TopBar = () => {
  const {user} = useAuthContext()
  const navigate= useNavigate()
  const {logout} = useLogout()
  const [menuOpen,setMenuOpen] = useState(false)
  const [id,setid]=useState()
  const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
 
  useEffect(()=>{
    let decodedToken={}
    if(user?.accessToken){
      decodedToken = jwtDecode(user.accessToken)
      setid(decodedToken?.UserInfo?.id)
    }
  },[user])

  useEffect(()=>{
    setMenuOpen(false)
  },[])
  //
  return (
    <div className='w-screen h-[80px] text-sm fixed z-20 top-0 left-0 shadow-md dark:border-b dark:border-gray-600  bg-white dark:bg-[#121212] dark:text-white flex items-center justify-end'>
         <div className="mr-5 flex items-center">
            <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoSunny />
                }
                {
                    !dark && <IoMoon />
                }
            </button>
        </div>
      {user?.accessToken? (
        <div className='relative flex w-fit gap-4 mr-8 items-center'>
          {
            !user?.accessToken &&  <button className='relative text-black w-full px-4 py-2' onClick={()=>navigate('/login')}>Login</button>
          }
          <p>{user?.email.split('@')[0]}</p>
           <button className='w-10 h-10' onClick={()=>setMenuOpen(!menuOpen)}>
              <img src={user_profile} alt="profile image" />
           </button>
          <div className={`fixed ${!menuOpen?'opacity-0':''} h-fit bg-white shadow-md border-black w-40 top-[80px] transition ease-in-out rounded-b-md right-1`} onMouseLeave={()=>setMenuOpen(false)}>
            <button className='relative text-black w-full px-4 py-2 border-b-2 border-gray-200' disabled={!menuOpen} onClick={()=>navigate(`/user/${id}`)}>View Profile</button>
            <button className='relative text-black w-full px-4 py-2' disabled={!menuOpen} onClick={()=>logout()}>Logout</button>
          </div>
        </div>)
        :(
          <div className='relative flex w-fit gap-4 mr-8 items-center'>
           <button className='relative bg-actionBlue rounded-md text-white font-bold w-full px-4 py-2' onClick={()=>navigate('/login')}>Login</button>           
          </div>
        )
        
      }
    </div>
  )
}

export default TopBar