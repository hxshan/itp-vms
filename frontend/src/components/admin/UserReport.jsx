import { useEffect, useState, useRef } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import ReactToPrint from "react-to-print";

const UserReport = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const [user, error, loading, axiosFetch] = useAxios();
  const [image, setImage] = useState("");
  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/user/report/${id}`,
    });
  };
  useEffect(() => {
    console.log(user);
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

  //<img src={`http://localhost:3000/employee_picture/${image}`} alt="image"/>
  return (
    <div className="w-full bg-white  rounded-lg shadow-md mb-12 pb-8">
      <div ref={ref} className=" flex flex-col p-12 mt-8">
        <h1 className="text-2xl w-full text-center font-bold mb-8">
          Comprehensive User Report
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
              <p className="font-bold text-gray-600">Job Title:</p>
              <p className="ml-8">
                {user?.personal?.jobTitle}
              </p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">department here</p>
              <p className="ml-8">{user?.personal?.email}</p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Role</p>
              <p className="ml-8">{user?.personal?.role?.name}</p>
            </div>
            <div className="flex flex-col  w-fit ml-4">
              <p className="font-bold text-gray-600">Nic Number:</p>
              <p className="ml-8">{user?.personal?.nicNumber}</p>
            </div>
          </div>
        </div>
        <div className="my-4 pt-4 border-t-2 border-gray-600">
          <h3 className="text-lg font-bold mb-2 ml-2">Contact Information</h3>
          <div className="flex w-full ml-8">
            <div className="mr-4 flex-[50%]">
              <p className="font-bold text-gray-600">Email:</p>
              <p className=" ml-8">{user?.personal?.email}</p>
            </div>
            <div className="flex-[50%]">
              <p className="font-bold text-gray-600">Phone Number:</p>
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
                  <p className="font-bold text-gray-600">Contact Name:</p>
                  <p className=" ml-8">{contact.name}</p>
                </div>
                <div className="flex-[50%]">
                  <p className="font-bold text-gray-600">Phone Number:</p>
                  <p className=" ml-8">{contact.number}</p>
                </div>
              </div>
            );
          })}
         
        </div>

        <div className="my-4 pt-4 border-t-2 border-gray-600">
          <h3 className="text-lg font-bold mb-2">Driver Details</h3>
          {/* 
          remider to add a chart and the hire data if its a driver along with the report
          */}

        </div>
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
