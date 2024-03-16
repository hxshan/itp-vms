// DriverDashboard.js
import React, { useState } from 'react';
import { DriverNavbar, Dashboard} from '@/components/driver';
import PastTripsTable from '@/components/driver/PastTripsTable';

const DriverDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  return (
    <div>
      <DriverNavbar setActiveComponent={setActiveComponent} />
      <div className="container mx-auto p-4">
        {activeComponent === 'dashboard' && <Dashboard />}
        {activeComponent === 'pastTrips'  && <PastTripsTable />}
        {activeComponent === 'maintenance' }
      </div>
    </div>
  );
};

export default DriverDashboard;
