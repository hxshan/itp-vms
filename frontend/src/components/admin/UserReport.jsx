import {useEffect,useState} from 'react'
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';

const UserReport = () => {
    const { id } = useParams();
    const [user, error, loading, axiosFetch] = useAxios();
    const [image,setImage]=useState()
    const getData = () => {
        axiosFetch({
          axiosInstance: axios,
          method: "GET",
          url: `/user/${id}`,
        });
      };
      useEffect(() => {
        getData();
      }, []);
    return (
        <div>
            {
                user && <div>
                    <img src={`http://localhost:3000/api/`} alt="image"/>
                </div>
            }
        </div>
  )
}

export default UserReport