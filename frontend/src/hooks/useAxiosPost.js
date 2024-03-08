import {useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "./useAuthContext";

const useAxiosPost = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status,setStatus] = useState(null)
    //const {token} = useAuthContext() {headers:{Authorization:'Bearer '+ token}}

    const postData = async(url,data) => {
        setIsLoading(true);
        try{
            const response= await axios.post(url,data)
            setStatus(response.data)
        }catch(error){
            setError(error.message)
            setStatus([])
        }finally{
            setIsLoading(false)
        }
    }

    return {status,error,isLoading,postData}
}

export default useAxiosPost