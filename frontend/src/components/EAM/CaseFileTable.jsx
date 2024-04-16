import React, { useEffect, useState} from "react";
import  axios  from "axios";
import Spinner from "./Spinner";

import { Link } from "react-router-dom";


const CaseFileTable = () => {
    const [caseFiles, setCaseFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Fetch case files
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/api/caseFiles')
            .then((response) => {
                setCaseFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching case files", error);
                setLoading(false);
            });

        }, []);

        const deleteCaseFile = async (id) => {
            if(confirm("Are you sure you want to delete this case file?")){
                setLoading(true);
                axios
                 .delete(`http://localhost:3000/api/caseFiles/${id}`)
                 .then(() => {
                        setCaseFiles(caseFiles.filter((caseFile) => caseFile._id !== id));
                        setLoading(false);
                        alert("Case file deleted successfully!");
                 })
                 .catch((error) => {
                     console.log("Error deleting case file", error);
                     setLoading(false);
                 });
            }
        }

       

        
  

    return (
        <div className="container mx-auto">
          
            {loading ? (
                <Spinner />
            ) : (
                <div className="mt- 10" >
                    <table className="min-w-full divide-y divide-gray-200" >
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Of Incident</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger Count</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {caseFiles.map((caseFile) => (
                                <tr key={caseFile._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.caseTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.timeOfIncident}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{caseFile.passengerCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.severity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    <div  className= {caseFile.status == 'completed' ? `w-full text-white bg-red-500 rounded-md py-1 px-4 `: `w-full text-white bg-green-500 rounded-md py-1 px-4 `}>
                                            {caseFile.status}
                                    </div>

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex">
                                            <Link to={`/emergency/view/${caseFile._id}`} className="my-1 mx-1 bg-blue-700 text-white py-1 px-4 rounded-md text-sm" >
                                           
                                                View
                                            
                                            </Link>
                                        
                                            <button className="my-1 mx-1 bg-red-700 text-white py-1 px-4 rounded-md text-sm" onClick={() => deleteCaseFile(caseFile._id)}>
                                                Delete
                                            </button>  
                                            </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )}
        </div>

    );
}

export default CaseFileTable;
