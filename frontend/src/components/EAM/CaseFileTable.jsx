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
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.status}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                       
                                        <Link to={`/caseFiles/details/${caseFile._id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            <button className="px-2 py-1 bg-[#D4D800] text-white rounded-md mr-2">
                                                View
                                            </button>
                                        </Link>
                                        <Link to={`/caseFiles/delete/${caseFile._id}`} className="text-red-600 hover:text-red-900">
                                            <button className="hidden xl:grid px-2 py-1 bg-[#A90000] text-white rounded-md">
                                                Delete
                                            </button>
                                        </Link>
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
