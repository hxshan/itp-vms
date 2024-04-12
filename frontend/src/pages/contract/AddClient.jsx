import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import { formatVal } from "./constants";



const AddClient = () => {
  const navigate = useNavigate();

  const [openComp, setopenComp] = useState(false);

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


  const [client, error, isLoading, FetchClient] = useAxios();

  useEffect(()=>{
    if(!isLoading){
      if(error){
        alert(error)
      }else if(client.message === "client created succesfully" ){
        navigate('/client')
      }else{
        console.log(client)
      }
    }
  },[isLoading])

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "Comp_Available") {
      const isCompanyAvailable = value === "true";

      if (!isCompanyAvailable) {
        setclientData({
          ...clientData,
          Comp_Available: "false",
          Comp_Name: "",
          Reg_Num: "",
          Tax_Num: "",
          Legal_struc: "",
          Comp_Email: "",
          Comp_Phone: "",
          Comp_Address: "",
        });
        setopenComp(false);
      } else {
        setopenComp(true);
        setclientData({
          ...clientData,
          Comp_Available: "true",
        });
      }
    } else {
      setclientData({
        ...clientData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    

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
    } else if (!clientData.Comp_Available) {
        toast.error("Choose Company Availability");
        return;
    } else if (!clientData.Comp_Available) {
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


    
      
         await FetchClient({
          axiosInstance: axios,
          method: "POST",
          url: `/contract/createClient`,
          requestConfig: {
            data: { ...clientData },
          },
        })

        

        

  };

  



  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      <div className="flex items-center justify-center mb-4">
        <p className=" text-[50px] font-bold ">ADD CLIENT</p>
        <ToastContainer/>
      </div>
      <p>{error}</p>
      <div className="bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-8 flex justify-evenly ">
        <div>
          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>First Name</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="firstName"
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Last Name</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="lastName"
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-3">
            <div className="flex flex-col gap-1">
              <label>Gender</label>
              <select
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="gender"
                onChange={handleInput}
              >
                <option className="hidden">please select</option>
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
                onChange={handleInput}
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
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>NIC number</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                name="nicNumber"
                onChange={handleInput}
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
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>licence number</label>
              <input
                type="text"
                className="w-[220px]  rounded-lg  bg-white border-none p-2"
                placeholder="optional"
                name="licenceNumber"
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label>Address</label>
            <textarea
              className="h-[200px] w-[456px]  border-none rounded-lg mt-1"
              name="Address"
              onChange={handleInput}
            ></textarea>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label>Upload NIC</label>
            <input type="file" />
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
                  onChange={handleInput}
                >
                  <option className="hidden">please select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                      onChange={handleInput}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Registration number</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Reg_Num"
                      onChange={handleInput}
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
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Legal structure</label>
                    <select
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Legal_struc"
                      onChange={handleInput}
                    >
                      <option className="hidden" value="">
                        please select
                      </option>
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
                      onChange={handleInput}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label>Company phone</label>
                    <input
                      type="text"
                      className="w-[220px]  rounded-lg  bg-white border-none p-2"
                      name="Comp_Phone"
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label>Address</label>
                  <textarea
                    className="h-[200px] w-[456px]  border-none rounded-lg mt-1"
                    name="Comp_Address"
                    onChange={handleInput}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className=" bg-green-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px] "
              onClick={() => {
                navigate(`/client`);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
