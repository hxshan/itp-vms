import axios from '@/api/axios';
import useAxios from '@/hooks/useAxios';
import React from 'react'
import { useNavigate } from "react-router-dom";


const Request = ({isOpen,Toggle,ReqData,getRequests}) => {

    const [deleReq, delError, delLoading, fetchDel] = useAxios();

    const DeleteRequest = async (ReqID) => {
        await fetchDel({
          axiosInstance: axios,
          method: "DELETE",
          url: `/contract/deleteRequest/${ReqID}`,
        });
      };

      const HandleDelete = (ReqID) => {
        const confirm = window.confirm("This Request will be deleted");
    
        if (confirm) {
            DeleteRequest(ReqID).then(function (res) {
            console.log(res);
            getRequests()
          });
        } else {
          return;
        }
      };

    const navigate = useNavigate();
    
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } flex flex-col bg-dimWhite fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]    `}
    >
      <div
        className="flex bg-white flex-col  min-h-[450px] py-4 px-12 rounded-lg w-[1000px] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4 border-b-2 ">
          <h1 className=" text-[20px] font-bold ">Clients Requests</h1>
        </div>

        <div className='min-h-[400px] w-full overflow-y-auto '>
        {ReqData.length != 0 ? ReqData.map((item)=>(<div className='flex flex-col bg-[#D9D9D9] w-full rounded-lg h-fit my-4 p-5'>
            <label className=' font-semibold'>Client Name</label>
            <p className=' text-blue-600'>{item.clientID.firstName} {item.clientID.lastName}</p>

            <label className=' font-semibold my-2'>Client NIC number</label>
            <p className='text-blue-600'>{item.clientID.nicNumber}</p>

            <label className=' font-semibold mt-2'>Request For</label>
            <p className='text-blue-600'>{item.Status}</p>

            <label className=' font-semibold mt-2'>Renew Date</label>
            <p className='text-blue-600'>{ !item.renew_ED ? "This request is for termination": new Date(item.renew_ED).toLocaleDateString()}</p>

            <div className="flex justify-end gap-4">
            <button
              className=" bg-actionBlue text-white px-5 py-2 rounded-lg w-[150px] font-bold "
            onClick={()=>{navigate(`/viewClient/${item.clientID._id}`)}}
            >
              View Client
            </button>
            <button
              className=" bg-actionGreen text-white px-5 py-2 rounded-lg w-[150px] font-bold "
              onClick={()=>{navigate(`/viewContract/${item.ContractID}`)}}
            >
              View Contract
            </button>
            <button
              className=" bg-actionRed text-white px-5 py-2 rounded-lg w-[150px] font-bold "
                onClick={()=>{HandleDelete(item._id)}}
            >
              Delete
            </button>
          </div>
        </div>))
        :(<p>No Request available</p>)}

</div>

       <div className="flex justify-center ">
          <button
            className=" bg-orange-600 px-5 py-2 rounded-lg w-[150px] mt-5 font-bold text-white"
            onClick={Toggle}
          >
            Close
          </button>
        </div>
        </div>

        
        </div>
  )
}

export default Request