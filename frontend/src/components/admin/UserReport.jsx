import { useEffect, useState, useRef } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import ReactToPrint from "react-to-print";
import { Pie } from "react-chartjs-2";



const UserReport = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const [user, error, loading, axiosFetch] = useAxios();
  const [image, setImage] = useState("");
  const [counts,setCounts]=useState([0,0])
 

  const chartData = {
    labels: ["negative", "positive",],
    datasets: [
      {
        label: "No of Users",
        data: counts,
        backgroundColor: [
          "rgba(116, 248, 53, 0.8)",
          "rgba(255, 46, 46, 0.8)",
          "rgba(255, 138, 43, 0.8)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(82, 255, 0, 0.8)",
          "rgba(255, 0, 0, 0.8)",
          "rgba(255, 115, 0, 0.8)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/user/report/${id}`,
    });
  };
  useEffect(() => {
    
    if(user?.records?.length){
      console.log(user.records)
      let pos=user.records.filter(record=>record.recordType == 'positive')
      let neg=user.records.filter(record=>record.recordType == 'negative')
      setCounts([neg.length,pos.length])
    }
    if (user?.personal?.empPhoto) {
      setImage(user.personal.empPhoto);
    }

  }, [user]);
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Unexpected Error Occurrend!</p>;
  }

  console.log(user);
  return (
    <div className="w-full bg-white  rounded-lg shadow-md mb-12 pb-8">
      <div ref={ref} className=" flex flex-col px-12 pt-12 pb-0 mt-8">
        <h1 className="text-3xl w-full text-center font-bold mb-8">
          Comprehensive {user?.personal?.role?.name == 'DRIVER'?'Driver':'User'}  Report
        </h1>
        <div className="flex gap-14 mb-4">
          <div className="w-[30%] h-[30%] rounded-md mr-4">
            {image != "" && !error ? (
              <img
                src={`http://localhost:3000/employee_picture/${image}`}
                alt="image"
              />
            ) : (
              <img src={placeholder} alt="image" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">
              {user?.personal?.firstName +
                " " +
                (user?.personal?.midlleName || "") +
                " " +
                user?.personal?.lastName}
            </h2>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Job Title :</p>
              <p className="ml-8">
                {user?.personal?.jobTitle}
              </p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Department :</p>
              <p className="ml-8">{user?.personal?.email}</p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Role :</p>
              <p className="ml-8">{user?.personal?.role?.name}</p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Nic Number :</p>
              <p className="ml-8">{user?.personal?.nicNumber}</p>
            </div>
          </div>
        </div>
        <div className="my-4 pt-4 border-t-2 border-gray-600">
          <h3 className="text-lg font-bold mb-2 ml-2">Contact Information</h3>
          <div className="flex w-full ml-8">
            <div className="mr-4 flex-[50%]">
              <p className="font-bold text-gray-600">Email :</p>
              <p className=" ml-8">{user?.personal?.email}</p>
            </div>
            <div className="flex-[50%]">
              <p className="font-bold text-gray-600">Phone Number :</p>
              <p className=" ml-8">{user?.personal?.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="my-4 pt-4 border-t-2 border-gray-600">
          <h3 className="text-lg font-bold mb-2 ml-2">Emergency Contacts</h3>
          {user?.personal?.emergencyContacts?.map((contact) => {
            return (
              <div key={contact.name} className="flex w-full mb-2 ml-8">
                <div className="mr-4 flex-[50%]">
                  <p className="font-bold text-gray-600">Contact Name :</p>
                  <p className=" ml-8">{contact.name}</p>
                </div>
                <div className="flex-[50%]">
                  <p className="font-bold text-gray-600">Phone Number :</p>
                  <p className=" ml-8">{contact.number}</p>
                </div>
              </div>
            );
          })}
         
        </div>

        {
          user?.personal?.role?.name ==='DRIVER' && 

          <div className="my-4 pt-4 border-t-2 border-gray-600 w-full">
            <h3 className="text-lg font-bold mb-2 ml-2">Driver Details</h3>
            {
              user?.records &&
              <div className="flex w-full gap-16 h-fit">
                <div className="w-[300px] flex flex-col items-center">
                  <Pie data={chartData} />
                  <p className="w-fit text-sm">Performance Chart</p>
                </div>
                <div className="flex flex-col gap-4 mt-20">
                    <div className="w-[12rem] p-2 border border-gray-500 rounded-md flex justify-between">
                        <p>Pending Hires : </p>    
                        <p className="mr-4">{user?.pendingHires?.length}</p>                 
                    </div>
                    <div className="w-[12rem] p-2 border border-gray-500 rounded-md flex justify-between">
                        <p>Cancelled Hires : </p>   
                        <p className="mr-4">{user?.cancelled?.length}</p>                     
                    </div>
                    <div className="w-[12rem] p-2 border border-gray-500 rounded-md flex justify-between">
                        <p>Completed Hires : </p> 
                        <p className="mr-4">{user?.completedHires?.length}</p>                       
                    </div>
                    <div className="w-[12rem] p-2 border border-gray-500 rounded-md flex justify-between">
                        <p>Total Hires : </p>            
                        <p className="mr-4">{user?.pendingHires?.length}</p>            
                    </div>
                </div>
              </div>

            }
        </div>
        }
        
      </div>
      <div className="w-full flex justify-end">
        <ReactToPrint
          bodyClass="print-userreport"
          content={() => ref.current}
          trigger={() => (
            <button className="px-4 py-2 text-white bg-actionBlue hover:bg-gray-800 focus:outline-none rounded-md mr-4">
              Print
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default UserReport;
