// DriverNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 

const DriverNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
   
      <div>
        <img src="/path/to/driver-logo.png" alt="Logo" className="h-8" />
      </div>
      
    
      <div className="flex items-center space-x-32 justify-evenly ">
        <Link to="/driver/DriverDashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/trips" className="hover:text-gray-300">
          Trips
        </Link>
        <Link to="/maintenance" className="hover:text-gray-300">
          Maintenance
        </Link>
      </div>
      
    
      <div>
        <Link to="/profile" className="hover:text-gray-300">
          <FaUser className="text-xl" />
        </Link>
      </div>
    </nav>
  );
};

export default DriverNavbar;
