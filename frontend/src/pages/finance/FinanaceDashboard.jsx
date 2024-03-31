import React from 'react';
import { ExpenseTable } from '@/components/finanace';
import useAxiosGet from '@/hooks/useAxiosGet';

const FinanceDashboard = () => {
    // Fetch expenses data using useAxiosGet hook
    const { data: expenses, isLoading, error } = useAxiosGet('/expense/');

    console.log(expenses)
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Finance Dashboard</h1>
        {isLoading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ExpenseTable data={expenses} isLoading={isLoading} /> 
        )}
      </div>
    );
  };
  
  export default FinanceDashboard;