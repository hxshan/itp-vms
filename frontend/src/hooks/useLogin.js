import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../api/axios";


const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.post(
            '/auth/login',
            JSON.stringify({ email, password}),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
    
          const token = JSON.stringify(response.data)
    
          localStorage.setItem("token",token);
          dispatch({type: 'LOGIN', payload: JSON.parse(token)})
    
          setIsLoading(false)
          return true
        } catch (err) {
          setIsLoading(false);
          setError(JSON.stringify(err.response.data.error));
          return false
        } finally {
          setIsLoading(false);
        } 
      };
    


  return {error,isLoading,login}
}

export default useLogin