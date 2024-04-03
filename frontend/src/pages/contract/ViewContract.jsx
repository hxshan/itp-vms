import React, { useEffect, useState } from "react";
import useAxiosGet from "@/hooks/useAxiosGet";
import { useNavigate, useParams } from "react-router-dom";


const ViewContract = () => {
  const params = useParams();

  const navigate = useNavigate()

  const contractID = params.id;

  const [contractData, setContractData] = useState({
    _id: "",
    Vehical: "",
    contract_SD: "loading",
    contract_ED: "loading",
    Insurance_Source: "loading",
    Insurace_provider: "loading",
    Policy_Number: "loading",
    Coverage_Type: "loading",
    Coverage_Amount: "loading",
    Deductible: "loading",
    Insurance_SD: "loading",
    Insurance_ED: "loading",
    Insurance_notes: "loading",
    Payment_Amount: "loading",
    Payment_Plan: "loading",
    Payment_Date: "loading",
    Amount_Payed: "loading",
  });

  const [clientData, setclientData] = useState({
    _id: "",
    firstName: "loading",
    lastName: "loading",
    phoneNumber: "loading",
    nicNumber: "loading",
    email: "loading",
  });

  const {
    data: Contract,
    error,
    isLoading,
    refetch,
  } = useAxiosGet(`/contract/getContract/${contractID}`);

  useEffect(() => {
    if (Contract) {
      setContractData({
        _id: Contract._id,
        Vehical: Contract.Vehical,
        contract_SD: Contract.contract_SD,
        contract_ED: Contract.contract_ED,
        Insurance_Source: Contract.Insurance_Source,
        Insurace_provider: Contract.Insurace_provider,
        Policy_Number: Contract.Policy_Number,
        Coverage_Type: Contract.Coverage_Type,
        Coverage_Amount: Contract.Coverage_Amount,
        Deductible: Contract.Deductible,
        Insurance_SD: Contract.Insurance_SD,
        Insurance_ED: Contract.Insurance_ED,
        Insurance_notes: Contract.Insurance_notes,
        Payment_Amount: Contract.Payment_Amount,
        Payment_Plan: Contract.Payment_Plan,
        Payment_Date: Contract.Payment_Date,
        Amount_Payed: Contract.Amount_Payed,
      });

      setclientData({
        _id: Contract.clientID._id,
        firstName: Contract.clientID.firstName,
        lastName: Contract.clientID.lastName,
        phoneNumber: Contract.clientID.phoneNumber,
        nicNumber: Contract.clientID.nicNumber,
        email: Contract.clientID.email,
      });
    }
  }, [Contract]);

  return (
    <div>
      <div className="flex items-center justify-center ">
        <h1 className=" text-[50px] font-bold ">Contract View</h1>
      </div>

      <div className="bg-[#D9D9D9] h-fit rounded-lg py-4 flex flex-col justify-evenly my-4 w-full">
        <div className="flex w-full justify-end pr-5">
        <button className=" bg-green-600 px-5 py-2 rounded-xl" onClick={()=> navigate(`/EditContract/${contractData._id}`)}>Edit</button>
        </div>
        <div className="flex justify-evenly">
        <div >
          <div className=" w-fit h-fit  pb-8 rounded-xl">
            <div>
              <p className=" text-[25px] font-bold">Client details</p>
            </div>

            <div className="flex mt-3">
              <div>
                <p>Client name</p>
                <p className=" text-[#000ac2] font-semibold">
                  {clientData.firstName} {clientData.lastName}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-28 mt-3">
                <div>
                  <p>Client email</p>
                  <p className=" text-[#000ac2] font-semibold">
                    {clientData.email}
                  </p>
                </div>

                <div>
                  <p>Client National ID</p>
                  <p className=" text-[#000ac2] font-semibold">
                    {clientData.nicNumber}
                  </p>
                </div>
              </div>
              <div>
                <p>Phone number</p>
                <p className=" text-[#000ac2] font-semibold">
                  {clientData.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="  w-fit h-fit  pb-8 rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Rental Info</p>
            </div>

            <div>
              <p>Contract Start Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_SD}
              </p>
            </div>
            <div>
              <p>Contract End Date</p>
              <p className=" text-[#000ac2] font-semibold">
                {contractData.contract_SD}
              </p>
            </div>
          </div>

          <div className="  w-fit h-fit  rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Vehical Info</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
        
          <div className="  w-fit h-fit  pb-8 rounded-xl">
            <div>
              <p className="text-[25px] font-bold">Insurance Info</p>
              
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <label>Insurance source</label>
              <p>{contractData.Insurance_Source}</p>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Name of Insurance provider</label>
                <p>{contractData.Insurace_provider}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Policy number</label>
                <p>{contractData.Policy_Number}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Coverage Type</label>
              <p>{contractData.Coverage_Type}</p>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Coverage amount</label>
                <p>{contractData.Coverage_Amount}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Deductible</label>
                <p>{contractData.Deductible}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Start date</label>
                <p>{contractData.Insurance_SD}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>End date</label>
                <p>{contractData.Insurance_ED}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <label>Additianol notes</label>
              <p>{contractData.Insurance_notes}</p>
            </div>
          </div>
          <div className="  w-fit h-fit rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Payment Info</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount</label>
              <p>{contractData.Payment_Amount}</p>
            </div>

            <div className="flex gap-12 mt-3">
              <div className="flex flex-col gap-1">
                <label>Payment plan</label>
                <p>{contractData.Payment_Plan}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Payment date</label>
                <p>{contractData.Payment_Date}</p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount payed</label>
              <p>{contractData.Amount_Payed}</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <p>Amount Due</p>
              <p>{contractData.Payment_Amount - contractData.Amount_Payed}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ViewContract;
