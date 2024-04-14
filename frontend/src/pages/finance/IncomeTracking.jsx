
import { IncomeForm, IncomeTable} from '@/components/finanace';

import React, { useState } from 'react';

const IncomeTracking = () => {
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const toggleIncomeForm = () => {
    setShowIncomeForm(!showIncomeForm);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Income Tracking</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleIncomeForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showIncomeForm ? 'X' : '+ Add Income'}
        </button>
      </div>
      {showIncomeForm ? <IncomeForm /> : <IncomeTable />}
    </div>
  );
};

  
  export default IncomeTracking;