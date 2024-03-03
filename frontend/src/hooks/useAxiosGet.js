import { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "./useAuthContext";

const useAxiosGet = (apiUrl) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState(null)
    const {token} = useAuthContext()

    const fetchData = useCallback(async(url) => {
        setIsLoading(true);
        try{
            const response= await axios.get(url,{headers:{Authorization:'Bearer '+ token}})
            setData(response.data)
        }catch(error){
            setError(error.message)
            setData([])
        }finally{
            setIsLoading(false)
        }
    },[token])

    const refetch = useCallback(()=>{
        fetchData(apiUrl)
    },[apiUrl])

    useEffect(()=>{
        fetchData(apiUrl)
    },[apiUrl])

    return {data,error,isLoading,refetch}
}

export default useAxiosGet