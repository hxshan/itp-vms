import { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
const useAxiosGet = (apiUrl) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState(null)
    // const {token} = useAuthContext() {headers:{Authorization:'Bearer '+ token}}

    const fetchData = useCallback(async(url) => {
        setIsLoading(true);
        try{
            const response= await axios.get(url)
            if(response.data != null)
                setData(response.data)
        }catch(error){
            setError(error.message)
            setData(error.message)
        }finally{
            setIsLoading(false)
        }
    },[])

    const refetch = useCallback(()=>{
        fetchData(apiUrl)
    },[apiUrl])

    useEffect(()=>{
        fetchData(apiUrl)
    },[apiUrl])

    return {data,error,isLoading,refetch}
}

export default useAxiosGet