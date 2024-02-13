import { Navigate, Outlet} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode'

export const PrivateRoutes = ({roles,fallbackUrl}) => {
    const { token } = useAuthContext();
    try{
      const {id,email,role}=jwtDecode(JSON.stringify(token))

      const isAllowed = (token !== null && roles.includes(role))?true:false;
      return (
        isAllowed? <Outlet/>:<Navigate to={fallbackUrl}/>
      )
    }catch (err){
      return(
        <Navigate to={fallbackUrl}/>
      )
    }
    
    //console.log(isAllowed)
  
}
