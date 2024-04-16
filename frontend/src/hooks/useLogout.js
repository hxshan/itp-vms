import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'


export const useLogout = () => {
  const navigate=useNavigate();
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    window.location.reload()
    navigate('/login')

  }

  return { logout }
} 