
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState({
      user:false,
      vehicle: false,
      maintenance: false,
      hire: false,
      emergency: false,
      contract: false,
      finance: false
  });
 
  const toggleMenu = (menu) => {
      setIsOpen(prevState => ({
          ...prevState,
          [menu]: !prevState[menu]
      }));
  };

  const handleItemClick = (menu, subFunction) => {
      console.log(`Selected sub function under ${menu}: ${subFunction}`);

      
  };

  return (
      <div className="h-screen fixed z-10 top-0 left-0 flex w-20 lg:w-60">
          <div className=" bg-secondary text-white w-64 h-full flex flex-col items-start text-sm">
          <div className="relative w-full px-4 mt-[90px]">
                  <button className={`${isOpen.user?'bg-navGreen font-bold shadow-teal-900 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-teal-900 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('user')}>
                      User Management
                  </button>
                  {isOpen.user && (
                      <div className="ml-6 flex flex-col gap-1">
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => {navigate('/admin')}}>Dashboard</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Manage Users</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => {navigate('/admin/roles')}}>Manage Roles</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.vehicle?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('vehicle')}>
                      Vehicle Management
                      
                  </button>
                  {isOpen.vehicle && (
                      <div className="ml-0">
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/vehicle')}>Vehicle Dashboard</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/vehicle/add')}>Add Vehicle</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/vehicle/report')}>Vehicle Reports</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Vehicle Management', 'View Vehicles')}>Alers</button>  

                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.maintenance?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('maintenance')}>
                      Maintenance Management
                      
                  </button>
                  {isOpen.maintenance && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() =>navigate('/Mdashboard')}>Schedule Maintenance</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/VehicleserviceList')}>Record Maintenance</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Maintenance Management', 'View Maintenance Logs')}>View Maintenance Logs</button>
                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.hire?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('hire')}>
                      Hire Management
                      
                  </button>
                  {isOpen.hire && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/hires')}>Dashboard</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/hires/add')}>Add Hire</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/hires/rates')}>Hire Rates</button>
                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.emergency?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('emergency')}>
                     Emergency Management
                     
                  </button>
                  {isOpen.emergency && (
                      <div className="ml-6">

                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Emergency Management', 'Sub Fun')}>Create Case File</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Emergency Management', 'Sub Fun')}>Edit Case File</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/emergency')}>View Case File Logs</button>

                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.contract?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('contract')}>
                    Contract Management
                    
                  </button>
                  {isOpen.contract && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/client')}>Client dashboard</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/Contract/Dashbored')}>Contract dashboard</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Contract Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative w-full px-4 ">
                  <button className={`${isOpen.finance?'bg-navGreen font-bold shadow-green-800 shadow-md':' '} w-full flex flex-row py-4 px-4 text-nowrap rounded-md hover:bg-navHoverGreen hover:shadow-green-800 hover:shadow-md focus:outline-none`} onClick={() => toggleMenu('finance')}>
                    Finance Management
                    
                  </button>
                  {isOpen.finance && (
                      <div className="ml-6">

                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/Finance/ Finance Dashboard')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/Finance/Expense Tracking')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 text-start hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => navigate('/Finance/Income Tracking')}>Sub Fun</button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Navbar