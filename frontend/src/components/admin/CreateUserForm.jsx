
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
    <div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            Firstname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="Firstname"
            value={formData.firstName}
            onChange={(e)=>handleChange(e)}
            name="firstName"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Lastname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Lastname"
            name="lastName"
            value={formData.lastName}
            onChange={(e)=>handleChange(e)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={(e)=>handleChange(e)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e)=>handleChange(e)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            name="role"
            value={formData.role}
            onChange={(e)=>handleChange(e)}
            required
          >
            <option value="">Select Role</option>
            {
                roles.map((role)=>{
                    return(
                    <option key={role._id} value={role._id}>{role.name}</option>)
                })
            }
            
           
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
