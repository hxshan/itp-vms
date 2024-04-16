
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import{ ClockLoader } from 'react-spinners'

const EditUserForm = () => {

  //Api Hooks
  const [roleData,roleError, roleloading, axiosFetch] = useAxios()
  const [user,usererror, userloading, useraxiosFetch,axiosupdatedFetch] = useAxios()
  const navigate = useNavigate()
  const {id} = useParams()
  



//states
const [roles, setRoles] = useState([]);
const [isDriver, setIsDriver] = useState(null);

const [personalInfo, setPersonalInfo] = useState({
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dob:"",
  phoneNumber:"",
  nicNumber: "",
  role: "",
  department: "",
  jobTitle:"",
  empDate: "",
  baseSal: "",
  licenceNum: "",
  status: "",
  email: "",
  password: "",
});


const [currentForm, setCurrentForm] = useState(0);


//functions
const getRoleData = async()=>{
    await axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/role/`,
   });
 }
 const getUserData =async () =>{
    await useraxiosFetch({
        axiosInstance: axios,
        method: "GET",
        url: `/user/${id}`, 
      });
 } 

 useEffect(()=>{
    if(roleData && roleData.length > 0){
      setRoles(roleData)
      setIsDriver(()=>{
        return roleData.find(role=>role.name.toUpperCase() == 'DRIVER')
      })
    }
    if(user && Object.keys(user).length !== 0){
  
        //let formatedDob=user.dob.toISOString().split('T')[0]
        setPersonalInfo({
            firstName:user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            gender: user.gender ,
            dob:user.dob.split('T')[0],
            phoneNumber: user.phoneNumber ,
            nicNumber: user.nicNumber ,
            role:user.role,
            department: user.department,
            jobTitle: user.jobTitle,
            empDate: user.employmentDate.split('T')[0],
            baseSal: user.baseSalary,
            licenceNum: user.licenceNum,
            status: user.status,
            email: user.email,
            password:''
        })
       
    }
    
  },[user,roleData])

  useEffect(()=>{
    getUserData()
    getRoleData()
  },[])


  const formPageIncrement=()=>{
    if((personalInfo.firstName||personalInfo.lastName||personalInfo.gender||personalInfo.dob||personalInfo.phoneNumber||personalInfo.nicNumber) ==''){
      toast.error("All Personal details should be filled")
      return
    }

    setCurrentForm(currentForm+1)
     
  }

  const handlePersonalChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailReg=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if(!personalInfo.email.match(emailReg)){
      toast.error("Invalid Email Address")
      return
    }
    if((personalInfo.role||personalInfo.department||personalInfo.empDate||personalInfo.baseSal||personalInfo.status)===''){
      toast.error("All Employee details should be filled")
      return
    }
    

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', personalInfo.firstName);
    formDataToSend.append('middleName', personalInfo.middleName);
    formDataToSend.append('lastName', personalInfo.lastName);
    formDataToSend.append('gender', personalInfo.gender);
    formDataToSend.append('dob', personalInfo.dob);
    formDataToSend.append('phoneNumber', personalInfo.phoneNumber);
    formDataToSend.append('nicNumber', personalInfo.nicNumber);
    formDataToSend.append('role', personalInfo.role);
    formDataToSend.append('department', personalInfo.department);
    formDataToSend.append('jobTitle', personalInfo.jobTitle);
    formDataToSend.append('empDate', personalInfo.empDate);
    formDataToSend.append('baseSal', personalInfo.baseSal);
    formDataToSend.append('licenceNum', personalInfo.licenceNum);
    formDataToSend.append('status', personalInfo.status);
   
    axiosupdatedFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/user/personal/${id}`,
      data: formDataToSend,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  if(userloading){
    <div className="shadow-xl bg-white rounded flex flex-col items-center w-full h-[300px]">
          <ClockLoader
            color="#36d7b7"
            size={60}
          />
    </div>
  }
  return (
    <div className="shadow-xl bg-white rounded flex flex-col items-center mt-4">
      <ToastContainer/>
      <form onSubmit={handleSubmit} className="mt-6 px-8 pt-6 pb-8 mb-4 w-full">
        <div id="formPage-1" className={currentForm == 0 ? "" : "hidden"}>
          <h2 className="font-bold text-2xl w-fit">
            Edit Personal Information
          </h2>
          <hr className="mb-8 mt-2"></hr>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={personalInfo.firstName}
                onChange={handlePersonalChange}
                type="text"
                name="firstName"
                id="firstName"
                required
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="middleNames"
              >
                Middle Names
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={personalInfo.middleName}
                onChange={handlePersonalChange}
                type="text"
                name="middleName"
                id="middleName"
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={personalInfo.lastName}
                onChange={handlePersonalChange}
                type="text"
                name="lastName"
                id="lastName"
                required
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalChange}
                required
              >
                <option value="">Select Gender </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="dob"
                id="dob"
                value={personalInfo.dob}
                onChange={handlePersonalChange}
                required
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={personalInfo.phoneNumber}
                onChange={handlePersonalChange}
                required
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="nicNumber"
              >
                NIC Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="nicNumber"
                id="nicNumber"
                value={personalInfo.nicNumber}
                onChange={handlePersonalChange}
                required
              />
            </div>
            
            
          </div>
        </div>
        <div id="formPage-2" className={currentForm == 1 ? "" : "hidden"}>
          <h2 className="font-bold text-2xl w-fit mt-5">
            Edit Employee Information
          </h2>
          <hr className="mb-8 mt-2"></hr>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="role">Role</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="role"
                value={personalInfo.role}
                onChange={handlePersonalChange}
              >
                <option value="">Select Role</option>
                {
                  roles.map((role)=>{
                    return(
                      <option key={role.name} value={role._id}>{role.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="department">Department</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="department"
                id="department"
                value={personalInfo.department}
                onChange={handlePersonalChange}
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="jobTitle">Job Title</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={personalInfo.jobTitle}
                onChange={handlePersonalChange}
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="empDate">Employment Date</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="empDate"
                id="empDate"
                value={personalInfo.empDate}
                onChange={handlePersonalChange}
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="baseSal">Base Salary</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="baseSal"
                id="baseSal"
                value={personalInfo.baseSal}
                onChange={handlePersonalChange}
                required
              />
            </div>
            {
              isDriver!=null && isDriver?._id == personalInfo.role ? (
                <>
                <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="licenceNum">Licence Number</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="licenceNum"
                id="licenceNum"
                value={personalInfo.licenceNum}
                onChange={handlePersonalChange}
                required
              />
            </div>
         
                </>
              ):(<></>)
            }
            

            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="status">Status</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="status"
                value={personalInfo.status}
                onChange={handlePersonalChange}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <h2 className="font-bold text-2xl w-fit mt-5 mb-8">
            Account Information
          </h2>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
              />
            </div>
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                value={personalInfo.password}
                onChange={handlePersonalChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <button
            type="button"
            onClick={formPageIncrement}
            className={
              currentForm < 1
                ? "bg-actionBlue py-2 px-6 rounded-md text-white font-bold "
                : "hidden"
            }
          >
            Next
          </button>
        </div>
        <div className="w-full flex justify-between mt-4">
          <button
            type="button"
            onClick={() => {
              if (currentForm > 0) setCurrentForm(currentForm - 1);
            }}
            className={currentForm > 0 ? " bg-blue-600 py-2 px-6 rounded-md text-white font-bold " : "hidden"}
          >
            Back
          </button>

          <button
            type="submit"
            className={currentForm == 1 ? "bg-actionGreen py-2 px-6 rounded-md text-white font-bold " : "hidden"}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
