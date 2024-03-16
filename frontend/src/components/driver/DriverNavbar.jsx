// DriverNavbar.js
import React from 'react';
import { FaUser } from 'react-icons/fa';

const DriverNavbar = ({ setActiveComponent }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src="" alt="Logo" className="h-8" />
        </div>
        <div className="flex justify-center space-x-12">
          <button onClick={() => setActiveComponent('dashboard')} className="hover:text-gray-300">Dashboard</button>
          <button onClick={() => setActiveComponent('pastTrips')} className="hover:text-gray-300">Past Trips</button>
          <button onClick={() => setActiveComponent('maintenance')} className="hover:text-gray-300">Maintenance</button>
        </div>
        <div>
          <button className="hover:text-gray-300">
            <FaUser className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;
