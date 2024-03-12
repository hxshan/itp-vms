
import useAxiosPost from "@/hooks/useAxiosPost";
import useAxiosGet from "@/hooks/useAxiosGet";
import { useEffect, useState } from "react";

const CreateUserForm = () => {
    const {status,error,isLoading,postData} = useAxiosPost()
    const {data: rolesData, error: rolesError, isLoading: rolesIsLoading, refetch: roleRefetch } = useAxiosGet('/user/getallroles') 
    const [roles,setRoles]=useState([])

    useEffect(()=>{
        if(rolesData !=null)
            setRoles(rolesData)
    })

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
      });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission here
        await postData('/user/createuser',formData)
      };

  return (
    <div className="border-black border-2 bg-white shadow-md rounded flex flex-col items-center ">
      <h2 className="font-bold text-3xl w-fit mt-10">Add New User</h2>
      <form onSubmit={handleSubmit} className="mt-6 px-8 pt-6 pb-8 mb-4 w-full">
        <div id="formPage-1" className="">
          <h2  className="font-bold text-2xl w-fit mt-10">Personal Information</h2>
            <div className="grid grid-cols-2">
              <div className="col-span-1 w-full flex">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />  
              </div>  
              <div className="col-span-1 w-full flex">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />  
              </div>
              <div className="col-span-1 w-full flex">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />  
              </div>           
            </div>
        </div>

      </form>
    </div>
  );
};

export default CreateUserForm;
