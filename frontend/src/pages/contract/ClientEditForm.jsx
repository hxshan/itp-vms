import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { formatVal } from "./constants";
import { ToastContainer, toast } from 'react-toastify';

const ClientEditForm = () => {
  const params = useParams();

  const navigate = useNavigate();

  const clientID = params.id;

  const [clientData, setclientData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    nicNumber: "",
    email: "",
    licenceNumber: "",
    Address: "",
    Comp_Available: "",
    Comp_Name: "",
    Reg_Num: "",
    Tax_Num: "",
    Legal_struc: "",
    Comp_Email: "",
    Comp_Phone: "",
    Comp_Address: "",
  });

  const [client, clientError, clientLoading, ClientFetch] = useAxios();
  const [updateRES, updateError, updateLoading , UpdateFetch] = useAxios();

  const [formatDOB, setformatDOB] = useState("");
  const [openComp, setopenComp] = useState(false);

  const getClient = () => {
    ClientFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getClient/${clientID}`,
    });
  };

  const updatClient = async () =>{
    await UpdateFetch({
        axiosInstance: axios,
      method: "PATCH",
      url: `/contract/updateClient/${clientID}`,
      requestConfig:{
        data:clientData,
       }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()


    if (!clientData.firstName || !clientData.firstName.match(formatVal.nameReg)) {
        toast.error("Invalid First Name");
        return;
    } else if (!clientData.lastName || !clientData.lastName.match(formatVal.nameReg)) {
        toast.error("Invalid Last Name");
        return;
    } else if (!clientData.gender) {
        toast.error("Invalid Gender");
        return;
    } else if (!clientData.dob) {
        toast.error("Enter Date of Birth");
        return;
    } else {
        const birthDate = new Date(clientData.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            toast.error("Age should be greater than 18");
            return;
        }
    }
    if (!clientData.phoneNumber || !clientData.phoneNumber.match(formatVal.phoneReg)) {
        toast.error("Invalid Phone number");
        return;
    } else if (!clientData.nicNumber || !clientData.nicNumber.match(formatVal.nicReg)) {
        toast.error("Invalid NIC number");
        return;
    } else if (!clientData.email || !clientData.email.match(formatVal.emailReg)) {
        toast.error("Invalid Email Address");
        return;
    } else if (clientData.licenceNumber && !clientData.licenceNumber.match(formatVal.licenseReg)) {
        toast.error("Invalid license number");
        return;
    } else if (!clientData.Address) {
        toast.error("Enter Address");
        return;
    } else if (clientData.Comp_Available) {
        if (!clientData.Comp_Name) {
            toast.error("Enter Company Name");
            return;
        } else if (!clientData.Reg_Num || !clientData.Reg_Num.match(formatVal.regNumReg)) {
            toast.error("Invalid Registration number");
            return;
        } else if (!clientData.Tax_Num || !clientData.Tax_Num.match(formatVal.taxNumReg)) {
            toast.error("Invalid Tax number");
            return;
        } else if (!clientData.Legal_struc) {
            toast.error("Please select Legal Structure");
            return;
        } else if (!clientData.Comp_Email || !clientData.Comp_Email.match(formatVal.emailReg)) {
            toast.error("Invalid Company email");
            return;
        } else if (!clientData.Comp_Phone || !clientData.Comp_Phone.match(formatVal.phoneReg)) {
            toast.error("Invalid Company Phone number");
            return;
        } else if (!clientData.Comp_Address) {
            toast.error("Enter Company Address");
            return;
        }
    }


    await updatClient()
    navigate(`/viewClient/${clientID}`)
  }

  useEffect(() => {
    if (client) {
      setclientData({
        firstName: client.firstName,
        lastName: client.lastName,
        gender: client.gender,
        dob: client.dob,
        phoneNumber: client.phoneNumber,
        nicNumber: client.nicNumber,
        email: client.email,
        licenceNumber: client.licenceNumber,
        Address: client.Address,
        Comp_Available: client.Comp_Available,
        Comp_Name: client.Comp_Name,
        Reg_Num: client.Reg_Num,
        Tax_Num: client.Tax_Num,
        Legal_struc: client.Legal_struc,
        Comp_Email: client.Comp_Email,
        Comp_Phone: client.Comp_Phone,
        Comp_Address: client.Comp_Address,
      });
      if (client.dob) {
        setformatDOB(new Date(client.dob).toISOString().split("T")[0]);
      }
      if (client.Comp_Available) {
        setopenComp(true);
      } else {
        setopenComp(false);
      }
    }
  }, [client]);

  console.log(clientData.Comp_Available)

  useEffect(() => {
    if (clientData.dob) {
      setformatDOB(new Date(clientData.dob).toISOString().split("T")[0]);
    }
  }, [clientData]);

  const HandleInput = (e) => {
    const { name, value } = e.target;

    if (name === "Comp_Available") {
      if (value === "true") {
        setopenComp(true);
        setclientData({
            ...clientData,
            Comp_Available: true
        })
      } else {
        setopenComp(false);
        setclientData({
          ...clientData,
          Comp_Available:false,
          Comp_Name:'',
          Reg_Num: '',
          Tax_Num: '',
          Legal_struc: '',
          Comp_Email: '',
          Comp_Phone: '',
          Comp_Address: '',
        });
      }
    }else{
        setclientData({
            ...clientData,
            [name]: value,
          });  
    }

    
  };

  console.log(clientData)
  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      <div className="flex items-center justify-center mb-4">
        <p className=" text-[50px] font-bold ">EDIT CLIENT</p>
        <ToastContainer/>
      </div>

      <div className="bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-8 flex justify-evenly ">
        <div>
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>First Name</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="firstName"
                value={clientData.firstName}
                onChange={HandleInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Last Name</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="lastName"
                value={clientData.lastName}
                onChange={HandleInput}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Gender</label>
              <select
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="gender"
                value={clientData.gender}
                onChange={HandleInput}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label>Date of Birth</label>
              <input
                type="date"
                className="w-[150px] h-10 rounded-lg  bg-white border-none px-2"
                name="dob"
                value={formatDOB}
                onChange={HandleInput}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Phone number</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="phoneNumber"
                value={clientData.phoneNumber}
                onChange={HandleInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>NIC number</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="nicNumber"
                value={clientData.nicNumber}
                onChange={HandleInput}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="email"
                value={clientData.email}
                onChange={HandleInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>licence number</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                placeholder="optional"
                name="licenceNumber"
                value={clientData.licenceNumber}
                onChange={HandleInput}
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label>Address</label>
            <textarea
              className="h-[200px] w-[456px]  border-none rounded-lg mt-1"
              name="Address"
              value={clientData.Address}
              onChange={HandleInput}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div>
              <div className="flex flex-col gap-1 mb-3">
                <label>Company Available</label>
                <select
                  className="w-[120px]  rounded-lg  bg-white border-none p-2"
                  name="Comp_Available"
                  value={clientData.Comp_Available}
                  onChange={HandleInput}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className={`${openComp ? "" : " invisible"}`}>
                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1 ">
                    <label>Company name</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Comp_Name"
                      value={clientData.Comp_Name}
                      onChange={HandleInput}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Registration number</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Reg_Num"
                      value={clientData.Reg_Num}
                      onChange={HandleInput}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label>Tax number</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Tax_Num"
                      value={clientData.Tax_Num}
                      onChange={HandleInput}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Legal structure</label>
                    <select
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Legal_struc"
                      value={clientData.Legal_struc}
                      onChange={HandleInput}
                    >
                        <option value="" className="hiddden">Please select</option>
                      <option value="Sole Proprietorship">
                        Sole Proprietorship
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Limited Liability Company">
                        Limited Liability Company (LLC)
                      </option>
                      <option value="Corporation">Corporation</option>
                      <option value="Nonprofit Organization">
                        Nonprofit Organization
                      </option>
                      <option value="Professional Corporation">
                        Professional Corporation (PC)
                      </option>
                      <option value="Professional Limited Liability Company">
                        Professional Limited Liability Company (PLLC)
                      </option>
                      <option value="Benefit Corporation">
                        Benefit Corporation (B Corp)
                      </option>
                      <option value="Joint Venture">Joint Venture</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="flex flex-col gap-1">
                    <label>Company email</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Comp_Email"
                      value={clientData.Comp_Email}
                      onChange={HandleInput}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Company phone</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Comp_Phone"
                      value={clientData.Comp_Phone}
                      onChange={HandleInput}
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label>Address</label>
                  <textarea
                    className="h-[200px] w-[456px]  border-none rounded-lg mt-1"
                    name="Comp_Address"
                    value={clientData.Comp_Address}
                    onChange={HandleInput}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className=" bg-green-600 px-5 py-2 rounded-xl w-[120px] " onClick={handleSubmit}>
              Submit
            </button>
            <button className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px] " onClick={()=>{navigate(`/viewClient/${clientID}`)}}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientEditForm;
