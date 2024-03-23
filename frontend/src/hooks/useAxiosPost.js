import { useState } from "react";
import axios from "@/api/axios"; // Import axios library

const useAxiosPost = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null); 

    const postData = async (url, data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, data); 
            setResponse(response.data); 
            return response.data;
        } catch (error) {
            setError(error.response.data.message);
            throw error.response.data.message; 
        } finally {
            setIsLoading(false); 
        }
    };

    return { response, error, isLoading, postData }; 
};

export default useAxiosPost; 