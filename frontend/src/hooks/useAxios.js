import { useEffect, useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
      headers = {},
    } = configObj;

    try {
   
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      
      //console.log(requestConfig.data)
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        headers,
        signal: ctrl.signal,
       
      });
      //console.log(res)
      setResponse(res.data);

      setError("");
    } catch (error) {
      console.log(error);
      setResponse([]);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const axiosupdatedFetch = async (configObj) => {
    const { axiosInstance, method, url, data, headers = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, data, {
        headers,
        signal: ctrl.signal,
      });
      setResponse(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setResponse([]);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch,axiosupdatedFetch];
};

export default useAxios;
