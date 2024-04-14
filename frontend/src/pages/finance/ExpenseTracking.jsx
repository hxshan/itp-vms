import React, { useState } from 'react';
import { ExpenseTable, ExpenseForm } from '@/components/finanace';

const ExpenseTracking = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const toggleExpenseForm = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Expense Tracking</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleExpenseForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showExpenseForm ? 'X' : '+ Add Expense'}
        </button>
      </div>
      {showExpenseForm ? <ExpenseForm /> : <ExpenseTable />}
    </div>
  );
};

export default ExpenseTracking;
