import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useLogout } from '@/hooks/useLogout';
import user_profile from '../../assets/user_profile.png';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DriverNavbar = ({ setActiveComponent }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    let decodedToken = {};
    if (user?.accessToken) {
      decodedToken = jwtDecode(user.accessToken);
      setId(decodedToken?.UserInfo?.id);
    }
  }, [user]);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="h-8">
         
        </div>
        <div className="flex justify-center space-x-12">
          <button onClick={() => setActiveComponent('dashboard')} className="hover:text-gray-300">Dashboard</button>
          <button onClick={() => setActiveComponent('pastTrips')} className="hover:text-gray-300">Past Trips</button>
          <button onClick={() => setActiveComponent('maintenance')} className="hover:text-gray-300">Maintenance</button>
        </div>
       
        {user?.accessToken && (
          <div className="relative">
            <button className="hover:text-gray-300 w-10 h-10" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUser className="text-xl" />
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 bg-gray-800 shadow-md border-black w-40 rounded-md">
                <button className="w-full px-4 py-2 border-b-2 border-gray-200" onClick={() => navigate(`/user/${id}`)}>View Profile</button>
                <button className="w-full px-4 py-2" onClick={() => logout()}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default DriverNavbar;
