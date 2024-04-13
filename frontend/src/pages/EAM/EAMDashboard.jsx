import CaseFileTable from "@/components/EAM/CaseFileTable";
import { useState } from "react";
import { Link } from "react-router-dom";

const EAMDashboard = () => {

   

    return (
        <div className="container py-auto px-auto">
            <h1 className="text-3xl text-center mt-5 font-bold ">Emergency Management Dashboard</h1>
            <div className="flex justify-between items-center mt-4">
                <h1 className="text-3xl">Case Files</h1>
                <Link to="/emergency/create" className="btn btn-primary">
                    <span className="text-white bg-stone-600 rounded-full px-4 py-2">Create New Case File</span>

                </Link>
                </div>
            <CaseFileTable />
            
            
        </div>
    );
};

export default EAMDashboard;