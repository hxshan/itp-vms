import { useState } from 'react';



const Navbar = () => {
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
      // You can perform any action based on the selected subFunction here
      // For example, you can navigate to a specific page or perform a specific action
  };

  return (
      <div className="h-screen fixed z-10 top-0 left-0 flex w-20 lg:w-80">
          <div className=" bg-gray-800 text-white w-64 h-full flex flex-col items-start ">
            <div className='w-full h-[80px] bg-red-600 flex'>
                
            </div>
          <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('user')}>
                      User Management
                      
                  </button>
                  {isOpen.user && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('User Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 " onClick={() => toggleMenu('vehicle')}>
                      Vehicle Management
                      
                  </button>
                  {isOpen.vehicle && (
                      <div className="ml-0">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Vehicle Management', 'Add Vehicle')}>Add Vehicle</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Vehicle Management', 'view vehicles')}>View vehicles</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Vehicle Management', 'Vehicle Reports')}>Vehicle Reports</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Vehicle Management', 'View Vehicles')}>Alers</button>  
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('maintenance')}>
                      Maintenance Management
                      
                  </button>
                  {isOpen.maintenance && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Maintenance Management', 'Schedule Maintenance')}>Schedule Maintenance</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Maintenance Management', 'Record Maintenance')}>Record Maintenance</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Maintenance Management', 'View Maintenance Logs')}>View Maintenance Logs</button>
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('hire')}>
                      Hire Management
                      
                  </button>
                  {isOpen.hire && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Hire Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Hire Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Hire Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('contract')}>
                     Emergency Management
                     
                  </button>
                  {isOpen.contract && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Emergency Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Emergency Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Emergency Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('emergency')}>
                    Contract Management
                    
                  </button>
                  {isOpen.emergency && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Contract Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Contract Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Contract Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>

              <div className="relative">
                  <button className="w-full flex flex-row py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => toggleMenu('finance')}>
                    Finance Management
                    
                  </button>
                  {isOpen.finance && (
                      <div className="ml-6">
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Finance Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Finance Management', 'Sub Fun')}>Sub Fun</button>
                          <button className="w-full py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => handleItemClick('Finance Management', 'Sub Fun')}>Sub Fun</button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Navbar