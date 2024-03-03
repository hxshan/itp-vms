import { useState } from "react";
//import { useAuthContext } from "./useAuthContext";
import axios from "../api/axios";


const useSignUp = () => {
  
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    //const { dispatch } = useAuthContext();

    const signup = async (email, password,url,role) => {
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(
            url,
            JSON.stringify({ email, password,role}),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
    
          localStorage.setItem("token", JSON.stringify(response.data));
        } catch (err) {
          setIsLoading(false);
          setError(JSON.stringify(err.response.data.error));
        } finally {
          setIsLoading(false);
        }
      };

      return {error,isLoading,signup}
}

export default useSignUp