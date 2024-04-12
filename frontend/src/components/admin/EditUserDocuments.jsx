import {useEffect,useState} from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useParams } from "react-router-dom";


const EditUserDocuments = () => {
  const [nicDocument, setNicDocument] = useState(null);
  const [licenceDoc, setLicenceDocument] = useState(null);
  const [empPhoto, setEmpPhoto] = useState(null);
  const [user,usererror, userloading, useraxiosFetch,axiosupdatedFetch] = useAxios()

  const {id} = useParams()



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('licenceDoc', licenceDoc);
    formDataToSend.append('empPhoto', empPhoto);
    
    axiosupdatedFetch({
      axiosInstance: axios,
      method: 'PATCH',
      url: `/user/${id}`,
      data: formDataToSend,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  return (
    <div className="bg-white p-8 my-8 shadow-xl rounded ">
        <form>
        <h2 className="font-bold text-2xl w-fit mb-8">Edit User Documents</h2>


        <div className="col-span-1 w-full flex flex-col mb-4 ">
        <label
          className="block text-gray-700 text-md font-bold mb-2"
          htmlFor="empPhoto"
        >
          Employee Photogragh{" "}
          <span className="font-normal">
            (.png .jpg .jpeg are only accepted)
          </span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          accept="image/*"
          name="empPhoto"
          id="empPhoto"
          onChange={(e) => {
            setEmpPhoto(e.target.files[0]);
          }}
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
          onChange={(e) => {
            setNicDocument(e.target.files[0]);
          }}
          required
        />
      </div>

     

      <div className="col-span-1 w-full flex flex-col mb-4">
        <label
          className="block text-gray-700 text-md font-bold mb-2"
          htmlFor="licenceDoc"
        >
          Licence Document
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          name="licenceDoc"
          id="licenceDoc"
          onChange={(e) => {
            setLicenceDocument(e.target.files[0]);
          }}
          required
        />
      </div>
        <div className="w-full flex justify-end">
            <button className="bg-actionBlue py-2 px-6 rounded-md text-white font-bold mt-2" >Submit</button>
        </div>
       
      </form>
    </div>
  );
};

export default EditUserDocuments;
