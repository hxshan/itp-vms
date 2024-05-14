import { BarChart, Total, TripExpenseIncomeTable } from '@/components/finanace';

import React, { useState } from 'react';

const FinanceDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-bold text-xl underline mb-4">Finance Dashboard</h1>

      <Total />
      <div className="mt-8">
        <BarChart />
      </div>
      <div className="mt-8">
        <TripExpenseIncomeTable />
      </div>
    </div>
  );
};

export default FinanceDashboard;
