import CaseFileTable from "@/components/EAM/CaseFileTable";
import { useState } from "react";
import { Link } from "react-router-dom";


const EAMDashboard = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl text-center font-bold mb-8">Emergency Management Dashboard</h1>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Case Files</h2>
                <Link to="/emergency/create" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Create New Case File</Link>
            </div>
            <div className="mb-8">
                <CaseFileTable />
            </div>
            <hr className="my-8" />
           
            
        </div>
    );
};

export default EAMDashboard;