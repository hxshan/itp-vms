import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/api/axios";
import { ToastContainer, toast } from "react-toastify";
import { vehicalInstance } from "./constants";
import { ClipLoader } from "react-spinners";
import ViewVehical from "./ViewVehical";
import Swal from "sweetalert2";

const AddContract = () => {
  const params = useParams();

  const navigate = useNavigate();

  const clientID = params.id;

  const Insu_pov = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const pol_num = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
  const cov_num = /^\d+(\.\d+)?$/;

  const [clientdet, setClientdet] = useState({
    id: "loading",
    first_name: "Shaheed ",
    last_name: "Wajee",
    number: "loading",
    email: "loading",
    client_NIC: "loading",
  });

  const [vehicalDet, setVehicalDet] = useState({
    vehical_ID: "loading",
    year: "loading",
    VIN: "loading",
    model: "loading",
  });

  const [ContractData, setContractData] = useState({
    clientID: "",
    Vehical_Type: "",
    Vehical: "",
    contract_SD: "",
    contract_ED: "",
    Insurance_Source: "",
    Insurace_provider: "",
    Policy_Number: "",
    Coverage_Type: "",
    Coverage_Amount: "",
    Deductible: "",
    Insurance_SD: "",
    Insurance_ED: "",
    Insurance_notes: "",
    Payment_Amount: "",
    Payment_Plan: "",
    Payment_Date: "",
    Amount_Payed: "",
  });

  const [vehicalDat, setvehicalDat] = useState();
  const [client, clientError, clientLoading, clientFetch] = useAxios();
  const [contract, conError, conLoading, conFetch] = useAxios();
  const [vehiclesData, vehiclesError, vehiclesLoading, axiosFetchVehicles] =
    useAxios();

  const [vehicleData, vehicleError, vehicleLoading, axiosFetchVehicle] =
    useAxios();

  const [openVehical, setopenVehical] = useState(false);

  const [vehcleTypes, setVehcleTypes] = useState([
    "Car",
    "Van",
    "Bus",
    "lorry",
  ]);

  const [EstimatedTime, setEstimatedTime] = useState("");

  const getClient = () => {
    clientFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getClient/${clientID}`,
    });
  };

  const fetchVehicleDetails = () => {
    axiosFetchVehicles({
      axiosInstance: axios,
      method: "GET",
      url: "/contract/vehicals",
    });
  };

  const fetchvehicaldat = () => {
    axiosFetchVehicle({
      axiosInstance: axios,
      method: "GET",
      url: `/contract/getvehical/${ContractData.Vehical}`,
    });
  };

  useEffect(() => {
    if (vehiclesError) {
      alert(vehiclesError);
    } else if (vehiclesData) {
      setvehicalDat(vehiclesData);
    }
  }, [vehiclesData]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const filterVehicles = () => {
    const selectedVehicles = vehiclesData.filter(
      (vehicle) =>
        vehicle.category.toLowerCase() ===
        ContractData.Vehical_Type.toLowerCase()
    );

    const filteredByAvailability = selectedVehicles.filter((vehicle) => {
      // Check if any availability record overlaps with the specified date range
      return !vehicle.availability.some((availability) => {
        return (
          (availability.unavailableStartDate <= ContractData.contract_SD &&
            availability.unavailableEndDate >= ContractData.contract_ED) ||
          (availability.unavailableStartDate >= ContractData.contract_SD &&
            availability.unavailableStartDate <= ContractData.contract_ED) ||
          (availability.unavailableEndDate >= ContractData.contract_SD &&
            availability.unavailableEndDate <= ContractData.contract_ED)
        );
      });
    });

    setFilteredVehicles(filteredByAvailability);

    if (filteredByAvailability === 0) {
      toast.error("No Vehicals available");
    }
  };

  useEffect(() => {
    if (ContractData.Vehical_Type) {
      if (ContractData.contract_SD && ContractData.contract_ED) {
        filterVehicles();
      }
    }
  }, [
    ContractData.Vehical_Type,
    ContractData.contract_SD,
    ContractData.contract_ED,
  ]);

  useEffect(() => {
    if (filteredVehicles.length === 0) {
      toast.error("No vehical available");
    }
  }, [filteredVehicles]);

  const HandleInput = (e) => {
    const { name, value } = e.target;

    if (name === "contract_SD" || name === "contract_ED") {
      if (name === "contract_SD" && ContractData.contract_ED) {
        const result = inRange(value, ContractData.contract_ED);
        if (result === "INRANGE") {
          setEstimatedTime(
            calculateDateDiff(
              new Date(value),
              new Date(ContractData.contract_ED)
            )
          );
        } else {
          setEstimatedTime(result);
        }
      } else if (name === "contract_ED" && ContractData.contract_SD) {
        const result = inRange(ContractData.contract_SD, value);
        if (result === "INRANGE") {
          setEstimatedTime(
            calculateDateDiff(
              new Date(ContractData.contract_SD),
              new Date(value)
            )
          );
        } else {
          setEstimatedTime(result);
        }
      }
    }
    if (name === "Vehical_Type") {
      if (ContractData.contract_ED && ContractData.contract_SD) {
        ContractData.Vehical = "";
      }
    }

    setContractData({
      ...ContractData,
      [name]: value,
    });
  };

  const calculateDateDiff = (startDate, endDate) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let output = [];

    if (diffDays >= 365) {
      const diffYears = Math.floor(diffDays / 365);
      output.push(`${diffYears} year${diffYears !== 1 ? "s" : ""}`);
      diffDays -= diffYears * 365;
    }

    if (diffDays >= 30) {
      const diffMonths = Math.floor(diffDays / 30);
      output.push(`${diffMonths} month${diffMonths !== 1 ? "s" : ""}`);
      diffDays -= diffMonths * 30;
    }

    if (diffDays > 0) {
      output.push(`${diffDays} day${diffDays !== 1 ? "s" : ""}`);
    }

    return output.join(" and ");
  };

  const inRange = (startDate, endDate) => {
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    const minstartDate = tommorow.toISOString().split("T")[0];

    if (startDate < minstartDate) {
      return "Contract start date cannot be current date or past dates";
    } else if (endDate < minstartDate) {
      return "Contract end date connot be lower than contract start date";
    } else if (startDate > endDate) {
      return "contract start date cannot be greater than contract end date";
    } else if (startDate === endDate) {
      return "contract end date should be one day after Contract start date";
    } else {
      return "INRANGE";
    }
  };

  const HandleSubmit = async (e) => {
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    const minstartDate = tommorow.toISOString().split("T")[0];

    e.preventDefault();

    if (!ContractData.Vehical_Type) {
      toast.error("Please select vehical type");
      return;
    } else if (!ContractData.contract_SD) {
      toast.error("Invalid contract start date");
      return;
    } else if (!ContractData.contract_ED) {
      toast.error("Invalid contract end date");
      return;
    } else if (ContractData.contract_SD < minstartDate) {
      toast.error("Contract start date cannot be current date or past dates ");
      return;
    } else if (ContractData.contract_ED < minstartDate) {
      toast.error("Contract end date connot be lower than contract start date");
      return;
    } else if (ContractData.contract_SD > ContractData.contract_ED) {
      toast.error(
        "contract start date cannot be greater than contract end date"
      );
      return;
    } else if (ContractData.contract_SD === ContractData.contract_ED) {
      toast.error(
        "contract end date should be one day after Contract start date"
      );
      return;
    } else if (!ContractData.Vehical) {
      toast.error("please select vehical");
      return;
    } else if (!ContractData.Insurance_Source) {
      toast.error("please select Insurance source");
      return;
    } else if (
      !ContractData.Insurace_provider ||
      !ContractData.Insurace_provider.match(Insu_pov)
    ) {
      toast.error("Invalid insurance provider");
      return;
    } else if (
      !ContractData.Policy_Number ||
      !ContractData.Policy_Number.match(pol_num)
    ) {
      toast.error("Invalid policy number");
      return;
    } else if (!ContractData.Coverage_Type) {
      toast.error("please select coverage type");
      return;
    } else if (
      !ContractData.Coverage_Amount ||
      !ContractData.Coverage_Amount.match(cov_num)
    ) {
      toast.error("Invalid coverage amount");
      return;
    } else if (
      !ContractData.Deductible ||
      !ContractData.Deductible.match(cov_num)
    ) {
      toast.error("Invalid detuctible amount");
      return;
    } else if (!ContractData.Insurance_SD) {
      toast.error("Enter isurance start date");
      return;
    } else if (!ContractData.Insurance_ED) {
      toast.error("Enter insurance end date");
      return;
    } else if (ContractData.Insurance_ED < minstartDate) {
      toast.error(
        "Insurance end date connot be lower than Insurance start date"
      );
      return;
    } else if (ContractData.Insurance_SD > ContractData.Insurance_ED) {
      toast.error(
        "Insurance start date cannot be greater than Insurance end date"
      );
      return;
    } else if (ContractData.contract_SD === ContractData.Insurance_ED) {
      toast.error(
        "Insurance end date should be one day after Insurance start date"
      );
      return;
    } else if (
      !ContractData.Payment_Amount ||
      !ContractData.Payment_Amount.match(cov_num)
    ) {
      toast.error("Invalid payment amount");
      return;
    } else if (!ContractData.Payment_Plan) {
      toast.error("please select payment plan");
      return;
    } else if (!ContractData.Payment_Date) {
      toast.error("please enter payment date");
      return;
    } else if (
      !ContractData.Amount_Payed ||
      !ContractData.Amount_Payed.match(cov_num)
    ) {
      toast.error("Invalid amount payed");
      return;
    }

    await conFetch({
      axiosInstance: axios,
      method: "POST",
      url: `/contract/${clientID}/create`,
      requestConfig: {
        data: { ...ContractData },
      },
    });
  };

  useEffect(() => {
    if (!conLoading) {
      if (conError) {
        alert(conError);
      } else if (contract.message === "client dosent exist") {
        alert("Client does not exist");
      } else if (
        contract.message === "An active contract exists for this client"
      ) {
        alert("An active contract exists for this client");
      } else if (contract.message === "contract created successfully") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Contract created succesfully",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => {
          navigate(`/viewClient/${clientID}`, {
            replace: true,
            state: { forceRefresh: true },
          });
        });
      }
    }
  }, [conLoading]);

  useEffect(() => {
    if (client) {
      setClientdet({
        first_name: client.firstName,
        last_name: client.lastName,
        number: client.phoneNumber,
        email: client.email,
        client_NIC: client.nicNumber,
      });

      setContractData({
        ...ContractData,
        clientID: client._id,
      });
    }
  }, [client]);

  useEffect(() => {
    if (ContractData.Vehical || ContractData.Vehical === "") {
      fetchvehicaldat();
    }
  }, [ContractData.Vehical]);

  useEffect(() => {
    getClient();
    fetchVehicleDetails();
  }, []);

  if (vehiclesLoading || clientLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="sweet-loading">
          <ClipLoader color="#10971D" loading={true} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      <div className="flex items-center justify-center mb-4 border-b-2">
        <p className=" text-[50px] font-bold ">ADD CONTRACT</p>
      </div>
      <ToastContainer />
      <div className="shadow-xl bg-white  w-[90%] h-fit rounded-lg py-8 flex justify-evenly">
        <div>
          <div className=" w-fit h-fit  pb-8 rounded-xl">
            <div>
              <p className=" text-[25px] font-bold">Client details</p>
            </div>

            <div className="flex mt-3">
              <div>
                <p>Client name</p>
                <p className=" text-[#000ac2] font-semibold">
                  {clientdet.first_name == ""
                    ? "loading"
                    : clientdet.first_name + " " + clientdet.last_name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-10 mt-3">
                <div>
                  <p>Client email</p>
                  <p className=" text-[#000ac2] font-semibold">
                    {clientdet.email}
                  </p>
                </div>

                <div>
                  <p>Client National ID</p>
                  <p className=" text-[#000ac2] font-semibold">
                    NIC {clientdet.client_NIC}
                  </p>
                </div>
              </div>
              <div>
                <p>Phone number</p>
                <p className=" text-[#000ac2] font-semibold">
                  {clientdet.number}
                </p>
              </div>
            </div>
          </div>

          <div className="  w-fit h-fit  pb-8 rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Rental Info</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Vehical Type</label>
              <select
                name="Vehical_Type"
                onChange={HandleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option className="hidden">Please select</option>
                {vehcleTypes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Start date</label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="contract_SD"
                    onChange={HandleInput}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>End date</label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="contract_ED"
                    onChange={HandleInput}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <p>Estimated duration</p>
                <p
                  className={`text-[#000ac2] ${
                    EstimatedTime ? " text-red-500" : ""
                  } font-bold`}
                >
                  {EstimatedTime ? EstimatedTime : "please choose dates"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <p>Vehical Instance</p>
              <select
                name="Vehical"
                onChange={HandleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={ContractData.Vehical}
              >
                <option className="hidden" value={""}>
                  please select
                </option>
                {filteredVehicles.map((item, index) => (
                  <option value={item._id}>{item.vehicleRegister}</option>
                ))}
              </select>
            </div>
            <button
              className=" bg-orange-400 text-white px-5 py-2 rounded-lg w-[150px] font-bold mt-6 "
              onClick={() => {
                setopenVehical(!openVehical);
              }}
            >
              Show vehical
            </button>

            <ViewVehical
              vehicalData={vehicleData}
              Toggle={() => {
                setopenVehical(!openVehical);
              }}
              isOpen={openVehical}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="  w-fit h-fit  pb-8 rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Insurance Info</p>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <label>Insurance source</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Insurance_Source"
                onChange={HandleInput}
              >
                <option className="hidden" value="">
                  please select
                </option>
                <option value="Client">Client</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Name of Insurance provider</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Insurace_provider"
                  onChange={HandleInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Policy number</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Policy_Number"
                  onChange={HandleInput}
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Coverage Type</label>

              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Coverage_Type"
                onChange={HandleInput}
              >
                <option className="hidden" value="">
                  please select
                </option>
                <option value="Liability">Liability</option>
                <option value="comprehensive">comprehensive</option>
                <option value="collision">collision</option>
              </select>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Coverage amount</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Coverage_Amount"
                  onChange={HandleInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Deductible</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Deductible"
                  onChange={HandleInput}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-1">
                <label>Start date</label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Insurance_SD"
                  onChange={HandleInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>End date</label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Insurance_ED"
                  onChange={HandleInput}
                />
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <label>Additianol notes</label>
              <textarea
                className="h-[200px] w-[456px]  shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Insurance_notes"
                onChange={HandleInput}
              ></textarea>
            </div>
          </div>
          <div className="  w-fit h-fit rounded-xl ">
            <div>
              <p className="text-[25px] font-bold">Payment Info</p>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Payment_Amount"
                onChange={HandleInput}
              />
            </div>

            <div className="flex gap-12 mt-3">
              <div className="flex flex-col gap-1">
                <label>Payment plan</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Payment_Plan"
                  onChange={HandleInput}
                >
                  <option className="hidden" value="">
                    Please select
                  </option>
                  <option value="upFront">upFront</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label>Payment date</label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="Payment_Date"
                  onChange={HandleInput}
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <label>Amount payed</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="Amount_Payed"
                onChange={HandleInput}
              />
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <p>Amount Due</p>
              <p>
                {ContractData.Amount_Payed && ContractData.Payment_Amount
                  ? (
                      ContractData.Payment_Amount - ContractData.Amount_Payed
                    ).toLocaleString()
                  : "Calculating"}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className=" bg-actionBlue text-white px-5 py-2 rounded-lg w-[150px] font-bold "
              onClick={HandleSubmit}
            >
              Add
            </button>
            <button
              className=" bg-actionRed text-white px-5 py-2 rounded-lg w-[150px] font-bold "
              onClick={() => {
                navigate(`/viewClient/${clientID}`);
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

export default AddContract;
