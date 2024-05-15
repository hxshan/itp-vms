import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FaUser,FaShuttleVan,FaTools,FaCarCrash,FaFileContract   } from "react-icons/fa";
import { FaMapLocationDot,FaMoneyBillTrendUp,FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isLogged, setIsLogged] = useState(false);

  const [isOpen, setIsOpen] = useState({
    user: false,
    vehicle: false,
    maintenance: false,
    hire: false,
    emergency: false,
    contract: false,
    finance: false,
  });

  const toggleMenu = (menu) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleItemClick = (menu, subFunction) => {
    console.log(`Selected sub function under ${menu}: ${subFunction}`);
  };

  useEffect(() => {
    if (user?.accessToken) {
      setIsLogged(true);
    }
  }, [user]);

  if (!isLogged) {
    return (
      <div className="h-screen fixed z-10 top-0 left-0 flex w-20 lg:w-60">
        <div className=" bg-secondary text-white w-64 h-full flex flex-col items-start text-sm"></div>
      </div>
    );
  }
  return (
    <div className="h-screen fixed z-10 top-0 left-0 flex w-20 lg:w-60 dark:border-r dark:border-black border-opacity-5">
      <div className=" bg-secondary dark:bg-[#12001C]  text-white w-64 h-full flex flex-col items-start text-sm pt-[90px] gap-1">
        {user?.permissions?.userPermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.user
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("user")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaUser />
                User
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.user?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
             
            </button>
            {isOpen.user && (
              <div className={`ml-6 flex flex-col gap-1 relative`}>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold focus:outline-none focus:font-bold"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => {
                    navigate("/admin/roles");
                  }}
                >
                  Manage Roles
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/admin/drivers")}
                >
                  Driver Performance
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/admin/useractivity")}
                >
                    User Activity
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/admin/reports")}
                >
                    Reports
                </button>
              </div>
            )}
          </div>
        )}


        {user?.permissions?.vehiclePermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.vehicle
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("vehicle")}
            >
               <div className="w-full flex gap-4 items-center">
                <FaShuttleVan  />
                Vehicle
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.vehicle?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.vehicle && (
              <div className="ml-6">
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/vehicle")}
                >
                  Vehicle Dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/vehicle/add")}
                >
                  Add Vehicle
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/vehicle/report")}
                >
                  Vehicle Reports
                </button>
              </div>
            )}
          </div>
        )}


        {user?.permissions?.vehicleMaintenencePermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.maintenance
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("maintenance")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaTools  />
                Maintenance 
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.maintenance?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.maintenance && (
              <div className="ml-6">
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/requestmaintains")}
                >
                  Request Maintains
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/Mdashboard")}
                >
                  Maintenance Records
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/VehicleService")}
                >
                  Service Records
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => navigate("/maintainsreport")}
                >
                 Emergency Requests
                </button>
              </div>
            )}
          </div>
        )}

        {user?.permissions?.hirePermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.hire
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("hire")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaMapLocationDot />
                Hire
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.hire?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.hire && (
              <div className="ml-6">
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/hires")}
                >
                  Dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/hires/add")}
                >
                  Add Hire
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/hires/rates")}
                >
                  Hire Rates
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/hires/alert")}
                >
                  Alert
                </button>
              </div>
            )}
          </div>
        )}

        {user?.permissions?.emergencyPermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.emergency
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("emergency")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaCarCrash  />
                Emergency 
                
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.emergency?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.emergency && (
              <div className="ml-6">
                {user?.permissions?.emergencyPermissions?.Create ==true &&

                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/emergency/create")}
                >
                  Create Case File
                </button>
                }
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/emergency")}
                >
                  View Case File Logs
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/emergency/alertTable")}
                >
                 Alert Logs
                </button>
              </div>
            )}
          </div>
        )}
        {user?.permissions?.contractPermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.contract
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("contract")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaFileContract  />
                Contract 
                
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.contract?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.contract && (
              <div className="ml-6">
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/client")}
                >
                  Client dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/Contract/Dashbored")}
                >
                  Contract dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/Report")}
                >
                  Report
                </button>
              </div>
            )}
          </div>
        )}

        {user?.permissions?.financePermissions?.Read && (
          <div className="relative w-full px-4 ">
            <button
              className={`${
                isOpen.finance
                  ? "bg-navGreen dark:bg-navPurple font-bold shadow-teal-900 shadow-md dark:shadow-navPurpleDarker"
                  : " "
              } w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 dark:hover:shadow-navPurpleDarker hover:shadow-md focus:outline-none dark:hover:bg-navPurple items-center`}
              onClick={() => toggleMenu("finance")}
            >
              <div className="w-full flex gap-4 items-center">
                <FaMoneyBillTrendUp  />
              
                Finance 
              </div>
              <div className={`w-fit transition-transform ease-linear ${isOpen.finance?'rotate-180':''}`}>
                <FaAngleDown  />
              </div>
            </button>
            {isOpen.finance && (
              <div className="ml-6">
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/finance/financeDashboard")}
                >
                  Finance Dashboard
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/finance/expenseTracking")}
                >
                  Expense Tracking
                </button>
                <button
                  className="w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold"
                  onClick={() => navigate("/finance/incomeTracking")}
                >
                  Income Tracking
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
