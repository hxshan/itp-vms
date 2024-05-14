import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import ReactToPrint from "react-to-print";
import { ClipLoader } from "react-spinners";

const ViewClient = () => {
  const params = useParams();

  const navigate = useNavigate();

  const clientID = params.id;

  const [ConExist, setConExist] = useState();

  const [deleClient, delError, delLoading, fetchDel] = useAxios();

  const DeleteClient = async () => {
    await fetchDel({
      axiosInstance: axios,
      method: "DELETE",
      url: `/contract/deleteClient/${clientID}`,
    });
  };

  const HandleDelete = () => {
    const confirm = window.confirm("This client will be deleted");

    if (confirm) {
      DeleteClient().then(function (res) {
        console.log(res);
      });
    } else {
      return;
    }
  };

  const [clientData, setclientData] = useState({
    firstName: "loading",
    lastName: "loading",
    gender: "loading",
    dob: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
    licenceNumber: "loading",
    Address: "loading",
    Comp_Available: "loading",
    Contract_Available: "loading",
  });

  const [compData, setcompData] = useState({
    Comp_Name: "loading",
    Reg_Num: "loading",
    Tax_Num: "loading",
    Legal_struc: "loading",
    Comp_Email: "loading",
    Comp_Phone: "loading",
    Comp_Address: "loading",
  });

  const [client, clientError, clientLoading, clientFetch] = useAxios();
  const [allContracts, contractError, contLoading, contFetch] = useAxios();

  const getallContracts = () => {
    contFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getAllContracts`,
    });
  };

  const getClient = () => {
    clientFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getClient/${clientID}`,
    });
  };
  useEffect(() => {
    if (!delLoading) {
      if (delError) {
        alert(delError);
      } else if (
        deleClient.message === "Client and contrat deleted successfully"
      ) {
        alert("Client and contrat deleted successfully");
        navigate("/client");
      } else if (deleClient.message === "Theres a ongoing contract") {
        alert("Theres a ongoing contract");
      } else if (deleClient.message === "Client deleted successfully") {
        alert("Client deleted successfully");
        navigate("/client");
      }
    }
  }, [delLoading]);

  useEffect(() => {
    if (client) {
      setclientData({
        firstName: client.firstName,
        lastName: client.lastName,
        gender: client.gender,
        dob: new Date(client.dob).toLocaleDateString(),
        phoneNumber: client.phoneNumber,
        nicNumber: client.nicNumber,
        email: client.email,
        licenceNumber: client.licenceNumber,
        Address: client.Address,
        Comp_Available: client.Comp_Available,
        Contract_Available: client.Contract_Available,
      });
      if (client.Comp_Available) {
        setcompData({
          Comp_Name: client.Comp_Name,
          Reg_Num: client.Reg_Num,
          Tax_Num: client.Tax_Num,
          Legal_struc: client.Legal_struc,
          Comp_Email: client.Comp_Email,
          Comp_Phone: client.Comp_Phone,
          Comp_Address: client.Comp_Address,
        });
      } else {
        setcompData({
          Comp_Name: "",
          Reg_Num: "",
          Tax_Num: "",
          Legal_struc: "",
          Comp_Email: "",
          Comp_Phone: "",
          Comp_Address: "",
        });
      }
    }
  }, [client]);

  //useEffect(()=>{
  //     if(allContracts){
  //        const existContract = allContracts.some(contract => contract.clientID._id === clientID);
  //       setConExist(existContract)
  //    }
  // },[allContracts,clientID])

  useEffect(() => {
    getClient();
    getallContracts();
  }, []);

  const ref = useRef(null);

  if (contLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sweet-loading">
          <ClipLoader color="#10971D" loading={true} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col   items-center">
      <div className="flex items-center justify-center mb-4 border-b-2 ">
        <h1 className=" text-[50px] font-bold ">Client View</h1>
      </div>

      <div className="bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-4 flex flex-col mb-6  ">
        <div className="flex justify-evenly" ref={ref}>
          <div>
            <div className="flex gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">First Name</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.firstName}
                </p>
              </div>

              <div className="flex flex-col gap-1 ml-6">
                <label className="font-semibold">Last Name</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.lastName}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Gender</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.gender}
                </p>
              </div>

              <div className="flex flex-col gap-1 ml-6">
                <label className="font-semibold">Date of Birth</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.dob}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Phone number</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.phoneNumber}
                </p>
              </div>

              <div className="flex flex-col gap-1 ml-6">
                <label className="font-semibold">NIC number</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.nicNumber}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Email</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.email}
                </p>
              </div>
              <div className="flex flex-col gap-1 ml-6">
                <label className="font-semibold">licence number</label>
                <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                  {clientData.licenceNumber ? clientData.licenceNumber : "None"}
                </p>
              </div>
            </div>

            <div className="flex flex-col mb-4 gap-1">
              <label className="font-semibold">Address</label>
              <textarea className="shadow appearance-none border rounded w-[400px] h-[100px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                {clientData.Address}
              </textarea>
            </div>

            <div className="flex flex-col mb-4 gap-1">
              <label className="font-semibold">Contract Available</label>
              <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                {clientData.Contract_Available === "Available"
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div>
                <div className="flex flex-col gap-1 mb-3">
                  <label className="font-semibold">Company Available</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {clientData.Comp_Available ? "Yes" : "No"}
                  </p>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1 ">
                    <label className="font-semibold">Company name</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Comp_Name ? compData.Comp_Name : "None"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 ml-6">
                    <label className="font-semibold">Registration number</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Reg_Num ? compData.Reg_Num : "None"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Tax number</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Tax_Num ? compData.Tax_Num : "None"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 ml-6">
                    <label className="font-semibold">Legal structure</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Legal_struc ? compData.Legal_struc : "None"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Company email</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Comp_Email ? compData.Comp_Email : "None"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 ml-6">
                    <label className="font-semibold">Company phone</label>
                    <p className="shadow appearance-none border rounded w-[180px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                      {compData.Comp_Phone ? compData.Comp_Phone : "None"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mb-4 gap-1">
                  <label className="font-semibold">Address</label>
                  <textarea className="shadow appearance-none border rounded w-[400px] h-[100px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white">
                    {compData.Comp_Address ? compData.Comp_Address : "None"}
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-5 gap-4">
          <button
            className={` ${
              clientData.Contract_Available === "Available" ? " hidden" : ""
            } bg-orange-400 text-white px-5 py-2 rounded-lg w-[150px] font-bold `}
            onClick={() => {
              navigate(`/Contract/${clientID}`);
            }}
          >
            Add contract
          </button>

          <button
            className=" bg-green-600 px-5 py-2 rounded-lg w-[150px] font-bold text-white"
            onClick={() => {
              navigate(`/EditClient/${clientID}`);
            }}
          >
            Edit
          </button>

          <button
            className=" bg-red-600 px-5 py-2 rounded-lg w-[150px] font-bold text-white"
            onClick={HandleDelete}
          >
            Delete
          </button>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
              <button className=" bg-blue-600 px-5 py-2 rounded-lg w-[150px] font-bold text-white ">
                Print
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
