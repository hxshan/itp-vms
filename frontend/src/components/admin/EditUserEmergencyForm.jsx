import {useState,useEffect} from 'react'
import useAxios from '@/hooks/useAxios';
import { useParams } from 'react-router-dom';
import axios from '@/api/axios';
import { ToastContainer, toast } from 'react-toastify';

const EditUserEmergencyForm = () => {
    const [user,usererror, userloading, useraxiosFetch] = useAxios()
    const [reload,setReload]=useState(0)
    const {id}=useParams()
  //constants
  const emptyContact = {
    _id:"",
    name: "",
    number: "",
  };

  //state
  const [emergencyContacts, setEmergencyContacts] = useState([emptyContact]);

  const getUserData =async () =>{
    await useraxiosFetch({
        axiosInstance: axios,
        method: "GET",
        url: `/user/${id}`,
      });
 } 

 useEffect(()=>{
    if(user && Object.keys(user).length !== 0 && user.emergencyContacts){
        if(user.emergencyContacts.length > 0){
            setEmergencyContacts(user.emergencyContacts)
            console.log(user)
        }
    }
  },[user])

  useEffect(()=>{
    getUserData()
  },[reload])


      const AddContact = () => {
        let contactsArr = [...emergencyContacts];
        contactsArr.push(emptyContact);
        setEmergencyContacts(contactsArr);
      };
    
      const removeContact = (index) => {
        let contactsArr = [...emergencyContacts];
        contactsArr.splice(index, 1);
        setEmergencyContacts(contactsArr);
        setReload(reload+1)
      };

      const DeleteContact = async(index,contactId)=>{
        if (id === ''){
          removeContact(index)
          return
        }
        // console.log(contactId)
        useraxiosFetch({
          axiosInstance: axios,
          method: "PATCH",
          url: `/user/contacts/${id}`,
          requestConfig:{
            data:{
              ContactId:contactId
            }
          }
        })

        removeContact(index)
        if(!usererror){
          alert("Deleted succesfully")
          setReload(reload+1)
        }
      }

      const handleContactChange = (index, name, value) => {
        let contactsArr = [...emergencyContacts];
        let updated = contactsArr[index];
        updated[name] = value;
        setEmergencyContacts(contactsArr);
      };
       
      const handleSubmit = (e) =>{
        e.preventDefault()

        for (const contact of emergencyContacts) {
          console.log(contact.number.length)
          if(contact.name == ""){
            toast.error("Fill Emergency Contact Name")
            return
          }
          if(contact.number == ""){
            toast.error("Fill Emergency Contact Number")
            return
          }
          if(contact.number.length < 10 ){
            toast.error("Invalid Emergency Contact Number")
            return
          }
        }

        useraxiosFetch({
          axiosInstance: axios,
          method: "PATCH",
          url: `/user/addcontacts/${id}`,
          requestConfig:{
            data:{
              emergencyContacts
            }
          }
        })

        if(!usererror){
          alert("updated succesfully")
          setReload(reload+1)
        }
      }

      if(usererror){
        return(
          <div className="bg-white p-8 my-8 shadow-xl rounded w-full h-[250px]"> 

          </div>
        )
      }

      if(userloading){
        return(
          <div className="bg-white p-8 my-8 shadow-xl rounded w-full h-[250px]"> 
            <p>Loading</p>
          </div>
        )
      }

  return (
    <div className="bg-white p-8 my-8 shadow-xl rounded ">
      <ToastContainer/>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="grid grid-cols-2 col-span-2 w-full ">
              <div className="col-span-2 mt -10 flex justify-between mb-8 items-center">
                <h2 className="font-bold text-2xl w-fit ">Emergency Contact</h2>
                <button
                className="bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2"
                  onClick={() => {
                    AddContact();
                  }}
                >
                  Add
                </button>
              </div>

              {emergencyContacts.map((contact, index) => {
                //console.log(contact)
                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 col-span-2 gap-x-4"
                  >
                    <div className="col-span-1 w-full flex flex-col">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="name"
                      >
                        Contact Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={emergencyContacts[index].name}
                        onChange={(e)=>{handleContactChange(index,e.target.name,e.target.value)}}
                        id={`emergencyName${index}`}
                        required
                      />
                    </div>
                    <div className="col-span-1 w-full flex flex-col">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="number"
                      >
                        Contact Number
                      </label>
                      <div className="flex w-full">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="number"
                          id={`emergencyContact${index}`}
                          value={emergencyContacts[index].number}
                          onChange={(e)=>{handleContactChange(index,e.target.name,e.target.value)}}
                          required
                        />
                        <button
                          className={index > 0 ? "bg-actionRed py-2 px-4 ml-2 rounded-md text-white font-bold " : "hidden"}
                          type='button'
                          id={contact._id}
                          onClick={(e) => {
                            DeleteContact(index,e.target.id);
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
                <div className="w-full flex justify-end mt-8">
                    <button className="bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2" >Submit</button>
                </div>
                {usererror && <p>{usererror}</p>}
            </form>
    </div>
  )
}

export default EditUserEmergencyForm