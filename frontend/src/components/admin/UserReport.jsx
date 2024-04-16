import {useEffect,useState} from 'react'
import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import {useNavigate , useParams } from "react-router-dom";
import placeholder from '../../assets/placeholder.png'

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

      if(loading){
        return(
          <p>Loading ...</p>
        )
      }
      if(error){
        return(
          <p>Unexpected Error Occurrend!</p>
        )
      }

      //<img src={`http://localhost:3000/employee_picture/${image}`} alt="image"/>
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center bg-white'>
              <h1 className='font-bold text-2xl my-8'>Comprehensive User Report</h1>
              <h2 className='font-bold text-lg mb-4'>Employee Name</h2>
              <div className='w-full flex justify-between'>
                {image !=''?(
                  <img src={`http://localhost:3000/employee_picture/${image}`} alt="image"/>
                ):(
                  <img src={placeholder} alt="image"/>
                )
                
                }
                <div className='flex'>
                  <div>
                    <h2>User Information</h2>
                    <div>
                      <div>
                        <p>WorkEmail</p>
                        <p>{user?.email}</p>
                      </div>
                      <div>
                        <p>Department</p>
                        <p>{user?.email}</p>
                      </div>
                      <div>
                        <p>Role</p>
                        <p>{user?.role}</p>
                      </div>
                      <div>
                        <p>Nic Number</p>
                        <p>{user?.nicNumber}</p>
                      </div>
                      <div>
                        <p>Birth Date</p>
                        <p>{user?.dob}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2>Contact Information</h2>
                      <div>
                        <div>
                          <p>Phone Number</p>
                          <p>{user?.phoneNumber}</p>
                        </div>
                      </div>
                      <h2>Emergency Contacts</h2>
                      <div>
                        {
                        
                         user.emergencyContacts ?
                         (
                          user.emergencyContacts.map(contact=>{
                            return(
                              <>
                              <div key={contact.name}>
                                <p>Contact Name</p>
                                <p>{contact.name}</p>
                              </div>
                              <div key={contact.number
                              }>
                                <p>Contact Number</p>
                                 {contact.number}
                              </div>
                              </>
                            )
                          })
                         ):(<></>)

                        }
                        
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
  )
}

export default UserReport