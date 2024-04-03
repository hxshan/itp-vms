
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  //Api Hooks
  const [roleData,roleerror, loading, axiosFetch] = useAxios()
  const [user,usererror, userloading, useraxiosFetch] = useAxios()
  const navigate = useNavigate()
  /*const {
    data: rolesData,
    refetch: roleRefetch,
  } = useAxiosGet("/role/");
*/
  //const { status, error, isLoading, postData } = useAxiosPost();

  const getRoleData =()=>{
    axiosFetch({
     axiosInstance: axios,
     method: "GET",
     url: `/role/`,
   });
 }

  useEffect(()=>{
    getRoleData()
  },[])

  useEffect(()=>{
    //console.log(roleData)
    /*if(error){
      alert(error)
      navigate('/admin')
    }*/
    if(roleData && roleData.length > 0){
      setRoles(roleData)
    }
  },[roleData])

  //constants
  const emptyContact = {
    emergencyName: "",
    emergencyContact: "",
  };


  //states
  const [roles, setRoles] = useState([]);

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
    empDate: "",
    baseSal: "",
    licenceNum: "",
    status: "",
    email: "",
    password: "",
  });

  const[nicDocument,setNicDocument]=useState(null);
  const[licenceDoc,setLicenceDocument]=useState(null);

  const [currentForm, setCurrentForm] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState([emptyContact]);



  const formPageIncrement=()=>{
    if((personalInfo.firstName||personalInfo.lastName||personalInfo.gender||personalInfo.dob||personalInfo.phoneNumber||personalInfo.nicNumber) ==''){
      alert("All feilds should be filled")
      return
    }
    if(nicDocument == null){
      alert("Please upload Nic Document")
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

    const formData = {
      ...personalInfo,
      nicDocument: nicDocument,
      licenceDoc: licenceDoc,
      emergencyContacts: emergencyContacts
  };

    // Handle form submission here
    useraxiosFetch({
      axiosInstance:axios,
      method:'POST',
      url:'/user/',
      requestConfig:{
        data:{
          ...formData
        }
      }
    })
    if(usererror){
      alert(usererror)
    }
    if(user){
      alert("user created succesfully")
      navigate('/admin')
    }
  };

  const AddContact = () => {
    let contactsArr = [...emergencyContacts];
    contactsArr.push(emptyContact);
    setEmergencyContacts(contactsArr);
  };

  const removeContact = (index) => {
    let contactsArr = [...emergencyContacts];
    contactsArr.splice(index, 1);
    setEmergencyContacts(contactsArr);
  };
  const handleContactChange = (index, name, value) => {
    let contactsArr = [...emergencyContacts];
    let updated = contactsArr[index];
    updated[name] = value;
    setEmergencyContacts(contactsArr);
  };

  return (
    <div className="shadow-xl bg-white rounded flex flex-col items-center">
      <h2 className="font-bold text-3xl w-fit mt-10">Add New User</h2>

      <form onSubmit={handleSubmit} className="mt-6 px-8 pt-6 pb-8 mb-4 w-full">
        <div id="formPage-1" className={currentForm == 0 ? "" : "hidden"}>
          <h2 className="font-bold text-2xl w-fit mt-5 mb-8">
            Personal Information
          </h2>
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
            <div className="col-span-1 w-full flex flex-col mb-4 ">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="nicDocument"
              >
                Nic Document
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="nicDocument"
                id="nicDocument"
                onChange={(e)=>{setNicDocument(e.target.files[0])}}
                required
              />
            </div>
            <div className="grid grid-cols-2 col-span-2 w-full ">
              <div className="col-span-2 mt -10 flex justify-between mb-8 items-center">
                <h2 className="font-bold text-2xl w-fit ">Emergency Contact</h2>
                <button
                className="bg-blue-600 py-2 px-6 rounded-md text-white font-bold mt-2"
                  onClick={() => {
                    AddContact();
                  }}
                >
                  Add
                </button>
              </div>

              {emergencyContacts.map((contact, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 col-span-2 gap-x-4"
                  >
                    <div className="col-span-1 w-full flex flex-col">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="emergencyName"
                      >
                        Contact Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="emergencyName"
                        value={emergencyContacts[index].emergencyName}
                        onChange={(e)=>{handleContactChange(index,e.target.name,e.target.value)}}
                        id={`emergencyName${index}`}
                        required
                      />
                    </div>
                    <div className="col-span-1 w-full flex flex-col">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="emergencyContact"
                      >
                        Contact Number
                      </label>
                      <div className="flex w-full">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="emergencyContact"
                          id={`emergencyContact${index}`}
                          value={emergencyContacts[index].emergencyContact}
                          onChange={(e)=>{handleContactChange(index,e.target.name,e.target.value)}}
                          required
                        />
                        <button
                          className={index > 0 ? "bg-red-600 py-2 px-4 ml-2 rounded-md text-white font-bold " : "hidden"}
                          onClick={() => {
                            removeContact(index);
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="formPage-2" className={currentForm == 1 ? "" : "hidden"}>
          <h2 className="font-bold text-2xl w-fit mt-5 mb-8">
            Employee Information
          </h2>
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
            <div className="col-span-1 w-full flex flex-col mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="licenceDoc">Licence Document</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                name="licenceDoc"
                id="licenceDoc"
                onChange={(e)=>{setLicenceDocument(e.target.files[0])}}
                required
              />
            </div>

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
                ? "bg-blue-600 py-2 px-6 rounded-md text-white font-bold "
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
            className={currentForm == 1 ? "bg-green-600 py-2 px-6 rounded-md text-white font-bold " : "hidden"}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
