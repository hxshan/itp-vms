import {useEffect,useState} from 'react'
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import {useNavigate , useParams } from "react-router-dom";

const UserReport = () => {
    const { id } = useParams();
    const [user, error, loading, axiosFetch] = useAxios();
    const [image,setImage]=useState('')
    const getData = () => {
        axiosFetch({
          axiosInstance: axios,
          method: "GET",
          url: `/user/${id}`,
        });
      };
      useEffect(()=>{
        if(user.empPhoto){
          console.log(user)
          setImage(user.empPhoto)
        }
      },[user])
      useEffect(() => {
        getData();
        
      }, []);
    return (
        <div>
            {
                user && image!='' && <div>
                    <img src={`http://localhost:3000/employee_picture/${image}`} alt="image"/>
                </div>
            }
        </div>
  )
}

export default UserReport